import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AuthComponent } from './auth.component';
import { toggleForm } from './store/auth.actions';
import { SigninComponent } from './signin/signin.component';
import { AuthModule } from './auth.module';
import { SignupComponent } from './signup/signup.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthModule, StoreModule.forRoot({})],
      declarations: [AuthComponent, SigninComponent, SignupComponent],
      providers: [
        {
          provide: Store,
          useValue: {
            select: jest.fn(),
            dispatch: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch toggleForm action on toggleForm method call', () => {
    const toggleFormSpy = jest.spyOn(store, 'dispatch');
    component.toggleForm();
    expect(toggleFormSpy).toHaveBeenCalledWith(toggleForm());
  });
});
