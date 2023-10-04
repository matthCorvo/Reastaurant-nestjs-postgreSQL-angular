import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  mixin
} from '@nestjs/common';
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

export const AuthorizeGuard = (allowedRoles: string[]) => {
  class RolesGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const result = request?.currentUser?.roles.map((role: string) => allowedRoles.includes(role)).find((val: boolean) => val === true);
      if (result) return true;
      throw new UnauthorizedException("Désolé, vous n'êtes pas autorisé.");
    }
  }
  const guard = mixin(RolesGuardMixin);
  return guard;
};
