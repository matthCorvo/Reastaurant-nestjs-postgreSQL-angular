import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Constants } from '../../utils/constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const requestedUrl = request.url;

    // Check if the requested URL matches any of the patterns in BY_PASS_URLS
    const match = Constants.BY_PASS_URLS.some((pattern) => {
      // Replace route parameters in pattern with Express-style wildcards
      const patternWithWildcards = pattern.replace(/\/:([^/]+)/g, '/:*');
      
      // Use Express-style path matching
      const isMatch = requestedUrl.match(patternWithWildcards);
      
      return !!isMatch;
    });

    return match || super.canActivate(context);
  }
}
