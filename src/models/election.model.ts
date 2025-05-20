import mongoose, { Document, Schema } from 'mongoose';
import { Candidate, Vote } from '../types';

export interface IElectionDoc extends Document {
    title: string;
    candidates: Candidate[];
    expiresAt: Date;
}

const VoteSchema = new Schema({
    nim: {
        type: String,
        required: true,
    },
}, { _id: true, timestamps: true });

const CandidateSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    nim: {
        type: String,
        required: true,
    },
    votes: { type: [VoteSchema], default: [] }
}, { _id: false });

const ElectionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    candidates: {
        type: [CandidateSchema],
        required: true,
        validate: [(val: any[]) => val.length > 0, "At least one candidate is required"]
    },
    expiresAt: {
        type: Date,
        required: true,
    },
});

export const Election = mongoose.model<IElectionDoc>('Election', ElectionSchema);
