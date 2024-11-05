import { Injectable } from '@angular/core';
import * as ALUNOS from '@assets/db/files/alunos.json';
import * as EMPRESAS from '@assets/db/files/empresas.json';
import * as MENTORIAS from '@assets/db/files/mentorias.json';
import * as PROFESSORES from '@assets/db/files/professores.json';
import * as SESSOES from '@assets/db/files/sessoes.json';
import * as USERS from '@assets/db/files/users.json';
import {
  getStatusText,
  InMemoryDbService,
  ParsedRequestUrl,
  RequestInfo,
  RequestInfoUtilities,
  ResponseOptions,
} from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Routes } from '../helpers/routes.helper';
import { getAlunoById, getAlunos } from './fixtures/aluno.fixture';
import { getEmpresaByCnpj, getEmpresas } from './fixtures/empresa.fixture';
import { getMentoriaById, getMentorias } from './fixtures/mentoria.fixture';
import { getProfessorByID, getProfessores } from './fixtures/professor.fixture';
import { getSessaoById, getSessoes } from './fixtures/sessoes.fixture';
import { signin } from './fixtures/signin.fixture';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  alunos = [...ALUNOS];
  empresas = [...EMPRESAS];
  mentorias = [...MENTORIAS];
  professores = [...PROFESSORES];
  sessoes = [...SESSOES];
  users = [...USERS];

  constructor() {
    console.log('InMemoryDataService created');
  }

  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    return {
      alunos: this.alunos,
      empresas: this.empresas,
      mentorias: this.mentorias,
      professores: this.professores,
      sessoes: this.sessoes,
      users: this.users,
    };
  }

  get(requestInfo: RequestInfo): Observable<Response> | null | undefined {
    console.log('Request Info:', requestInfo);
    const url = requestInfo.url;
    const options = this.getOptionsForGetRequest(url, requestInfo);

    return options ? this.createResponse$(options, requestInfo) : undefined;
  }

  post(requestInfo: RequestInfo): Observable<Response> | null | undefined {
    const url = requestInfo.url;
    const options = this.getOptionsForPostRequest(url, requestInfo);

    return options ? this.createResponse$(options, requestInfo) : undefined;
  }

  parseRequestUrl(
    url: string,
    requestInfoUtils: RequestInfoUtilities
  ): ParsedRequestUrl | null | undefined {
    return requestInfoUtils.parseRequestUrl(url);
  }

  private getOptionsForGetRequest(
    url: string,
    requestInfo: RequestInfo
  ): ResponseOptions | undefined {
    const routeHandlers: {
      [key: string]: (req: RequestInfo) => ResponseOptions;
    } = {
      [Routes.ALUNOS]: getAlunos,
      [Routes.EMRPESAS]: getEmpresas,
      [Routes.PROFESSORES]: getProfessores,
      [Routes.MENTORIAS]: getMentorias,
      [Routes.SESSOES]: getSessoes,
      [Routes.ALUNO_BY_ID('\\d+')]: getAlunoById,
      [Routes.PROFESSOR_BY_ID('\\d+')]: getProfessorByID,
      [Routes.EMPRESA_BY_CNPJ('\\d+')]: getEmpresaByCnpj,
      [Routes.MENTORIA_BY_ID('\\d+')]: getMentoriaById,
      [Routes.SESSOES_BY_ID('\\d+')]: getSessaoById,
    };

    return this.findMatchingRoute(routeHandlers, url, requestInfo);
  }

  private getOptionsForPostRequest(
    url: string,
    requestInfo: RequestInfo
  ): ResponseOptions | undefined {
    const postHandlers: {
      [key: string]: (req: RequestInfo) => ResponseOptions;
    } = {
      [Routes.SIGNIN]: signin,
      // Add other POST handlers here
    };

    return this.findMatchingRoute(postHandlers, url, requestInfo);
  }

  private findMatchingRoute(
    handlers: { [key: string]: (req: RequestInfo) => ResponseOptions },
    url: string,
    requestInfo: RequestInfo
  ): ResponseOptions | undefined {
    for (const [pattern, handler] of Object.entries(handlers)) {
      if (urlMatchesPattern(url, pattern)) {
        return handler(requestInfo);
      }
    }
    return undefined;
  }

  private createResponse$(
    options: ResponseOptions,
    requestInfo: RequestInfo
  ): Observable<Response> {
    return requestInfo.utils.createResponse$(() =>
      this.finishOptions(options, requestInfo)
    );
  }

  private finishOptions(
    options: ResponseOptions,
    { headers, url }: RequestInfo
  ) {
    options.statusText = getStatusText(options.status);
    options.headers = headers;
    options.url = url;
    return options;
  }
}

function urlMatchesPattern(url: string, pattern: string): boolean {
  return url.match(new RegExp(`^${pattern}($|\\?+|\\/+)`, 'gi')) !== null;
}
