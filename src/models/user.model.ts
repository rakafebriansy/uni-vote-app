import mongoose, { Document, Schema } from 'mongoose';

export interface IUserDoc extends Document {
    nim: string;
    name: string;
    password: string;
    role: string;
    createdAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        nim: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, default: 'student' },
    }, { timestamps: true }
);

export const User = mongoose.model<IUserDoc>('User', UserSchema);
