import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { ISignin } from '../interfaces/signin.interface';
import { Subject, takeUntil } from 'rxjs';
import { Pages } from '@app/shared/helpers/routes.helper';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit, OnDestroy {
  private readonly ngUnsubscribe$ = new Subject<boolean>();
  @Output() toggleForm = new EventEmitter<void>();
  signinForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  ngOnDestroy() {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  onSubmit(): void {
    if (this.signinForm.valid) {
      const user: ISignin = this.signinForm.value;
      this.authService
        .signin(user)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe({
          next: (res: { accessToken: string }) => {
            console.log('[RESPONSE]', res);
            this.authService.storeSessionData(res.accessToken);
          },
          error: (err) => {
            console.log('[ERROR]', err);
            console.error(err);
          },
        });
    }
  }

  private createForm(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
