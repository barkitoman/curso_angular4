import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import {ToasterService} from 'angular5-toaster';



@Injectable()
export class MyInterceptor implements HttpInterceptor {
    
    constructor(private toasterService: ToasterService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(req).do(event => {
            if (event instanceof HttpResponse){
            console.log(event);
            this.toasterService.pop('success', event.statusText, 'La llamada salio bien');
            }
        },(error) => {
            console.log(error, error.statusText);
            this.toasterService.pop('error', error.statusText, error.message);
        });
    }
}