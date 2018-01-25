import Router from 'koa-router';
import passport from 'koa-passport';
import {User} from '../user/user.dao';
const router = new Router();

router.post('/register', async(ctx, next) => {
  ctx.body = 'Success';
    try {
        ctx.body = await User.create(ctx.request.body);
    } catch (err) {
        ctx.status = 400;
        ctx.body = err;
    }
});

router.post('/authenticate', async(ctx, next) => {


  const userInDb = await User.findOne({username: ctx.request.body.username});
  if (userInDb && userInDb.checkPassword(ctx.request.body.password)) {
    console.log('Authentication successfull');
    // Sign and return token
  } else {
    console.log('Login failed');
    // Return error
  }
  ctx.body = 'Success';

   /* await passport.authenticate('local', function (err, user) {
        if (user === false) {
            ctx.body = 'Login failed';
        } else {
            const payload = {
                id: user.id,
                displayName: user.displayName,
                email: user.email
            };
            // const token = jwt.sign(payload, jwtsecret); //здесь создается JWT
            // ctx.body = {user: user.displayName, token: 'JWT ' + token};
        }
    })(ctx, next);*/
});
export function routes() {
  return router.routes();
}
