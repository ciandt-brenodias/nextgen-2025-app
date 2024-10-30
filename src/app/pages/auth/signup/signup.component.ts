import { Component, OnDestroy } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/core/services/auth.service';
import { ISignup } from '../interfaces/signup.interface';
import { UserState } from '@app/components/header/header.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnDestroy {
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

  toggleForm() {
    console.log('Toggle form');
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
            this.toggleForm();
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
}
