import { Router } from 'express';
import * as storage from '../storage/fs';

const router = Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.json(await storage.getList());
});

router.get('/:id', async function(req, res, next) {
  res.json(req.params);
});

router.post('/', async function(req, res, next) {
  res.json(await storage.createUser(req.body));
});

export default router;