import {
  RequestInfo,
  ResponseOptions,
  STATUS,
} from 'angular-in-memory-web-api';
import * as PROFESSORES from '@assets/db/files/professores.json';

export function getProfessorByID(
  reqInfo: RequestInfo
): ResponseOptions | undefined {
  const urlParts = reqInfo.url.split('/');
  const professorId = parseInt(
    urlParts.find((part) => part.match('\\d') != null)
  );

  const professores = PROFESSORES;
  const professor = professores.find(
    (professor) => professor.id === professorId
  );

  return {
    status: STATUS.OK,
    body: professor,
  };
}

export function getProfessores(): ResponseOptions | undefined {
  const professores = PROFESSORES;
  return {
    status: STATUS.OK,
    body: professores,
  };
}
