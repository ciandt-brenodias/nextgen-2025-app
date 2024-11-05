import SESSOES from '@assets/db/files/sessoes.json';

export function getSessaoById(sessaoId: string): {
  status: number;
  body?: any;
} {
  const sessoes = [...SESSOES];
  const sessao = sessoes.find((sessao) => sessao.id === sessaoId);

  return {
    status: 200, // HTTP OK
    body: sessao,
  };
}

export function getSessoes(): { status: number; body?: any } {
  const sessoes = [...SESSOES];
  return {
    status: 200, // HTTP OK
    body: sessoes,
  };
}
