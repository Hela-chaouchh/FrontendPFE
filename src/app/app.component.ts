import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './Services/ServiceUser/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';

  constructor(private router: Router, public serviceUser: UserService) {}

  isLoginPage(): boolean {
    return this.router.url === '/';
  }

  isInscriptionPage(): boolean {
    return this.router.url === '/register';
  }
  isAccueilPage():  boolean {
    return this.router.url==="/accueil";
  }
  isAjoutCommandePage():  boolean {
    return this.router.url==="/commande";
  }
  interfacesAdmin(): boolean {
    return this.router.url==="/ajout" || this.router.url==="/modif" || this.router.url==="/userInfo" || this.router.url==="/listeClients" || this.router.url==="/modif" || this.router.url==="/accueilAdmin" || ((this.serviceUser.isAdmin() && (this.router.url==="/liste" || this.router.url==="/panier"))) ;
  }



}
