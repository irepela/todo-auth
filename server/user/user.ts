import {Todo} from '../todo/todo';

export class User {
  public email: string;
  public passwordHash: string;
  public username: string;
  public todos: Array<Todo>;
}
