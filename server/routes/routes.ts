import Router from 'koa-router';
import passport from 'koa-passport';
const router = new Router();

router.post('/signup', async(ctx, next) => {
    try {
        // ctx.body = await User.create(ctx.request.body);
    } catch (err) {
        ctx.status = 400;
        ctx.body = err;
    }
});

router.post('/login', async(ctx, next) => {
    await passport.authenticate('local', function (err, user) {
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
    })(ctx, next);
});

router.get('/profile', async(ctx, next) => {

   /* await passport.authenticate('jwt', function (err, user) {
        if (user) {
            ctx.body = 'hello ' + user.displayName;
        } else {
            ctx.body = 'No such user';
            console.log('err', err)
        }
    } )(ctx, next)*/
});

router.get('/users', async(ctx, next) => {

    /* await passport.authenticate('jwt', function (err, user) {
         if (user) {
             ctx.body = 'hello ' + user.displayName;
         } else {
             ctx.body = 'No such user';
             console.log('err', err)
         }
     } )(ctx, next)*/
});

export function routes() {
  return router.routes();
}
