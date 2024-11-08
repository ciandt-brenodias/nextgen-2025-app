import PROFESSORES from '@assets/db/files/professores.json';
import ALUNOS from '@assets/db/files/alunos.json';
import MENTORIAS from '@assets/db/files/mentorias.json';
import SESSOES from '@assets/db/files/sessoes.json';

export function getProfessorByID(professorId: number): {
  status: number;
  body?: any;
} {
  const professores = [...PROFESSORES];
  const professor = professores.find(
    (professor) => professor.id === professorId
  );

  return {
    status: 200, // HTTP OK
    body: professor,
  };
}

export function getAlunosFromMentoriaByProfessorId(professorId: number) {
  const sessoes = [...SESSOES];
  const mentorias = [...MENTORIAS];
  const alunos = [...ALUNOS];

  const professorMentorias = mentorias.filter(
    (mentoria) => mentoria.professor_id === professorId
  );

  const result = [];

  professorMentorias.forEach((mentoria) => {
    const mentoriaSessoes = sessoes.filter(
      (sessao) => sessao.mentoria_id === mentoria.id
    );

    mentoriaSessoes.forEach((sessao) => {
      const aluno = alunos.find((aluno) => aluno.id === sessao.aluno_id);
      const existingEntry = result.find(
        (entry) => entry.aluno === aluno?.nome && entry.mentoria === mentoria.titulo
      );

      if (existingEntry) {
        existingEntry.sessoes.push({ sessaoId: sessao.id });
      } else {
        result.push({
          aluno: aluno?.nome,
          mentoria: mentoria.titulo,
          id: mentoria.id,
          sessoes: [{ sessaoId: sessao.id, feedback: sessao.feedback, data: sessao.data }],
        });
      }
    });
  });

  return {
    status: 200,
    body: result,
  };
}

export function getProfessores(): { status: number; body?: any } {
  const professores = [...PROFESSORES];
  return {
    status: 200, // HTTP OK
    body: professores,
  };
}
