import {Component} from '@angular/core';
import {User} from '../../../common/user';
import {AuthenticationService} from '../../shared/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {
  user: User = new User();

  constructor(private authenticationService: AuthenticationService) { }

  signUp(): void {
    this.authenticationService
      .signUp(this.user);
  }
}
