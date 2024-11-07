import ALUNOS from '@assets/db/files/alunos.json';
import SESSOES from '@assets/db/files/sessoes.json';
import MENTORIAS from '@assets/db/files/mentorias.json';
import PROFESSORES from '@assets/db/files/professores.json';

export function getAlunoById(alunoId: number): { status: number; body?: any } {
  const alunos = [...ALUNOS];
  const aluno = alunos.find((aluno) => aluno.id === alunoId);

  return {
    status: 200, // HTTP OK
    body: aluno,
  };
}

export function getMentoriasFromAlunoById(alunoId: number): {
  status: number;
  body?: any;
} {
  const sessoes = [...SESSOES];
  const mentorias = [...MENTORIAS];
  const professores = [...PROFESSORES];

  const alunoSessoes = sessoes.filter((sessao) => sessao.aluno_id === alunoId);
  const alunoMentorias = alunoSessoes.map((sessao) =>
    mentorias.find((mentoria) => mentoria.id === sessao.mentoria_id)
  );
  const result = alunoMentorias.map((mentoria) => {
    const professor = professores.find(
      (prof) => prof.id === mentoria?.professor_id
    );
    return {
      mentoria: mentoria?.titulo,
      professor: professor?.nome,
    };
  });

  console.log('[RESULT]', result);

  return {
    status: 200,
    body: result,
  };
}

export function getAlunos(): { status: number; body?: any } {
  const alunos = ALUNOS;
  return {
    status: 200, // HTTP OK
    body: alunos,
  };
}
