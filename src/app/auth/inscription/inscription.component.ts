import { Component } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye, faUser, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/ServiceAuth/auth.service';
import { ToastService } from '../../Services/ServiceToast/toast.service';
import { UserService } from '../../Services/ServiceUser/user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
  faEnvelope = faEnvelope;
  faLock = faLock;
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  faUser = faUser;
  faUserFriends = faUserFriends;

  User = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
  }
  userExiste: any;
  hidePassword: boolean = true;

  constructor(public serviceAuth: AuthService, private router: Router, public serviceToast: ToastService, public serviceUser: UserService) { }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  findByEmail(){
    this.serviceUser.findByEmail(this.User.email).subscribe(
      res => {
        this.userExiste = res;
        console.log("res"+res);
        if(this.userExiste == null){
          this.signUp();
        }
        else{
          this.serviceToast.showInfo("Email existe !");
        }
      },
      err =>{
        console.log(err);
      }
    );
  }

  signUp() {
    if (this.formValide()) {
        this.serviceAuth.register(this.User).subscribe(
          (res: any) => {
            this.serviceToast.showSuccess("Success ", "Inscription avec succès !");
            console.log(res);

            if (res && res.token) {
              localStorage.setItem('token', res.token); // Enregistrement du token dans le stockage local
            }
            this.router.navigate(['/']);
          },
          error => {
            this.serviceToast.showError("Echec d'inscription !", "Erreur");
            console.error(error);
          }
        );
      
    }
    else {
      this.serviceToast.showInfo("Veuillez vérifier tout les champs !");
    }

  }
  
  formValide(): boolean {
    return (
      !!this.User.nom &&
      !!this.User.prenom &&
      !!this.User.email &&
      !!this.User.password
    );
  }
}
