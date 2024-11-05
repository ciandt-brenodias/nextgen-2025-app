function generateToken(
  id: number,
  nome: string,
  documento: string,
  perfil: string,
  email: string
) {
  const date = new Date();
  date.setDate(date.getDate() + 1);

  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const payload = {
    exp: date,
    grant_type: 'password',
    id,
    nome,
    documento,
    perfil,
    email,
  };

  const coded =
    btoa(JSON.stringify(header)) + '.' + btoa(JSON.stringify(payload));

  return {
    access_token: coded,
    scope: 'mock',
    token_type: 'mock_token',
  };
}

export default generateToken;
