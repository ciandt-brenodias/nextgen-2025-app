import USERS from '@assets/db/files/users.json';
import generateToken from './token.fixture';

const signin = (body: any): { status: number; body?: any; error?: any } => {
  const users = [...USERS];

  // Extract email and password from the body
  const { email, password } = body;

  // Filter users based on email and password
  const query = users.filter((user) => {
    return user.email === email && user.password === password;
  });

  const response: { status: number; body?: any; error?: any } = {} as {
    status: number;
    body?: any;
    error?: any;
  };

  if (query.length !== 0) {
    const user = query[0];

    response.body = generateToken(
      user.id,
      user.nome,
      user.documento,
      user.perfil,
      user.email
    );
    response.status = 200; // HTTP OK
  } else {
    response.error = { error_description: 'BAD_CREDENTIAL_EXCEPTION' };
    response.status = 400; // HTTP Bad Request
    throw new Error('Invalid email or password');
  }

  return response;
};

export { signin };
