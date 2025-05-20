import { Response } from 'express';
import { ZodError } from 'zod';
import ValidationError from '../errors/validation-error';
import { IElectionCreateRequest, IVoteCreateRequest } from '../requests/election.request';
import { electionSchema, voteSchema } from '../validations/election.validation';
import { Election, IElectionDoc } from '../models/election.model';
import { IElectionResource } from '../resources/election.resource';
import { AuthenticatedRequest } from '../requests/auth.request';
import { ELECTION_PAGE_DEFAULT, ELECTION_PER_PAGE_DEFAULT } from '../constants';
import NotFoundError from '../errors/not-found-error';
import mongoose from 'mongoose';
import { UserJwtPayload } from '../types';

export const create = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, candidates, expiresAt } = req.body;

    const existing: IElectionDoc | null = await Election.findOne({ title });
    if (existing) {
      throw new ValidationError('Election is already exists');
    }

    const data: IElectionCreateRequest = electionSchema.parse({
      title,
      candidates,
      expiresAt
    } as IElectionCreateRequest);

    const election = new Election({
      title: data.title,
      candidates: data.candidates,
      expiresAt: new Date(data.expiresAt),
    } as IElectionDoc);

    const payload: IElectionResource = IElectionResource.serializeElection(election);

    await election.save();
    return res.status(201).json({ message: 'Election created successfully', data: payload });

  } catch (err) {
    if (err instanceof ZodError) {
      const validationError = ValidationError.fromZod(err);
      return res.status(400).json(validationError.getMessage());
    }
    if (err instanceof ValidationError) {
      return res.status(400).json(err.getMessage());
    }
    return res.status(500).json({ message: 'Unhandled error: ', error: err });
  }
};

export const search = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, page, perPage } = req.query;

    const currentPage = parseInt(page as string) || ELECTION_PAGE_DEFAULT;
    const limit = parseInt(perPage as string) || ELECTION_PER_PAGE_DEFAULT;
    const skip = (currentPage - 1) * limit;

    const query: any = {};
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }

    const elections: IElectionDoc[] = await Election.find(query)
      .skip(skip)
      .limit(limit);

    const total = await Election.countDocuments(query);

    const payload: IElectionResource[] = IElectionResource.serializeElectionList(elections);

    return res.status(200).json({
      message: 'Search election result',
      data: payload,
      meta: {
        page: currentPage,
        perPage: limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (err) {
    if (err instanceof ZodError) {
      const validationError = ValidationError.fromZod(err);
      return res.status(400).json(validationError.getMessage());
    }
    if (err instanceof ValidationError) {
      return res.status(400).json(err.getMessage());
    }
    return res.status(500).json({ message: 'Unhandled error: ', error: err });
  }
};

export const get = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const electionId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      throw new ValidationError('Invalid id');
    }

    const election: IElectionDoc | null = await Election.findById(electionId);

    if (!election) {
      throw new NotFoundError('Election is not found');
    }

    const payload: IElectionResource = IElectionResource.serializeElection(election);

    return res.status(200).json({
      message: 'Get election result',
      data: payload,
    });

  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).json(err.getMessage());
    }
    if (err instanceof ValidationError) {
      return res.status(400).json(err.getMessage());
    }
    return res.status(500).json({ message: 'Unhandled error: ', error: err });
  }
};

export const remove = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      throw new ValidationError('Invalid id');
    }

    const result = await Election.deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      throw new NotFoundError('Election is not found');
    }

    return res.status(200).json({
      message: 'Election deleted successfully',
      data: true,
    });

  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).json(err.getMessage());
    }
    if (err instanceof ValidationError) {
      return res.status(400).json(err.getMessage());
    }
    return res.status(500).json({ message: 'Unhandled error: ', error: err });
  }
};

export const vote = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { candidateNim } = req.body || {};
    const electionId = req.params.id;
    const user: UserJwtPayload = req.user as UserJwtPayload;

    const election: IElectionDoc | null = await Election.findById(electionId);

    if (!election) {
      throw new NotFoundError('Election is not found');
    }

    const hasVoted = election.candidates.some(candidate =>
      candidate.votes?.some(vote => vote.nim === user.nim)
    );

    if (hasVoted) {
      throw new ValidationError('User has already voted in this election');
    }

    const data: IVoteCreateRequest = voteSchema.parse({
      nim: user.nim,
      candidateNim,
    } as IVoteCreateRequest);

    const vote = {
      _id: new mongoose.Types.ObjectId(),
      nim: data.nim,
    };

    const result = await Election.updateOne(
      {
        _id: electionId,
        'candidates.nim': candidateNim,
        'candidates.votes.nim': { $ne: user.nim }
      },
      {
        $addToSet: { 'candidates.$[candidate].votes': vote }
      },
      {
        arrayFilters: [{ 'candidate.nim': candidateNim }]
      }
    );

    if (result.modifiedCount === 0) {
      throw new NotFoundError('Candidate NIM is not found');
    }

    return res.status(201).json({ message: 'Vote created successfully', data: vote });

  } catch (err) {
    if (err instanceof ZodError) {
      const validationError = ValidationError.fromZod(err);
      return res.status(400).json(validationError.getMessage());
    }
    if (err instanceof ValidationError) {
      return res.status(400).json(err.getMessage());
    }
    if (err instanceof NotFoundError) {
      return res.status(404).json(err.getMessage());
    }
    return res.status(500).json({ message: 'Unhandled error: ', error: err });
  }
};