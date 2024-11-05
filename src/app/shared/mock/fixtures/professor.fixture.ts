import PROFESSORES from '@assets/db/files/professores.json';

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

export function getProfessores(): { status: number; body?: any } {
  const professores = [...PROFESSORES];
  return {
    status: 200, // HTTP OK
    body: professores,
  };
}
