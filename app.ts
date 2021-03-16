import * as express from 'express';
import * as logger from 'morgan';
import * as mongoose from 'mongoose';
import employeesRouter from './routes/employees';
import * as dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGODB_URI;
async function establishMongoConnection() {
    try {
        await mongoose.connect(url , { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
      } catch (error) {
        console.log(error);
    }  
}
establishMongoConnection();


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers", "Origin, X-Requested, Content-Type, Authorization"
  )
  res.header(
    "Access-Control-Allow-Methods", "GET,POST,PATCH"
  )
  res.header(
    "X-Requested-With", "XMLHttpRequest"
  )
  res.header("Access-Control-Allow-Origin", "*")
  res.set({
    'Content-Type': 'application/json',
  })
  
  next()
});

// app.use('/', indexRouter);
app.use('/employees', employeesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.json({
    statusCode: 404,
  });
});

// error handler
app.use(function(err, req, res, next) {
  res.json({
    statusCode: 500,
    message: err.message,
    stack: err.stack,
  });
});

export default app;