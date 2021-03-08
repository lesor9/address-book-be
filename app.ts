import * as express from 'express';
import * as logger from 'morgan';
import employeesRouter from './routes/employees'

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  )
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