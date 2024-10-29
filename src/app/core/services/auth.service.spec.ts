import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { ISignin } from '@app/pages/auth/interfaces/signin.interface';
import { ISignup } from '@app/pages/auth/interfaces/signup.interface';
import { Routes } from '@app/shared/helpers/routes.helper';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to signin endpoint', () => {
    const signinData: ISignin = {
      email: 'john.doe@example.com',
      password: 'JohnDoe2024',
    };

    service.signin(signinData).subscribe();

    const req = httpMock.expectOne(Routes.SIGNIN);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(signinData);
  });

  it('should remove session data on logout', () => {
    jest.spyOn(service, 'removeSessionData');
    service.logout();
    expect(service.removeSessionData).toHaveBeenCalled();
  });

  it('should send a POST request to signup endpoint', () => {
    const signupData: ISignup = {
      fullname: 'John Doe',
      email: 'john.doe@example.com',
      password: 'JohnDoe2024',
    };
    service.signup(signupData).subscribe();

    const req = httpMock.expectOne(Routes.SIGNUP);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(signupData);
  });

  it('should store session data', () => {
    const res =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRmNzk4NmUyLTcyM2YtNDVmNC1iMjdjLTQ4MmI4YThjZTg2MiIsImZ1bGxuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNzE1NTU1NzMzLCJleHAiOjE3MTU1NjI5MzN9.05PFufWSxRmW1J1zSXIWnmxr7VdiIaIfyYCAdz89Tro';
    jest.spyOn(service, 'setUserData');
    jest.spyOn(service, 'setAccessToken');
    jest.spyOn(service, 'setExpirationDate');
    service.storeSessionData(res);
    expect(service.setUserData).toHaveBeenCalled();
    expect(service.setAccessToken).toHaveBeenCalledWith(res);
    expect(service.setExpirationDate).toHaveBeenCalled();
  });

  it('should return true if user is logged in', () => {
    jest.spyOn(service, 'getAccessToken').mockReturnValue('jwt-token');
    const isLoggedIn = service.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });

  it('should return false if user is not logged in', () => {
    jest.spyOn(service, 'getAccessToken').mockReturnValue('');
    const isLoggedIn = service.isLoggedIn();
    expect(isLoggedIn).toBeFalsy();
  });
});
