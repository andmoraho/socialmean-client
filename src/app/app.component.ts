import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

declare const jQuery: any;
declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  public title: string;
  public identity;
  public nick;

  constructor(
    private _userService: UserService,
    private _router: Router
  ) {
    this.title = 'SocialMean';
  }

  ngOnInit() {
    if (localStorage.getItem('identity') !== null) {
      this.identity = JSON.parse(localStorage.getItem('identity'));
      this._userService.getUserInfo(this.identity._id)
      .subscribe(
        response => {
         if (response.status === 200) {
          this.identity = JSON.parse(localStorage.getItem('identity'));
          this.nick = this.identity.nick;
         }
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }

  ngDoCheck() {
    if (localStorage.getItem('identity') !== null) {
      this.identity = JSON.parse(localStorage.getItem('identity'));
      this.nick = this.identity.nick;
    }
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this._userService.logOut()
    .subscribe(
      response => {
        if ( response.status === 200) {
          localStorage.clear();
          this.identity = null;
          this._router.navigate(['/login']);
        }
      },
      error => {
      }
    );
  }
}
