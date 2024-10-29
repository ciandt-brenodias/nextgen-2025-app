import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  showSignup = false;
  constructor() {}

  toggleForm() {
    console.log('Toggle form');
  }
}
