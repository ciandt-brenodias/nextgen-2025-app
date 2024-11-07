import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { Routes } from '../helpers/routes.helper';
import { getAlunoById, getAlunos } from './fixtures/aluno.fixture';
import { getEmpresaByCnpj, getEmpresas } from './fixtures/empresa.fixture';
import { getMentoriaById, getMentorias } from './fixtures/mentoria.fixture';
import { getProfessorByID, getProfessores } from './fixtures/professor.fixture';
import { getSessaoById, getSessoes } from './fixtures/sessoes.fixture';
import { signin } from './fixtures/signin.fixture';

export function mockDataInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const url = req.url;

  if (req.method === 'GET') {
    const response = handleGetRequest(url);
    if (response) {
      return of(new HttpResponse({ status: 200, body: response })).pipe(
        delay(3000)
      );
    }
  } else if (req.method === 'POST') {
    const response = handlePostRequest(url, req.body);
    if (response) {
      return of(
        new HttpResponse({
          status: response.status,
          body: response.body,
        })
      ).pipe(delay(3000));
    }
  }

  return next(req);
}

function handleGetRequest(url: string): any {
  const routeHandlers: { [key: string]: (req: any) => any } = {
    [Routes.ALUNOS]: getAlunos,
    [Routes.EMRPESAS]: getEmpresas,
    [Routes.PROFESSORES]: getProfessores,
    [Routes.MENTORIAS]: getMentorias,
    [Routes.SESSOES]: getSessoes,
    [Routes.ALUNO_BY_ID('\\d+')]: (req: any) => {
      const alunoId = parseInt(req.url.split('/').pop() || '0', 10);
      return getAlunoById(alunoId);
    },
    [Routes.PROFESSOR_BY_ID('\\d+')]: (req: any) => {
      const professorId = parseInt(req.url.split('/').pop() || '0', 10);
      return getProfessorByID(professorId);
    },
    [Routes.EMPRESA_BY_CNPJ('\\d+')]: (req: any) => {
      const cnpj = req.url.split('/').pop() || '';
      return getEmpresaByCnpj(cnpj);
    },
    [Routes.MENTORIA_BY_ID('\\d+')]: (req: any) => {
      const mentoriaId = req.url.split('/').pop() || '0';
      return getMentoriaById(mentoriaId);
    },
    [Routes.SESSOES_BY_ID('\\d+')]: (req: any) => {
      const sessaoId = req.url.split('/').pop() || '0';
      return getSessaoById(sessaoId);
    },
  };

  return findMatchingRoute(routeHandlers, url);
}

function handlePostRequest(url: string, body: any): any {
  const postHandlers: { [key: string]: (req: any) => any } = {
    [Routes.SIGNIN]: signin,
  };

  return findMatchingRoute(postHandlers, url, body);
}

function findMatchingRoute(
  handlers: { [key: string]: (req: any) => any },
  url: string,
  body?: any
): any {
  for (const [pattern, handler] of Object.entries(handlers)) {
    if (urlMatchesPattern(url, pattern)) {
      return handler(body);
    }
  }
  return undefined;
}

function urlMatchesPattern(url: string, pattern: string): boolean {
  return url.match(new RegExp(`^${pattern}($|\\?+|\\/+)`, 'gi')) !== null;
}
