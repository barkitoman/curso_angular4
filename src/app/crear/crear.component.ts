import { Component, OnInit } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Component({ 
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  
  lugar:any = {};
  id:any = null;
  nombreBtn = '';
  results$: Observable<any>;
  private searchField: FormControl;
  constructor(private lugaresService: LugaresService, private route: ActivatedRoute, private http: HttpClient) {
    this.id  = route.snapshot.params['id'];
    if (this.id != 'new')
    {
      this.nombreBtn = 'Editar'
      debugger;
      this.lugaresService.getLugar(this.id).valueChanges().subscribe(lugar => {
        this.lugar = lugar;
        
      });
    }else{
      this.nombreBtn = 'Guardar'
    }
    const URL = 'https://maps.google.com/maps/api/geocode/json';
    this.searchField = new FormControl();
    this.results$ = this.searchField.valueChanges
        .debounceTime(500)
        .switchMap(query => this.http.get(`${URL}?address=${query}`))
        .map(response => response["results"]);
  }

  ngOnInit() {
  }
 
  guardarLugar(){
    var direccion  = this.lugar.calle+','+this.lugar.ciudad+','+this.lugar.pais;
    this.lugaresService.obtenerGeoData(direccion)
      .subscribe((result) => {
        this.lugar.lat = result["results"][0].geometry.location.lat;
        this.lugar.lng = result["results"][0].geometry.location.lng;
        if (this.id != 'new'){
          this.lugaresService.editarLugar(this.lugar);
          alert('Negocio Editado  < con exito');
        }else{
          this.lugar.id = Date.now();
          this.lugaresService.guardarLugar(this.lugar).subscribe(
            (data) => {
              console.log(data);
            },
            (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                console.log('Client-side error occured.');
              } else {
                console.log('Server-side error occured.');
              }
            }
          );
          alert('Negocio Guardado con exito');
        }
        
        this.lugar = {};
      })
    
  }

  seleccionarDireccion(result) {
    const addressComponents = result.address_components
    const adrressParams: any = {}
    for (let i = 0, len = addressComponents.length; i < len; i++) {
      const type = addressComponents[i].types[0].toString()
      switch (type) {
        case'street_number':
          adrressParams.street_number = addressComponents[i].long_name
          break
        case'route':
          adrressParams.route = addressComponents[i].long_name
          break
        case'locality':
          adrressParams.locality = addressComponents[i].long_name
          break
        case'country':
          adrressParams.country = addressComponents[i].long_name
          break
      }
    }
    this.lugar.calle = `${adrressParams.route} ${adrressParams.street_number}`
    this.lugar.ciudad = adrressParams.locality
    this.lugar.pais = adrressParams.country
  }

}
