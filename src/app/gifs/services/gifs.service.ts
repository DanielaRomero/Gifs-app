import { Injectable } from '@angular/core';

// ProvideIn: root, permite que todos los servicios esten disponibles para todo el aplicativo
// cuando no esta en root toca imporrar el servicio a cada modulo

@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagsHistory: string[] = [];

  constructor() { }

  get tagsHistory(){
    // Crea una copia de los valores
    return [...this._tagsHistory];
  }

  searchTag( tag: string): void{

    this._tagsHistory.unshift(tag);

    // console.log(this._tagsHistory);
  }

}
