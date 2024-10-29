import { Injectable } from '@angular/core';
import Keys from '@app/shared/helpers/storage-keys';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  public setAccessToken(token: string): void {
    sessionStorage.setItem(Keys.ACCESS_TOKEN, token);
  }

  public getAccessToken(): string {
    return sessionStorage.getItem(Keys.ACCESS_TOKEN) ?? '';
  }

  public setExpirationDate(expDate: string) {
    sessionStorage.setItem(Keys.EXP_DATE, expDate);
  }

  public getExpirationDate(): string {
    return sessionStorage.getItem(Keys.EXP_DATE) ?? '';
  }

  public setUserData(username: string): void {
    sessionStorage.setItem(Keys.USER_DATA, username);
  }

  public getUserData(): string {
    return sessionStorage.getItem(Keys.USER_DATA) ?? '';
  }

  public removeSessionData(): void {
    sessionStorage.clear();
  }
}
