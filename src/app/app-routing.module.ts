import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ModalComponent } from './Components/Alert/modal/modal.component';
import { CommandeComponent } from './Components/commandes/ajoutCommande/commande.component';
import { ListeCommandeComponent } from './Components/commandes/liste-commande/liste-commande.component';
import { PanierComponent } from './Components/panier/panier.component';
import { AllProductsComponent } from './Components/produits/all-products/all-products.component';
import { ListePComponent } from './Components/produits/liste-p/liste-p.component';
import { AjoutStoreComponent } from './Components/store/ajout-store/ajout-store.component';
import { ListeSComponent } from './Components/store/liste-s/liste-s.component';
import { ModifStoreComponent } from './Components/store/modif-store/modif-store.component';
import { InscriptionComponent } from './auth/inscription/inscription.component';
import { UserInfoComponent } from './Components/user/user-info/user-info.component';
import { AccueilComponent } from './Components/Accueil/accueil/accueil.component';
import { DetailsCommandeComponent } from './Components/commandes/details-commande/details-commande.component';
import { ListeClientsComponent } from './Components/user/liste-clients/liste-clients.component';
import { AccueilAdminComponent } from './Components/Accueil/accueil-admin/accueil-admin.component';
import { ProfilComponent } from './Components/user/profil/profil.component';
import { ModifierProfilComponent } from './Components/user/modifier-client/modifier-profil.component';
import { AjouterClientComponent } from './Components/user/ajouter-client/ajouter-client.component';

const routes: Routes = [
 // { path: '', redirectTo: '/liste' , pathMatch: 'full' },
  { path: '', component : LoginComponent },
  { path: 'accueil', component : AccueilComponent },
  { path: 'ajout', component : AjoutStoreComponent },
  { path: 'modif', component : ModifStoreComponent },
  { path: 'liste', component : ListeSComponent },
  { path: 'listeProd', component : ListePComponent },
  { path: 'panier', component : PanierComponent },
  { path: 'commande', component : CommandeComponent },
  { path: 'listeCmd', component : ListeCommandeComponent },
  { path: 'register', component : InscriptionComponent },
  { path: 'allProducts', component : AllProductsComponent },
  { path: 'alert', component : ModalComponent },
  { path: 'userInfo', component : UserInfoComponent },
  { path: 'detailsCmd', component : DetailsCommandeComponent },
  { path: 'listeClients', component : ListeClientsComponent },
  { path: 'accueilAdmin', component : AccueilAdminComponent },
  { path: 'profil', component : ProfilComponent },
  { path: 'modifierClient', component : ModifierProfilComponent },
  { path: 'ajouterClient', component : AjouterClientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
