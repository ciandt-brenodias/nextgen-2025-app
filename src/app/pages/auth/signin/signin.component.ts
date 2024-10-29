import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { ISignin } from '../interfaces/signin.interface';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnDestroy {
  private ngUnsubscribe$ = new Subject<boolean>();

  signinForm!: FormGroup;
  errMsg: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.createForm();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  toggleForm() {
    console.log('Toggle form');
  }

  onSignin() {
    this.loading = true;
    if (this.signinForm.valid) {
      const user: ISignin = this.signinForm.value;
      this.authService
        .signin(user)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe({
          next: (res: { accessToken: string }) =>
            this.authService.storeSessionData(res.accessToken),
          error: (err) => {
            console.error(err);
            this.errMsg = 'Invalid email or password';
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
            this.router.navigate([]);
          },
        });
    } else {
      this.loading = false;
      this.errMsg = 'Please fill in the required fields';
    }
  }

  private createForm() {
    this.signinForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }
}
