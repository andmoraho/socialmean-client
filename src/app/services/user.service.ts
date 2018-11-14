import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public _APIEndpoint: string;
  _header = new HttpHeaders(
    {
      'Content-Type': 'application/json'
    });
  _authHeader = new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'x-auth': this.getToken()
    });

  constructor(public _http: HttpClient) {
    this._APIEndpoint = environment.APIEndpoint;
  }

  register(user: User): Observable<any> {
    return this._http.post<any>(this._APIEndpoint + 'register', user, {headers: this._header, observe: 'response'});
  }

  signIn(user: User): Observable<any> {
    return this._http.post<any>(this._APIEndpoint + 'login', user, {headers: this._header, observe: 'response'});
  }

  getUserInfo(id: any): Observable<any> {
    return this._http.get<any>(this._APIEndpoint + '/user/' + id, {headers: this._authHeader, observe: 'response'});
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logOut(): Observable<any> {
    return this._http.delete<any>(this._APIEndpoint + 'logout', {headers: this._authHeader, observe: 'response'});
  }
}
