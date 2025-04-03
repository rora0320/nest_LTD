export const jwtConstants = {
  secret: 'lkh_LMS',
};

export interface JwtPayload {
  id: string;
  username: string;
  role: 'admin' | 'user';
}
