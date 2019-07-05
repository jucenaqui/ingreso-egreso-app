import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

// sweetalert
import Swal from 'sweetalert2';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth,
               private router: Router,
               private fbBd: AngularFirestore ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( fbUser => {
       console.log(fbUser);
    });
  }

  crearUsuario( nombre: string, email: string, password: string ) {
      this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then( afUser => {


          const user: User = {
            nombre,
            email: afUser.user.email,
            uid: afUser.user.uid
          };
debugger
          this.fbBd.doc(`${ user.uid }/usuario`)
            .set( user )
            .then( () => {
              debugger
              this.router.navigate(['/']);
            }).catch( error => {
              console.log(error);
            });

      })
      .catch( error => {
        Swal.fire('Error en el registro', error.message, 'error');
      });

  }

  login( email: string, password: string) {

    this.afAuth.auth.signInWithEmailAndPassword(email, password)
     .then( user => {
        this.router.navigate(['/']);
     })
     .catch( error => {
        console.error(error);
        Swal.fire('Error en el login', error.message, 'error');
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
