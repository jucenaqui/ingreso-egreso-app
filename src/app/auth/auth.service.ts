import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, subscribeOn } from 'rxjs/operators';

// sweetalert
import Swal from 'sweetalert2';

// store
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { Store } from '@ngrx/store';
import { User } from './user.model';

// firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubcription: Subscription = new Subscription();

  constructor( private afAuth: AngularFireAuth,
               private router: Router,
               private afBd: AngularFirestore,
               private store: Store<AppState> ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( fbUser => {

      if (fbUser) {
        this.userSubcription =  this.afBd.doc( `${ fbUser.uid }/usuario` )
          .valueChanges()
          .subscribe( (userObj: any) => {

             const newUser = new User( userObj );
             this.store.dispatch( new SetUserAction( newUser ) );
             console.log(newUser);
        });
      } else {
        this.userSubcription.unsubscribe();
      }
    });
  }

  crearUsuario( nombre: string, email: string, password: string ) {

    this.store.dispatch(  new ActivarLoadingAction() );

    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then( afUser => {

          const user: User = {
            nombre,
            email: afUser.user.email,
            uid: afUser.user.uid
          };

          this.afBd.doc(`${ user.uid }/usuario`)
            .set( user )
            .then( () => {
              this.store.dispatch( new DesactivarLoadingAction() );
              this.router.navigate(['/']);
            }).catch( error => {
              console.log(error);
              this.store.dispatch( new DesactivarLoadingAction() );
            });
      })
      .catch( error => {
        Swal.fire('Error en el registro', error.message, 'error');
        this.store.dispatch( new DesactivarLoadingAction() );
      });

  }

  login( email: string, password: string) {

    this.store.dispatch( new ActivarLoadingAction() );

    this.afAuth.auth.signInWithEmailAndPassword(email, password)
     .then( user => {
        this.router.navigate(['/']);
        this.store.dispatch( new DesactivarLoadingAction() );
     })
     .catch( error => {
        Swal.fire('Error en el login', error.message, 'error');
        this.store.dispatch( new DesactivarLoadingAction() );
     });
  }

  logOut() {
     this.afAuth.auth.signOut()
     .then( () => {
        this.router.navigate(['/login']);
     }).catch( error => {
       Swal.fire('Error in logout', error.message, 'error');
     });
  }

  isAuth() {

    return this.afAuth.authState
      .pipe(
        map( fbUser => {

          if ( fbUser == null ) {
            this.router.navigate(['/login']);
          }

          return fbUser != null;
        })
      );

  }

}
