import {Exception} from './exception';

export default async (ctx, next) => {
  try {
    return next();
  } catch (err) {
    if (err instanceof Exception) {
      console.log('Inside exception handler');
      // it transform the exception to an object literal
      ctx.body = err.toObject();
      ctx.status = err.statusCode;
    } else {
      console.log('Inside error handler');
      // unknown error
      ctx.body = { message: 'Unexpected error.' };
      ctx.status = 500;
    }
  }
};
