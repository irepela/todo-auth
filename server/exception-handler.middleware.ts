import {Exception} from './exception';

export default async (ctx, next) => {
  try {
    return next();
  } catch (err) {
    if (err instanceof Exception) {
      // it transform the exception to an object literal
      ctx.body = err.toObject();
      ctx.status = err.statusCode;
    } else {
      // unknown error
      ctx.body = { message: 'Unexpected error.' };
      ctx.status = 500;
    }
  }
};
