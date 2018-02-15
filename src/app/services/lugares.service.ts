import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Injectable()
export class LugaresService {
  API_ENDPOINT = 'https://platzysquare-1517254530018.firebaseio.com';
  lugares:any =[
    {id:1, nombre:"Floreria la ", active:false, cercania:1, distancia:1, plan:"pagado", descripcion: 'Descripcion  del lugar de trabajo'},
    {id:2, nombre:"Donas la pasadita", active:true, cercania:1, distancia:1.8, plan:"gratuito", descripcion: 'Descripcion  del lugar de trabajo'},
    {id:3, nombre:"Veterinaria Huellita", active:false, cercania:2, distancia:5, plan:"pagado", descripcion: 'Descripcion  del lugar de trabajo'},
    {id:4, nombre:"Floreria la gardenia", active:true, cercania:3, distancia:10, plan:"pagado", descripcion: 'Descripcion  del lugar de trabajo'},
    {id:5, nombre:"Donas la pasadita", active:true, cercania:3, distancia:30, plan:"gratuito", descripcion: 'Descripcion  del lugar de trabajo'},
    {id:6, nombre:"Zapateria el clavo", active:true, cercania:3, distancia:120, plan:"pagado", descripcion: 'Descripcion  del lugar de trabajo'}
  ]

  constructor(private afDb: AngularFireDatabase, private http: HttpClient) { }

  public getLugares(){
    return this.afDb.list('lugares');
    //return this.http.get(this.API_ENDPOINT+'/lugares.json?auth=${ls.stsTokenManager.accessToken}');
  }
 
  public buscarLugar(id){
    return this.lugares.filter((lugar) => {return  lugar.id == id})[0] || null;
  }

  public guardarLugar(lugar){
    //this.afDb.database.ref('lugares/'+lugar.id).set(lugar);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this.API_ENDPOINT+'/lugares.json', lugar, {headers: headers});
  }

  public editarLugar(lugar){
    this.afDb.database.ref('lugares/'+lugar.id).set(lugar);
  }

  public obtenerGeoData(direccion){
    return this.http.get('http://maps.google.com/maps/api/geocode/json?address='+direccion);
  }

  public getLugar(id){
    return this.afDb.object('lugares/'+id);
  }
  
}
