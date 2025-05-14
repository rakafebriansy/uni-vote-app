import { Response } from 'express';
import { ZodError } from 'zod';
import ValidationError from '../errors/validation-error';
import { IElectionCreateRequest } from '../requests/election.request';
import { electionSchema } from '../validations/election.validation';
import { Election, IElectionDoc } from '../models/election.model';
import { IElectionResource } from '../resources/election.resource';
import { AuthenticatedRequest } from '../requests/auth.request';

export const create = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, candidates, expiresAt } = req.body;

    const user = req.user;

    const data: IElectionCreateRequest = electionSchema.parse({
      title,
      candidates,
      expiresAt
    } as IElectionCreateRequest);

    const existing: IElectionDoc | null = await Election.findOne({ title });
    if (existing) {
      throw new ValidationError('Election is already exists');
    }

    const election = new Election({
      title: data.title,
      candidates: data.candidates,
      expiresAt: new Date(data.expiresAt),
    } as IElectionDoc);

    const payload: IElectionResource = {
      id: String(election._id),
      title: election.title,
      candidates: election.candidates,
      expiresAt: election.expiresAt,
    }

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