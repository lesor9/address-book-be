import { Router } from 'express';
import * as storage from '../storage/mongo';
import { sortEmployeesByName, filterEmployees } from '../helpers/employeeHelpers';
import IEmployee from '../interfaces/employeeInterface'

const router: Router = Router();

router.get('/', async function(req, res, next) {
  let list: IEmployee[] = await storage.getList();
  sortEmployeesByName(list);

  const { query } = req.query;
  if (query) {
    list = filterEmployees(list, query.toString());
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