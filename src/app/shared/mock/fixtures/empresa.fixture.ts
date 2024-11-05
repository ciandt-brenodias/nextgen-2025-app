import EMPRESAS from '@assets/db/files/empresas.json';

export function getEmpresaByCnpj(cnpj: string): { status: number; body?: any } {
  const empresas = [...EMPRESAS];
  const empresa = empresas.find((empresa) => empresa.cnpj === cnpj);

  return {
    status: 200, // HTTP OK
    body: empresa,
  };
}

export function getEmpresas(): { status: number; body?: any } {
  const empresas = [...EMPRESAS];
  return {
    status: 200, // HTTP OK
    body: empresas,
  };
}
