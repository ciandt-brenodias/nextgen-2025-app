import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserState } from '@app/shared/components/header/header.component';
import { AuthService } from '@app/core/services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { ISignup } from '../interfaces/signup.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnDestroy {
  @Output() toggleForm = new EventEmitter<void>();
  private ngUnsubscribe$ = new Subject<boolean>();
  signupForm!: FormGroup;
  errMsg: string = '';
  loading: boolean = false;
  stateType: UserState = 'nao-logado';

  constructor(private authService: AuthService) {
    this.createForm();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  onSignup() {
    if (this.signupForm.valid) {
      const user: ISignup = this.signupForm.value;
      this.authService
        .signup(user)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe({
          next: (res) => console.log(res),
          error: (err) => {
            console.error(err);
            this.errMsg = err.error.message;
            this.loading = false;
          },
          complete: () => {
            this.toggleForm.emit();
            this.loading = false;
          },
        });
    } else {
      this.errMsg = 'Please fill in all fields correctly';
    }
  }

  private createForm() {
    this.signupForm = new FormGroup({
      fullname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      // Handle signup logic
      console.log(this.signupForm.value);
    }
  }
}
