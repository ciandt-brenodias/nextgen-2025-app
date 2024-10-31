import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpresaPayload } from '@core/interfaces/payload';

@Injectable({
    providedIn: 'root'
})
export class EmpresaService {
    private apiUrl = 'http://localhost:3000/empresa';

    constructor(private http: HttpClient) {}

    getEmpresas(authToken: string): Observable<any> {
        const headers = new HttpHeaders({
            'accept': '*/*',
            'nextgen-auth-token': authToken
        });

        return this.http.get<any>(this.apiUrl, { headers });
    }

    createEmpresa(empresa: EmpresaPayload, authToken: string): Observable<any> {
        const headers = new HttpHeaders({
            'accept': '*/*',
            'nextgen-auth-token': authToken,
            'Content-Type': 'application/json'
        });

        return this.http.post<any>(this.apiUrl, empresa, { headers });
    }

    getEmpresaById(id: string, authToken: string): Observable<any> {
        const headers = new HttpHeaders({
            'accept': '*/*',
            'nextgen-auth-token': authToken
        });

        const url = `${this.apiUrl}/${id}`;
        return this.http.get<any>(url, { headers });
    }
}