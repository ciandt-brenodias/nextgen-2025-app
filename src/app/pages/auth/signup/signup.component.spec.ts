import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@app/core/services/auth.service';
import { Store, StoreModule } from '@ngrx/store';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ISignup } from '../interfaces/signup.interface';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: AuthService;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), ReactiveFormsModule],
      declarations: [SignupComponent],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signin: jest.fn(),
            storeSessionData: jest.fn(),
            signup: jest.fn(),
          },
        },
        {
          provide: Store,
          useValue: {
            dispatch: jest.fn(),
            select: jest.fn().mockReturnValue(of(false)),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle form', () => {
    const toggleFormSpy = jest.spyOn(store, 'dispatch');
    component.toggleForm();
    expect(toggleFormSpy).toHaveBeenCalled();
  });

  it('should initialize showSignUp$ correctly', () => {
    component.showSignUp$.subscribe((showSignUp) => {
      expect(showSignUp).toBe(false);
    });
  });

  it('should call authService.signup and handle the response', () => {
    // Arrange
    const user: ISignup = {
      fullname: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };
    const authServiceSpy = jest
      .spyOn(authService, 'signup')
      .mockReturnValue(of({}));

    // Act
    component.signupForm.setValue(user);
    component.onSignup();

    // Assert
    expect(authServiceSpy).toHaveBeenCalledWith(user);
    expect(component.errMsg).toBe('');
    expect(component.loading).toBe(false);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
