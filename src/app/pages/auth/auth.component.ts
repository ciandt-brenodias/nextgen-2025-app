import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  showLogin = true;

  toggleForm() {
    this.showLogin = !this.showLogin;
  }

  get dynamicText(): string {
    return this.showLogin
      ? 'Faça seu login para acessar cada perfil!'
      : 'Cadastre-se agora para aproveitar o melhor da plataforma!';
  }
}
