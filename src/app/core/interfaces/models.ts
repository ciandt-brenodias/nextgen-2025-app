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

export interface AvaliacaoData {
  skill: string;
  avaliacao: string;
}

export interface MentoriasPerfilData {
  id: string;
  mentoria: string;
  professor?: string;
  aluno?: string;
  sessoes: SessaoData[];
  dataInicio?: string;
  dataFim?: string;
  descricao?: string;
  skill: string,
  nivel: string,
  "n de sessoes": string,
}

export interface AlunoData {
  id: number;
  nome: string;
  cpf: string;
  talentos: {
    nome: string;
    avaliacao: number;
  }[];
  idade: number;
  email: string;
  linkedin: string;
  pronomes: string;
  endereco: string;
}