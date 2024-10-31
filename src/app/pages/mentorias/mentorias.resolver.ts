import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AlunoService } from '@core/services/aluno.service';
import { AuthService } from '@core/services/auth.service';
import { UserData } from './mentorias.component';

@Injectable({
  providedIn: 'root'
})
export class MentoriasResolverService implements Resolve<any> {
  constructor(private alunoService: AlunoService, private authService: AuthService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<UserData[]> {
    let token = await this.authService.signin({password:'admin', username:'admin'}).toPromise();
    let response = await this.alunoService.getAlunos(token['nextgen-auth-token']).toPromise()
    console.log(response);
    return response.map((aluno) => {
      return { name: aluno.nome, skill: aluno.talentos.map((talento) => talento.nome).join(', ') }
    }) as UserData[];
  }
}