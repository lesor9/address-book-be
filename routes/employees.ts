import { Router } from 'express';
import * as storage from '../storage/mongo';
import { sortEmployeesByName, filterEmployees } from '../helpers/employee';

const router = Router();

router.get('/', async function(req, res, next) {
  let list = await storage.getList();
  sortEmployeesByName(list);

  const { query } = req.query;
  if (query) {
    list = filterEmployees(list, query);
  }

  res.json(list);
});

router.get('/:id', async function(req, res, next) {
  res.json(await storage.getEmployee(req.params.id));
});

router.post('/', async function(req, res, next) {

  res.json(await storage.createEmployee(req.body));
});

export default router;