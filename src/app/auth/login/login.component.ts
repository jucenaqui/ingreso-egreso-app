import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

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

  onLogin( form: any ) {
    this.authService.login( form.email, form.password );
  }

}
