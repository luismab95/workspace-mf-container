import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HideNavScrollService {
  constructor() {}

  show: boolean = false;
}
