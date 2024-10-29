import { environment } from '@environment/environment';

const BASE_URL = environment.apiUrl;

export class Routes {
  // Auth
  static SIGNUP = `${BASE_URL}/auth/signup`;
  static SIGNIN = `${BASE_URL}/auth/signin`;
}

export class Pages {
  static LOGIN = '/login';
}
