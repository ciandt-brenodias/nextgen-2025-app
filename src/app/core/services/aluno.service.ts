import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Routes } from '@app/shared/helpers/routes.helper';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  constructor(private http: HttpClient) {}

  getAlunos(authToken: string): Observable<any> {
    const headers = new HttpHeaders({
      accept: '*/*',
      'nextgen-auth-token': authToken,
    });

    return this.http.get<any>(Routes.ALUNOS, { headers });
  }

  getMentoriasFromAlunosById(id: string, authToken: string): Observable<any> {
    const headers = new HttpHeaders({
      accept: '*/*',
      'nextgen-auth-token': authToken,
    });

    return this.http.get<any>(Routes.MENTORIAS_FROM_ALUNO_BY_ID(id), {
      headers,
    });
  }

  getAlunoById(id: string, authToken: string): Observable<any> {
    const headers = new HttpHeaders({
      accept: '*/*',
      'nextgen-auth-token': authToken,
    });

    const url = `${Routes.ALUNOS}/${id}`;
    return this.http.get<any>(url, { headers });
  }
}
