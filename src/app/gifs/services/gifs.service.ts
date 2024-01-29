import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

// ProvideIn: root, permite que todos los servicios esten disponibles para todo el aplicativo
// cuando no esta en root toca imporrar el servicio a cada modulo


@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];
  private _tagsHistory:   string[] = [];
  private apiKey:         string = '5VSRJK25YMnhIsM7GpYF2Mx00ihFKo37';
  private serviceUrl:     string = 'https://api.giphy.com/v1/gifs';


  constructor( private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready')
   }


  get tagsHistory(){
    // Crea una copia de los valores
    return [...this._tagsHistory];
  }

  private organizeHistory( tag : string ): void{
    // Transforma a minuscula la palabra dado que TypeScript es case Sensitive
    tag = tag.toLowerCase();

    // Compara la nueva palabra buscada con la lista de palabras
    if( this._tagsHistory.includes(tag) ){

      // Si la pabra existe se filtra el arreglo y lo devuelve sin la palabra buscada
      this._tagsHistory = this._tagsHistory.filter((oldTag)=> oldTag != tag );

    }

    // Se coloca la palabra al inicio
    this._tagsHistory.unshift(tag);

    // Se corta el arreglo para que solo tenga 10 elementos
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify( this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if ( !localStorage.getItem('history') ) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if( this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }


  searchTag( tag: string): void{

    // Si no existe una palabra al poner enter no ingresa un elemento vacio al arreglo
    if( tag.length === 0 ) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', tag)

    // Esto no es una promesa es un observable, es decir, a lo largo del tiempo
    // puede emitir valores
    // En este caso se subscribe para poder escuchar la respuesta
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
    .subscribe( resp =>{

      this.gifList = resp.data;
      console.log({gifs : this.gifList});

    })

    // Una forma de utilizar el api - utilizando promesas
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=5VSRJK25YMnhIsM7GpYF2Mx00ihFKo37&q=Valorant&limit=10')
    // .then( resp => resp.json())
    // .then(data => console.log(data))
  }

}
