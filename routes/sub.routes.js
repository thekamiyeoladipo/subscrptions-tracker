import { Router } from 'express';

const subRouter = Router();

subRouter.get('/', (req, res) => {
    res.send({ title: 'GET all subscriptions' });
})

subRouter.get('/:id', (req, res) => {
    res.send({ title: 'GET subscription details' });
})

subRouter.post('/', (req, res) => {
    res.send({ title: 'CREATE subscription' });
})

subRouter.put('/:id', (req, res) => {
    res.send({ title: 'UPDATE subscription' });
})

subRouter.delete('/:id', (req, res) => {
    res.send({ title: 'DELETE subscription' });
})

subRouter.get('/user/:id', (req, res) => {
    res.send({ title: 'GET all user subscriptions' });
})

subRouter.put('/:id/cancel', (req, res) => {
    res.send({ title: 'CANCEL subscriptions' });
})

subRouter.get('/upcoming-renewals', (req, res) => {
    res.send({ title: 'GET upcoming renewals' });
})
export default subRouter;