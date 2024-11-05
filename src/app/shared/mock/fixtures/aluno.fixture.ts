import {
  RequestInfo,
  ResponseOptions,
  STATUS,
} from 'angular-in-memory-web-api';
import * as ALUNOS from '@assets/db/files/alunos.json';

export function getAlunoById(
  reqInfo: RequestInfo
): ResponseOptions | undefined {
  const urlParts = reqInfo.url.split('/');
  const alunoId = parseInt(urlParts.find((part) => part.match('\\d') != null));
  const alunos = ALUNOS;
  const aluno = alunos.find((aluno) => aluno.id === alunoId);

  return {
    status: STATUS.OK,
    body: aluno,
  };
}

export function getAlunos(): ResponseOptions | undefined {
  const alunos = ALUNOS;
  return {
    status: STATUS.OK,
    body: alunos,
  };
}
