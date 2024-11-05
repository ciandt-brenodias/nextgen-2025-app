import {
  RequestInfo,
  ResponseOptions,
  STATUS,
} from 'angular-in-memory-web-api';
import * as EMPRESAS from '@assets/db/files/empresas.json';

export function getEmpresaByCnpj(
  reqInfo: RequestInfo
): ResponseOptions | undefined {
  const urlParts = reqInfo.url.split('/');
  const empresaId = urlParts.find((part) => part.match('\\d') != null);
  const empresas = EMPRESAS;
  const empresa = empresas.find((empresa) => empresa.cnpj === empresaId);

  return {
    status: STATUS.OK,
    body: empresa,
  };
}

export function getEmpresas(): ResponseOptions | undefined {
  const empresas = EMPRESAS;
  return {
    status: STATUS.OK,
    body: empresas,
  };
}
