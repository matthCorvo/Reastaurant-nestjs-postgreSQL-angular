import { Injectable } from '@angular/core';
import { Options } from '../shared/models/Options';
import { sample } from 'rxjs';
import { sample_options } from 'src/data';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  constructor() { }

  getAll():Options[]{
    return sample_options;
  }
}