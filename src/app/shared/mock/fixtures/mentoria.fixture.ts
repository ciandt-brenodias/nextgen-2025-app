import {
  RequestInfo,
  ResponseOptions,
  STATUS,
} from 'angular-in-memory-web-api';
import * as MENTORIAS from '@assets/db/files/mentorias.json';

export function getMentoriaById(
  reqInfo: RequestInfo
): ResponseOptions | undefined {
  const urlParts = reqInfo.url.split('/');
  const mentoriaId = urlParts.find((part) => part.match('\\d') != null);
  const mentorias = MENTORIAS;
  const mentoria = mentorias.find((mentoria) => mentoria.id === mentoriaId);

  return {
    status: STATUS.OK,
    body: mentoria,
  };
}

export function getMentorias(): ResponseOptions | undefined {
  const mentorias = MENTORIAS;
  return {
    status: STATUS.OK,
    body: mentorias,
  };
}
