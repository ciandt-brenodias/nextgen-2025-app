// import {
//   HttpEvent,
//   HttpHandlerFn,
//   HttpRequest,
//   HttpResponse,
// } from '@angular/common/http';
// import { delay, Observable, of } from 'rxjs';
// import { Routes } from '../helpers/routes.helper';
// import {
//   getAlunoById,
//   getAlunos,
//   getMentoriasFromAlunoById,
// } from './fixtures/aluno.fixture';
// import { getEmpresaByCnpj, getEmpresas } from './fixtures/empresa.fixture';
// import { getMentoriaById, getMentorias } from './fixtures/mentoria.fixture';
// import { getProfessorByID, getProfessores } from './fixtures/professor.fixture';
// import { getSessaoById, getSessoes } from './fixtures/sessoes.fixture';
// import { signin } from './fixtures/signin.fixture';

// export function mockDataInterceptor(
//   req: HttpRequest<any>,
//   next: HttpHandlerFn
// ): Observable<HttpEvent<any>> {
//   const url = req.url;

//   if (req.method === 'GET') {
//     const response = handleGetRequest(url);
//     if (response) {
//       return of(new HttpResponse({ status: 200, body: response })).pipe(
//         delay(3000)
//       );
//     }
//   } else if (req.method === 'POST') {
//     const response = handlePostRequest(url, req.body);
//     if (response) {
//       return of(
//         new HttpResponse({
//           status: response.status,
//           body: response.body,
//         })
//       ).pipe(delay(3000));
//     }
//   }

//   return next(req);
// }

// function handleGetRequest(url: string): any {
//   const routeHandlers: { [key: string]: (req: any) => any } = {
//     [Routes.ALUNOS]: getAlunos,
//     [Routes.EMRPESAS]: getEmpresas,
//     [Routes.PROFESSORES]: getProfessores,
//     [Routes.MENTORIAS]: getMentorias,
//     [Routes.SESSOES]: getSessoes,
//     [Routes.MENTORIAS_FROM_ALUNO_BY_ID('\\d+')]: (req: any) => {
//       const alunoId = parseInt(extractIdFromUrl(req.url, 'mentorias'));
//       return getMentoriasFromAlunoById(alunoId);
//     },
//     [Routes.ALUNO_BY_ID('\\d+')]: (req: any) => {
//       const alunoId = parseInt(extractIdFromUrl(req.url, 'aluno'));
//       return getAlunoById(alunoId);
//     },
//     [Routes.PROFESSOR_BY_ID('\\d+')]: (req: any) => {
//       const professorId = parseInt(extractIdFromUrl(req.url, 'professor'));
//       return getProfessorByID(professorId);
//     },
//     [Routes.EMPRESA_BY_CNPJ('\\d+')]: (req: any) => {
//       const cnpj = extractIdFromUrl(req.url, 'empresa');
//       return getEmpresaByCnpj(cnpj);
//     },
//     [Routes.MENTORIA_BY_ID('\\d+')]: (req: any) => {
//       const mentoriaId = extractIdFromUrl(req.url, 'mentoria');
//       return getMentoriaById(mentoriaId);
//     },
//     [Routes.SESSOES_BY_ID('\\d+')]: (req: any) => {
//       const sessaoId = extractIdFromUrl(req.url, 'sessao');
//       return getSessaoById(sessaoId);
//     },
//   };

//   return findMatchingRoute(routeHandlers, url);
// }

// function extractIdFromUrl(url: string, type: string): string {
//   const regex = new RegExp(`/${type}/(\\d+)$`); // Match the ID after the specified type
//   const match = url.match(regex);
//   return match ? match[1] : ''; // Return the ID or an empty string if not found
// }

// function handlePostRequest(url: string, body: any): any {
//   const postHandlers: { [key: string]: (req: any) => any } = {
//     [Routes.SIGNIN]: signin,
//   };

//   return findMatchingRoute(postHandlers, url, body);
// }

// function findMatchingRoute(
//   handlers: { [key: string]: (req: any) => any },
//   url: string,
//   body?: any
// ): any {
//   for (const [pattern, handler] of Object.entries(handlers)) {
//     if (urlMatchesPattern(url, pattern)) {
//       return handler(body);
//     }
//   }
//   return undefined;
// }

// function urlMatchesPattern(url: string, pattern: string): boolean {
//   return (
//     url.match(new RegExp(`^${pattern.replace('\\d+', '\\d+')}`, 'gi')) !== null
//   );
// }
import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { Routes } from '../helpers/routes.helper';
import {
  getAlunoById,
  getAlunos,
  getMentoriasFromAlunoById,
} from './fixtures/aluno.fixture';
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
  const routeHandlers: { [key: string]: (id?: any) => any } = {
    [Routes.ALUNOS]: () => getAlunos(),
    [Routes.EMRPESAS]: () => getEmpresas(),
    [Routes.PROFESSORES]: () => getProfessores(),
    [Routes.MENTORIAS]: () => getMentorias(),
    [Routes.SESSOES]: () => getSessoes(),
    [Routes.MENTORIAS_FROM_ALUNO_BY_ID(':id')]: (id: string) =>
      getMentoriasFromAlunoById(parseInt(id)),
    [Routes.ALUNO_BY_ID(':id')]: (id: string) => getAlunoById(parseInt(id)),
    [Routes.PROFESSOR_BY_ID(':id')]: (id: string) =>
      getProfessorByID(parseInt(id)),
    [Routes.EMPRESA_BY_CNPJ(':id')]: (id: string) => getEmpresaByCnpj(id),
    [Routes.MENTORIA_BY_ID(':id')]: (id: string) => getMentoriaById(id),
    [Routes.SESSOES_BY_ID(':id')]: (id: string) => getSessaoById(id),
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
  handlers: { [key: string]: (id?: any) => any },
  url: string,
  body?: any
): any {
  for (const [pattern, handler] of Object.entries(handlers)) {
    const match = url.match(urlToRegex(pattern));
    if (match) {
      const id = match[1];
      return handler(id || body);
    }
  }
  return undefined;
}

function urlToRegex(pattern: string): RegExp {
  const regexPattern = pattern.replace(/:id/, '(\\d+)'); // Convert ':id' to capture digits
  return new RegExp(`^${regexPattern}$`, 'i'); // Create a regex to match the whole URL
}
