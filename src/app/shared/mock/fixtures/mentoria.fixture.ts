import MENTORIAS from '@assets/db/files/mentorias.json';

export function getMentoriaById(mentoriaId: string): {
  status: number;
  body?: any;
} {
  const mentorias = [...MENTORIAS];
  const mentoria = mentorias.find((mentoria) => mentoria.id === mentoriaId);

  return {
    status: 200, // HTTP OK
    body: mentoria,
  };
}

export function getMentorias(): { status: number; body?: any } {
  const mentorias = [...MENTORIAS];
  return {
    status: 200, // HTTP OK
    body: mentorias,
  };
}
