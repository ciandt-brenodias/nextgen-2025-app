export interface MentoriaData {
  id: string;
  mentoria: string;
  professor?: string;
  aluno?: string;
  sessoes: SessaoData[];
  dataInicio?: string;
  dataFim?: string;
  descricao?: string;
}

export interface SessaoData {
  sessaoId: string;
  feedback: string;
  data: string;
}

export interface FeedbackProfessorModalData {
  mentoria: MentoriaData, feedbackNovo: { sessao: string, feedback: string, id: string }
}

export interface UserToken {
  exp: string,
  grant_type: string,
  id: string,
  nome: string,
  documento: string,
  perfil: string,
  email: string,
}