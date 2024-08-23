import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
    const key= process.env.JWT_KEY
     console.log(key)
    const token = req.cookies.token;
     console.log(token)
    if (!token) {
        return res.status(401).send({ message: 'Access denied, token missing!' });
    }

    try {
       console.log('hai')
        const verified = jwt.verify(token, key);
        console.log(verified)
        req.user = verified; 
        next(); 
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
}

export default authenticateToken;