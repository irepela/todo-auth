import {Injectable} from '@angular/core';
import {User} from '../../common/user';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationService {

  private _user: User;

  constructor(private http: HttpClient, private router: Router) {
  }

  private onAuthenticated(response: any): void {
    this._user = response.json().user;
    localStorage.setItem('token', response.json().token);
    // Navigate to 'todo-list' page
    // this.router.navigate(['/todo-list']);
  }

  authenticate(email: string, password: string) {
    this.http.post('/login', {email, password})
      .subscribe(response => this.onAuthenticated(response));
  }

  signUp(user: User) {
    this.http.post('/sign-up', user)
      .subscribe(response => this.onAuthenticated(response));
  }

  user(): User {
    return this._user;
  }
}
