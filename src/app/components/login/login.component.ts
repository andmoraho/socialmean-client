import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: User;
  public title: string;
  public status_message: string;

  constructor(
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Login';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit() {
  }

  onLogin(form) {
    this._userService.signIn(this.user)
    .subscribe(
      response => {
        if (response.body != null) {
          localStorage.setItem('identity', JSON.stringify(response.body));
        }
        if (response.headers.get('x-auth') != null) {
          localStorage.setItem('token', response.headers.get('x-auth'));
          this._router.navigate(['/dashboard']);
        } else {
          this.status_message = 'Error';
          form.reset();
        }
      },
      error => {
        this.status_message = 'Error';
        form.reset();
      }
    );
  }

}
