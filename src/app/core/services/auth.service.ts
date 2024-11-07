import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IJwtPayload } from '@app/pages/auth/interfaces/jwt-payload.interface';
import { ISignin } from '@app/pages/auth/interfaces/signin.interface';
import { ISignup } from '@app/pages/auth/interfaces/signup.interface';
import { Routes } from '@app/shared/helpers/routes.helper';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends SessionService {
  constructor(private http: HttpClient) {
    super();
  }

  public signin(signin: ISignin): Observable<any> {
    return this.http.post<any>(Routes.SIGNIN, signin);
  }

  public logout(): void {
    this.removeSessionData();
  }

  public signup(signup: ISignup): Observable<any> {
    return this.http.post<any>(Routes.SIGNUP, signup);
  }

  public storeSessionData(res: string): void {
    const payload: IJwtPayload = jwtDecode(res);
    this.setUserData(payload);
    this.setAccessToken(res);
    this.setExpirationDate(payload.exp.toString());
  }

  public isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
}
