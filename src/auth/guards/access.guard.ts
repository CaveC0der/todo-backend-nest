import { AuthGuard } from '@nestjs/passport';

export default class AccessGuard extends AuthGuard('jwt-access') {}
