import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';

// store
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  cargando: boolean;
  loadingSubscription: Subscription;

  constructor( private authService: AuthService,
               private store: Store<AppState> ) { }

  ngOnInit() {
    this.loadingSubscription = this.store.select('Ui').subscribe( ui => {
        this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  onSubmit( form: any ) {
    this.authService.crearUsuario( form.nombre, form.email, form.password );
  }

}
