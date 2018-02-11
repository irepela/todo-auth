import koa from 'koa';
import compress from 'koa-compress';
import logger from 'koa-logger';
import exceptionHandler from './exception-handler.middleware';
import {routes} from './routes/routes';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import consul from 'consul';

const PORT = process.env.port || 4000;

const details = {
  name: 'authService',
  address: 'localhost',
  port: PORT,
  id: 'authService'
};

consul().agent.service.register(details, err => {
  console.log('Registered auth service');
});

// configuration ===============================================================
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost:27017/users'); // connect to our database
mongoose.connection.on('error', console.error);

const app = new koa();
app.use(exceptionHandler);
app.use(logger());
app.use(compress());
app.use(bodyParser());
app.use(routes());

app.listen(PORT, () => console.log('server started ' + PORT));

export default app;
