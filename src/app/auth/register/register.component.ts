import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor( private authService: AuthService ) { }

  ngOnInit() {
  }

  onSubmit( form: any ) {
    this.authService.crearUsuario( form.nombre, form.email, form.password );
  }

}
