import {
  STATUS,
  RequestInfo,
  ResponseOptions,
} from 'angular-in-memory-web-api';
import * as USERS from '@assets/db/files/users.json';
import generateToken from './token.fixture';

const users = USERS;

const signin = (reqInfo: RequestInfo): ResponseOptions | undefined => {
  console.log('[REQ INFO]', reqInfo);
  const urlParams = new URLSearchParams(reqInfo['req']['body']);
  const query = users.filter((user) => {
    return (
      user.email === urlParams.get('email') &&
      user.password === urlParams.get('password')
    );
  });

  const options: ResponseOptions = {};
  if (query.length !== 0) {
    const user = query[0];

    options.body = generateToken(
      user.id,
      user.nome,
      user.documento,
      user.perfil,
      user.email
    );
    options.status = STATUS.OK;
  } else {
    options['error'] = { error_description: 'BAD_CREDENTIAL_EXCEPTION' };
    options.status = STATUS.BAD_REQUEST;
  }

  return options;
};

const signout = (reqInfo: RequestInfo): ResponseOptions | undefined => {
  const options: ResponseOptions = {
    status: STATUS.OK,
    body: 'Logout successful',
  };
  return options;
};

export { users, signin, signout };
