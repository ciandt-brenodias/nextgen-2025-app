import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Routes } from '@app/shared/helpers/routes.helper';

@Injectable({
    providedIn: 'root'
})
export class ProfessorService {
    private apiUrl = 'http://localhost:3000/professor';

    constructor(private http: HttpClient) {}

    getProfessores(authToken: string): Observable<any> {
        const headers = new HttpHeaders({
            'accept': '*/*',
            'nextgen-auth-token': authToken
        });

        return this.http.get<any>(Routes.PROFESSORES, { headers });
    }

    getMentoriasFromProfessorById(id: string, authToken: string): Observable<any> {
        const headers = new HttpHeaders({
            'accept': '*/*',
            'nextgen-auth-token': authToken
        });

        return this.http.get<any>(Routes.MENTORIAS_FROM_PROFESSOR_BY_ID(id), { headers });
    }

    getProfessorById(id: string, authToken: string): Observable<any> {
        const headers = new HttpHeaders({
            'accept': '*/*',
            'nextgen-auth-token': authToken
        });

        const url = `${this.apiUrl}/${id}`;
        return this.http.get<any>(url, { headers });
    }
}