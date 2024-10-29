import { SessionService } from './session.service';

describe('SessionService', () => {
  let sessionService: SessionService;

  beforeEach(() => {
    sessionService = new SessionService();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should set and get access token', () => {
    const token = 'test-token';
    sessionService.setAccessToken(token);
    expect(sessionService.getAccessToken()).toBe(token);
  });

  it('should set and get expiration date', () => {
    const expDate = '2022-01-01';
    sessionService.setExpirationDate(expDate);
    expect(sessionService.getExpirationDate()).toBe(expDate);
  });

  it('should set and get user data', () => {
    const username = 'test-user';
    sessionService.setUserData(username);
    expect(sessionService.getUserData()).toBe(username);
  });

  it('should remove session data', () => {
    sessionService.setAccessToken('test-token');
    sessionService.setExpirationDate('2022-01-01');
    sessionService.setUserData('test-user');
    sessionService.removeSessionData();
    expect(sessionService.getAccessToken()).toBe('');
    expect(sessionService.getExpirationDate()).toBe('');
    expect(sessionService.getUserData()).toBe('');
  });
});
