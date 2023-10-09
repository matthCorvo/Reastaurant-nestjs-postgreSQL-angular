import { Injectable } from '@angular/core';
import { Options } from '../shared/models/Options';
import { sample_options } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  constructor() { }

  getAll():Options[]{
    return sample_options;
  }
}