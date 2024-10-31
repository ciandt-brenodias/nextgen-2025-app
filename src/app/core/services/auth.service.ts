import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { ISignin } from '@app/pages/auth/interfaces/signin.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISignup } from '@app/pages/auth/interfaces/signup.interface';
import { IJwtPayload } from '@app/pages/auth/interfaces/jwt-payload.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends SessionService {
  private readonly LOGIN_URL = 'http://localhost:3000/login';

  constructor(private http: HttpClient) {
    super();
  }

  public signin(signin: ISignin): Observable<any> {
    const loginPayload = {
      usuario: signin.username,
      senha: signin.password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*',
    });
    
    return this.http.post<any>(this.LOGIN_URL, loginPayload, { headers });
  }

  public logout(): void {
    this.removeSessionData();
  }

  public signup(signup: ISignup): Observable<any> {
    // Assuming the signup endpoint is not provided, maintain the original URL
    return this.http.post<any>(this.LOGIN_URL, signup);
  }

  public storeSessionData(res: string): void {
    // const payload: IJwtPayload = jwtDecode(res);
    const payload = { fullname: 'John Doe', exp: 0 } as IJwtPayload;
    this.setUserData(payload.fullname);
    this.setAccessToken(res);
    this.setExpirationDate(payload.exp.toString());
  }

  public isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
}