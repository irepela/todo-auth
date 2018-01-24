import koa from 'koa';
import * as path from 'path';
import serveStatic from 'koa-static';
import compress from 'koa-compress';
import logger from 'koa-logger';
import passport from 'koa-passport';
import exceptionHandler from './exception-handler.middleware';
import {routes} from './routes/routes';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

// configuration ===============================================================
mongoose.set('debug', true);
mongoose.connect('mongodb://127.0.0.1:27017/users'); // connect to our database
mongoose.connection.on('error', console.error);

const app = new koa();

app.use(logger());
app.use(compress());
app.use(bodyParser());
app.use(exceptionHandler);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes());

const root = path.resolve(__dirname, '../');

app.use(serveStatic(path.resolve(root, 'client')));
app.listen(3001, () => console.log('server started 3001'));

export default app;
