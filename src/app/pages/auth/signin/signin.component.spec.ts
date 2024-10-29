import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@app/core/services/auth.service';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { SigninComponent } from './signin.component';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let authService: AuthService;
  let store: Store;
  let router: Router;
  let ngZone: NgZone;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SigninComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: { signin: jest.fn(), storeSessionData: jest.fn() },
        },
        {
          provide: Store,
          useValue: { dispatch: jest.fn(), select: jest.fn() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    ngZone = TestBed.inject(NgZone);

    jest.spyOn(store, 'select').mockReturnValue(of(false));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle form', () => {
    const toggleFormSpy = jest.spyOn(store, 'dispatch');
    component.toggleForm();
    expect(toggleFormSpy).toHaveBeenCalled();
  });

  it('should sign in successfully', () => {
    const signinFormValue = { email: 'test@example.com', password: 'password' };
    const accessToken = 'test-access-token';
    const storeSessionDataSpy = jest.spyOn(authService, 'storeSessionData');
    const navigateSpy = jest
      .spyOn(router, 'navigate')
      .mockImplementation((commands, extras) => {
        return ngZone.run(() => {
          return router.constructor.prototype.navigate.call(
            router,
            commands,
            extras
          );
        });
      });

    jest.spyOn(authService, 'signin').mockReturnValue(of({ accessToken }));

    component.signinForm.setValue(signinFormValue);
    component.onSignin();

    expect(authService.signin).toHaveBeenCalledWith(signinFormValue);
    expect(storeSessionDataSpy).toHaveBeenCalledWith(accessToken);
    expect(component.loading).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/tasks']);
  });

  it('should handle invalid form', () => {
    component.onSignin();

    expect(authService.signin).not.toHaveBeenCalled();
    expect(component.errMsg).toBe('Please fill in the required fields');
    expect(component.loading).toBe(false);
  });
});
