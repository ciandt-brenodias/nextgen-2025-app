import FEEDBACKS from '@assets/db/files/feedbacks.json';

export function getFeedbackByAlunoId(alunoId: number): {
  status: number;
  body?: any;
} {
  const feedbacks = [...FEEDBACKS];
  const feedback = feedbacks.find((feedback) => feedback.aluno_id === alunoId);

  return {
    status: 200, // HTTP OK
    body: feedback,
  };
}
