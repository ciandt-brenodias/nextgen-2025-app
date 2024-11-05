import ALUNOS from '@assets/db/files/alunos.json';

export function getAlunoById(alunoId: number): { status: number; body?: any } {
  const alunos = [...ALUNOS];
  const aluno = alunos.find((aluno) => aluno.id === alunoId);

  return {
    status: 200, // HTTP OK
    body: aluno,
  };
}

export function getAlunos(): { status: number; body?: any } {
  const alunos = ALUNOS;
  return {
    status: 200, // HTTP OK
    body: alunos,
  };
}
