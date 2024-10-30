import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  @Input() userState: UserState = 'nao-logado';

  isMenuOpen = false;
  notLogged = false;
  isAluno = false;
  isProfessor = false;
  isEmpresa = false;

  ngOnInit(): void {
    typeof this.userState === 'string' && (this.notLogged = this.userState === 'nao-logado');
    typeof this.userState === 'string' && (this.isAluno = this.userState === 'aluno');
    typeof this.userState === 'string' && (this.isProfessor = this.userState === 'professor');
    typeof this.userState === 'string' && (this.isEmpresa = this.userState === 'empresa');
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  teste(): void {
  
    console.log('Button clicked');
  }
}

export type UserState = 'nao-logado' | 'aluno' | 'professor' | 'empresa';