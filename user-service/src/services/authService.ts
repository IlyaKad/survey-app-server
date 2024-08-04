import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const secretKey = process.env.JWT_SECRET || 'yourSecretKey';

if (!secretKey) {
    throw new Error('JWT_SECRET is not defined');
}

export const register = async (fullName: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    return { user, token };
};

export const login = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    return { user, token };
};

export const authenticateJWT = (token: string) => {
    try {
        const verified = jwt.verify(token, secretKey);
        return verified;
    } catch (err) {
        throw new Error('Invalid Token');
    }
};
