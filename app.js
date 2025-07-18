import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import subRouter from './routes/sub.routes.js';
import authRouter from './routes/auth.routes.js';
import connectToDatabase from './database/mongodb.js';

const app = express();
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subs', subRouter);



app.get('/', (req, res) => {
    res.send('Hello Backend! Na so una dey do for here?');
});

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
   await connectToDatabase();
});

export default app;