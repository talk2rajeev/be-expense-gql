const jwt = require("jsonwebtoken");

const secret = 'thisissecret';

export const getToken = (payload: any) => {
    const token = jwt.sign(payload, secret, {
        expiresIn: 604800, // 1 Week
    })
    return token
}

export const getPayload = (token: string) => {
    try {
        const payload = jwt.verify(token, secret);
        return { loggedIn: true, payload };
    } catch (err) {
        // Add Err Message
        return { loggedIn: false }
    }
}
