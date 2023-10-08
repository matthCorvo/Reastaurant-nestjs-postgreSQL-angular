// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { isArray } from 'class-validator';
// import { verify } from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';
// import { UserService } from '../../../../server/src/user/user.service';
// import { UserEntity } from '../../../../server/src/user/entities/user.entity';

// declare global{
//   namespace Express{
//       interface Request{
//           currentUser?:UserEntity;
//       }
//   }
// }

// @Injectable()
// export class CurrentUserMiddleware implements NestMiddleware {
//   // Obtenir l'en-tête d'autorisation de la demande
//   constructor(private readonly userService: UserService) {}
//   async use(req: Request, res: Response, next: NextFunction) {
//     const authHeader = req.headers.authorization || req.headers.Authorization;

//     // Vérifie si l'en-tête AutoriZation est manquant, vide ou ne commence pas par 'Bearer '
//     if (
//       !authHeader ||
//       isArray(authHeader) || // Vérifiez s'il s'agit d'un tableau (ce ne devrait pas être le cas)
//       !authHeader.startsWith('Bearer ')
//     ) {
//       // Si l'une des conditions ci-dessus est remplie, définissez currentUser sur null et continuez
//       req.currentUser = null;
//       next();
//       return;
//     } else {
//       try {
//         // Si l'en-tête d'autorisation est valide, extrayez le token et vérifiez-le
//         const token = authHeader.split(' ')[1];

//         // Vérifiez le token en utilisant ACCESS_TOKEN_SECRET_KEY
//         const { id } = <JwtPayload>verify(token, process.env.ACCESS_TOKEN_SECRET_KEY );

//         // Trouvez l'utilisateur associé au token
//         const currentUser = await this.userService.findOne(+id);

//         // Définis currentUser dans l'objet de demande
//         req.currentUser = currentUser;
//         next();
//       } catch (err) {
//         // Gére les erreurs de vérification du token
//         req.currentUser = null;
//         next();
//       }
//     }
//   }
// }
// // interface JwtPayload pour représenter la structure de la charge utile JWT
// interface JwtPayload {
//   id: string;
// }
