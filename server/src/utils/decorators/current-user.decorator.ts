import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Crée un décorateur de paramètre appelé "CurrentUser"
export const CurrentUser = createParamDecorator(
  // Le décorateur prend deux arguments : "data" et "ctx"
  (data: never, ctx: ExecutionContext) => {
    // obtenir l'objet de requête HTTP
    const request = ctx.switchToHttp().getRequest();

    // return la valeur de la propriété "currentUser" de l'objet de requête
    return request.currentUser;
  }
);
