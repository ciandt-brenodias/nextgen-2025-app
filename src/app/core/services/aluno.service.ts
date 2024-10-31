import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlunoService {
    private apiUrl = 'http://localhost:3000/aluno';

    constructor(private http: HttpClient) {}

    getAlunos(authToken: string): Observable<any> {
        const headers = new HttpHeaders({
            'accept': '*/*',
            'nextgen-auth-token': authToken
        });

        return this.http.get<any>(this.apiUrl, { headers });
    }

    getAlunoById(id: string, authToken: string): Observable<any> {
        const headers = new HttpHeaders({
            'accept': '*/*',
            'nextgen-auth-token': authToken
        });

        const url = `${this.apiUrl}/${id}`;
        return this.http.get<any>(url, { headers });
    }
}