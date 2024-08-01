import { AuthGuard } from '@nestjs/passport';

export default class RefreshGuard extends AuthGuard('jwt-refresh') {}
