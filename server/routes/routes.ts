import Router from 'koa-router';
import {User} from '../user/user.dao';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const router = new Router();

router.post('/register', async(ctx, next) => {
  ctx.body = 'Success';
    try {
        const user = ctx.request.body;
        user.passwordHash = bcrypt.hashSync(user.password, 10);
        ctx.body = await User.create(ctx.request.body);
    } catch (err) {
        ctx.body = {
          error: {
            status: 401,
            message: 'User already exists'
          }
        };
    }
});

router.post('/authenticate', async(ctx, next) => {
  const userInDb = await User.findOne({username: ctx.request.body.username});

  if (!userInDb || !bcrypt.compareSync(ctx.request.body.password, userInDb.passwordHash)) {
    ctx.body = {
      error: {
        status: 401,
        message: 'Invalid password or username'
      }
    };
  } else {
    // Sign and return token
    ctx.body = {
      id: userInDb.id,
      username: userInDb.username,
      email: userInDb.email,
      todos: userInDb.todos,
      token: jwt.sign({sub: userInDb.id}, 'secret', {expiresIn: '1h'})
    };
  }
});

router.post('/addTodo', async(ctx, next) => {
  const updatedResult = await User.findOneAndUpdate(
     {username: ctx.request.body.username},
     {$push: {todos: ctx.request.body.todo}},
     {new: true});
  ctx.body = {
    username: ctx.request.body.username,
    todos: updatedResult.todos
  }
});

router.post('/toggleTodo', async(ctx, next) => {
  const title = ctx.request.body.todo.title;
  const updatedResult = await User.findOneAndUpdate(
    {'username': ctx.request.body.username, 'todos.title': title},
    {$set: {'todos.$.complete': ctx.request.body.todo.complete}},
    {new: true});
  ctx.body = {
    username: ctx.request.body.username,
    todos: updatedResult.todos
  }
});

router.post('/deleteTodo', async(ctx, next) => {
  const updatedResult = await User.findOneAndUpdate(
    {username: ctx.request.body.username},
    {$pull: {todos: {id: ctx.request.body.todoId}}},
    {new: true});
  ctx.body = {
    username: ctx.request.body.username,
    todos: updatedResult.todos
  }
});

router.get('/getTodos/:username', async(ctx, next) => {
  console.log(ctx.params.username);
  const userInDb = await User.findOne({username: ctx.params.username});
    // Sign and return token
    ctx.body = {
      todos: userInDb.todos
    };
});


export function routes() {
  return router.routes();
}
