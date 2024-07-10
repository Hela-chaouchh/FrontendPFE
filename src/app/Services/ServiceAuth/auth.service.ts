import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private urlLogin = 'http://localhost:8081/api/v1/auth/';

  constructor(private http: HttpClient) { }

  login(user: any) {
    return this.http.post(this.urlLogin + "authenticate", user);
  }
  register(user: any) {
    return this.http.post(this.urlLogin + "register", user);
  }

}
