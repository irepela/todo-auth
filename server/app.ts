import koa from 'koa';
import compress from 'koa-compress';
import logger from 'koa-logger';
import exceptionHandler from './exception-handler.middleware';
import {routes} from './routes/routes';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import cors from 'koa-cors';

// configuration ===============================================================
mongoose.set('debug', true);
mongoose.connect('mongodb://127.0.0.1:27017/users'); // connect to our database
mongoose.connection.on('error', console.error);

const app = new koa();
const koaOptions = {
  origin: true,
  credentials: true
};

app.use(cors(koaOptions));
app.use(exceptionHandler);
app.use(logger());
app.use(compress());
app.use(bodyParser());
app.use(routes());

app.listen(4000, () => console.log('server started 4000'));

export default app;
