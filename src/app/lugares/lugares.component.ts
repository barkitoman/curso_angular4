import { Component, OnInit, style, transition, animate } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { trigger, state } from '@angular/core';
import { Observable } from '@firebase/util';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css'],
  animations: [
    trigger('contenedorAnimable', [
      state('inicial', style({
        opacity: 0, 
        backgroundColor: 'green',
        transform: 'rotate3d(0,0,0,0deg)'
      })),
      state('final', style({
        opacity: 1, 
        backgroundColor: 'yellow',
        transform: 'rotate3d(5,10,20,30deg)'
      })),
      transition('inicial => final', animate(1000)),
      transition('final => inicial', animate(500)),
    ]),
    trigger('contenedorAnimable1', [
      state('inicial', style({
        opacity: 0       
      })),
      state('final', style({
        opacity: 1
      })),
      transition('inicial => final', animate(2000)),
      transition('final => inicial', animate(1000)),
    ])
  ]
})
export class LugaresComponent implements OnInit {
  title = 'PlatziSquare';
  lat:number = 6.1646089;
  lng:number = -75.5820965;
  lugares = null;
  //lugares:Observable<any[]>;
  state = 'inicial';

  animar(){
    this.state = (this.state == 'final') ? 'inicial' : 'final';
  }

  animacionInicia(e){
    console.log(e);
    console.log("Iniciado");
  }
  animacionTermina(e){
    console.log(e);
    console.log("Terminado");
  }

  constructor(private lugaresService: LugaresService){
    //this.lugares = lugaresService.getLugares();
    //In case de usar http
    lugaresService.getLugares().valueChanges()
      .subscribe(lugares => {
        this.lugares = lugares;
        // var me =  this;
        // me.lugares = Object.keys(me.lugares).map(function (key) { return me.lugares[key]; });
        this.state = 'final';
      })
  }
  ngOnInit(){
    this.lugares = {}
  }
}
