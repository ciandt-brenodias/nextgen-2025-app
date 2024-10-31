import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpsRequestInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';
import { SessionService } from './services/session.service';
import { EmpresaService } from './services/empresa.service';
import { MentoriaService } from './services/mentoria.service';
import { ProfessorService } from './services/professor.service';
import { SessaoService } from './services/sessao.service';
import { AlunoService } from './services/aluno.service';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FormsModule, ReactiveFormsModule],
  providers: [
    AuthService,
    SessionService,
    EmpresaService,
    MentoriaService,
    ProfessorService,
    SessaoService,
    AlunoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
