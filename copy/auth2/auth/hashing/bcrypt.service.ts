import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { genSalt, hash, compare } from 'bcrypt';

@Injectable()
export class BcryptService implements HashingService {

   async hash(data: string | Buffer): Promise<string> {
      const salt = await genSalt();
      return this.hash(data);
    }
    async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
       return this.compare(data, encrypted);
    }
}
