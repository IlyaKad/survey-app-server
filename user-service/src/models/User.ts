import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    fullName: { type: String, required: true },
    email: { type: String, match: /.+\@.+\..+/, required: true, unique: true },
    password: { type: String, required: true }
});

const User = model<IUser>('User', userSchema);

export default User;
