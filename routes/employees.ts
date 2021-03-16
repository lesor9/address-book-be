import { Router } from 'express';
import * as storage from '../storage/mongo';
import { sortEmployeesByName, filterEmployees } from '../helpers/employeeHelpers';
import IEmployee from '../interfaces/employeeInterface';
import Employee from '../models/employeeScheme';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

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

router.post('/signup', async function(req, res, next) {
  req.body.data = JSON.parse(req.body.data);
  console.log(req.body.data);
  Employee.findOne({ email: req.body.data.email })
  .exec()
  .then(user => {
    if (user) {
      return res.status(409).json({
        message: "Mail exists"
      });
    } else {
      bcrypt.hash(req.body.data.password, 10, (err, hash) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: err
          });
        } else {
          const user = new Employee({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.data.email,
            first_name: req.body.data.fname,
            last_name:req.body.data.lname,
            password: hash,
          });
          user
            .save()
            .then(result => {
              console.log(result);
              res.status(201).json({
                message: "Employee created"
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err
              });
            });
        }
      });
  }
  });
});

router.post('/login', async function (req, res, next) {
  req.body.data = JSON.parse(req.body.data);
  console.log(req.body.data);
  Employee.findOne({ email: req.body.data.email })
    .exec()
    .then(user => {
      console.log(user);
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }

      bcrypt.compare(req.body.data.password, user['password'], (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              _id: user['_id'],
            },
            process.env.JWT_KEY,
            {
                expiresIn: "30d"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
})

router.patch('/:id', async function(req, res, next) {
  const body = {
    ...req.body,
  };
  delete body._id;
  console.log(req.body._id);

  console.log(body);

  Employee.findOneAndUpdate(
      { _id: req.body._id },
      { $set: body } ,
      { returnOriginal: false },
      function(err, doc) {
        console.log(doc);
        if (err) {
          console.log(err);
          return res.status(500).json({ error: err });
        }
        return res.send('Succesfully saved.');
    });
});

export default router;