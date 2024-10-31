import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SessaoService {
    private apiUrl = 'http://localhost:3000/sessao';

    constructor(private http: HttpClient) {}

    getSessao(authToken: string): Observable<any> {
        const headers = new HttpHeaders({
            'accept': '*/*',
            'nextgen-auth-token': authToken
        });

        return this.http.get<any>(this.apiUrl, { headers });
    }

    getSessaoById(id: string, authToken: string): Observable<any> {
        const headers = new HttpHeaders({
            'accept': '*/*',
            'nextgen-auth-token': authToken
        });

        const url = `${this.apiUrl}/${id}`;
        return this.http.get<any>(url, { headers });
    }
}