import { ITokenPayload } from 'src/tokens/types';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User extends ITokenPayload {
      refreshToken?: string;
    }
  }
}
