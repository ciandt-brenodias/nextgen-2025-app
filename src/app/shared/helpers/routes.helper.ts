const BASE_URL = 'api';

export class Routes {
  // Auth
  static SIGNUP = `${BASE_URL}/signup`;
  static SIGNIN = `${BASE_URL}/signin`;

  // Alunos
  static ALUNOS = `${BASE_URL}/aluno`;

  // Professores
  static PROFESSORES = `${BASE_URL}/professor`;

  // Empresa
  static EMRPESAS = `${BASE_URL}/empresa`;
  static CRIAR_EMPRESA = `${BASE_URL}/empresa`;

  // Mentorias
  static MENTORIAS = `${BASE_URL}/mentoria`;

  // Sessoes
  static SESSOES = `${BASE_URL}/sessao`;

  static ALUNO_BY_ID = (id: number | string) => `${BASE_URL}/aluno/${id}`;
  static MENTORIAS_FROM_ALUNO_BY_ID = (id: number | string) =>
    `${BASE_URL}/aluno/mentorias/${id}`;
  static PROFESSOR_BY_ID = (id: number | string) =>
    `${BASE_URL}/professor/${id}`;
  static MENTORIAS_FROM_PROFESSOR_BY_ID = (id: number | string) =>
    `${BASE_URL}/professor/mentorias/${id}`;
  static EMPRESA_BY_CNPJ = (id: number | string) => `${BASE_URL}/empresa/${id}`;
  static MENTORIA_BY_ID = (id: number | string) => `${BASE_URL}/mentoria/${id}`;
  static SESSOES_BY_ID = (id: number | string) => `${BASE_URL}/sessao/${id}`;
  static FEEDBACK_BY_ALUNO_ID = (id: number | string) =>
    `${BASE_URL}/feedback/${id}`;
}

export class Pages {
  static LOGIN = '/login';
}
