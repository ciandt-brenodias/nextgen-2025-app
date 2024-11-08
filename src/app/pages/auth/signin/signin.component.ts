import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { ISignin } from '../interfaces/signin.interface';
import { TokenHelper } from '@app/shared/helpers/token.helper';
import { Router } from '@angular/router';
import { UserToken } from '@core/interfaces/models';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit, OnDestroy {
  private readonly ngUnsubscribe$ = new Subject<boolean>();
  @Output() toggleForm = new EventEmitter<void>();
  signinForm: FormGroup;
  loading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  ngOnDestroy() {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  onSubmit(): void {
    this.loading = true;
    if (this.signinForm.valid) {
      const user: ISignin = this.signinForm.value;
      this.authService
        .signin(user)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe({
          next: (res: { access_token: string }) => {
            this.authService.storeSessionData(res.access_token);
            let token_info : UserToken = TokenHelper.parseJwt(res.access_token);
            this.router.navigate(['/mentorias', { perfil: token_info.perfil, user_id: token_info.id }]);
          },
          error: (err) => {
            console.error(err);
          },
          complete: () => {
            this.loading = false;
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
