import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: User;
  public title: string;
  public status_message: string;

  constructor(
    private _router: Router,
    private _userService: UserService
  ) {
    this.user = new User('', '', '', '', '', '', 'ROLE_USER', '');
    this.title = 'Register';
   }

  ngOnInit() {
  }

  onSubmit(form) {
    this._userService.register(this.user)
    .subscribe(
      response => {
        if ( response.status === 200 ) {
          this.status_message = 'Ok';
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
