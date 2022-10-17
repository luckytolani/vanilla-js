import crypto from 'crypto';

export const idGen = () => {
    return crypto.randomBytes(16).toString("hex")
}