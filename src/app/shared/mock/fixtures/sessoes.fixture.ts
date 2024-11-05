import {
  RequestInfo,
  ResponseOptions,
  STATUS,
} from 'angular-in-memory-web-api';
import * as SESSOES from '@assets/db/files/sessoes.json';

export function getSessaoById(
  reqInfo: RequestInfo
): ResponseOptions | undefined {
  const urlParts = reqInfo.url.split('/');
  const sessaoId = urlParts.find((part) => part.match('\\d') != null);

  const sessoes = SESSOES;
  const sessao = sessoes.find((sessao) => sessao.id === sessaoId);

  return {
    status: STATUS.OK,
    body: sessao,
  };
}

export function getSessoes(): ResponseOptions | undefined {
  const sessoes = SESSOES;
  return {
    status: STATUS.OK,
    body: sessoes,
  };
}
