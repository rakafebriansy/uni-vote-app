import bcrypt from 'bcrypt';
import { IUserDoc, User } from '../models/user.model';
import { IUserRegisterRequest } from '../requests/user.request';

export class AuthTest {
    static async create(user: IUserRegisterRequest): Promise<IUserDoc> {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        return await User.create(user);
    }
    static async delete(nim: string): Promise<void> {
        await User.deleteOne({ nim });
    }
    static async deleteAll(): Promise<void> {
        await User.deleteMany({});;
    }
}