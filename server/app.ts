import koa from 'koa';
import * as path from 'path';
import serveStatic from 'koa-static';
import compress from 'koa-compress';
import logger from 'koa-logger';

const app = new koa();

app.use(logger());
app.use(compress());

const root = path.resolve(__dirname, '../');

app.use(serveStatic(path.resolve(root, 'client')));
app.listen(3000, () => console.log('server started 3000'));

export default app;
