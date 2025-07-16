import { Router } from 'express';

const authRouter = Router();

authRouter.get('/sign-in', (req, res) => {
    res.send('Sign In');
});

authRouter.get('/sign-out', (req, res) => {
    res.send('Sign Out');
});

authRouter.get('/sign-up', (req, res) => {
    res.send('Sign Up');
});

export default authRouter;