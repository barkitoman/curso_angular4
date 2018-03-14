import { Component } from '@angular/core';
import { AutorizacionService } from './services/autorizacion.service';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn = false;
  email = "";
  loggeduser:any = null;
  constructor(private autorizacionService: AutorizacionService){
    this.autorizacionService.isLogged()
      .subscribe((result) => {
        if (result && result.uid){
          this.loggedIn = true;
          setTimeout(() => {
            this.loggeduser = this.autorizacionService.getUser().currentUser.email;
            console.log(this.loggeduser);
          }, 500);
          
        }else{
          this.loggedIn = false;
        }
      }, (error)=>{
        this.loggedIn = false;
      })
  }

  logout(){
    this.autorizacionService.logout();
  }
}
