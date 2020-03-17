import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {BehaviorSubject} from 'rxjs';
import {IUser} from '../interfaces/IUser';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public user$ = new BehaviorSubject<IUser>(null);

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router
    ) {
        this.listenUserAuthStatus();
    }

    public async googleSignin() {
        const provider = new auth.GoogleAuthProvider();
        const credential = await this.afAuth.auth.signInWithPopup(provider);
        // Full sign in credentials by Google Provider
        // console.log(credential); // you can console.log these to check what you have
    }

    public async facebookSignin() {
        const provider = new auth.FacebookAuthProvider();
        const credential = await this.afAuth.auth.signInWithPopup(provider);
        // Full sign in credentials by Facebook Provider
        // console.log(credential); // you can console.log these to check what you have
    }

    public async twitterSignin() {
        const provider = new auth.TwitterAuthProvider();
        const credential = await this.afAuth.auth.signInWithPopup(provider);
        // Full sign in credentials by Twitter Provider
        // console.log(credential); // you can console.log these to check what you have
    }

    public async signOut() {
        await this.afAuth.auth.signOut();
        // Redirect to / after Sign Out
        return this.router.navigate(['/']);
    }

    public listenUserAuthStatus() {
        this.afAuth.authState.subscribe(data => {
            if (data) {
                this.user$.next({
                    uid: data.uid,
                    name: data.displayName,
                    email: data.email,
                    photo: data.photoURL,
                    provider: data.providerData[0].providerId
                });
            } else {
                this.user$.next(null);
            }
        });
    }

}
