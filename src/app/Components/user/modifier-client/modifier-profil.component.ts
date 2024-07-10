import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/ServiceUser/user.service';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ToastService } from '../../../Services/ServiceToast/toast.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-modifier-profil',
  templateUrl: './modifier-profil.component.html',
  styleUrl: './modifier-profil.component.css'
})
export class ModifierProfilComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  createurCommande: any;

  constructor(public userService: UserService, private router: Router,public serviceToast:ToastService) { }
  ngOnInit(): void {
  }

  back(){
    this.router.navigate(['/listeClients']);
  }

  modifierClient(){
    this.userService.updateClient(this.userService.userAmodifier).subscribe(
      res => {
        this.router.navigate(['/listeClients']);
        this.serviceToast.showSuccess("client modifié avec succès !","")
      },
      err => {
        console.log("client "+this.userService.userAmodifier);
        this.serviceToast.showError("Echec de modification de client !","Erreur");
      }
    );
  }
}
