import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PanierComponent } from './Components/panier/panier.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { LoginComponent } from './auth/login/login.component';
import { InscriptionComponent } from './auth/inscription/inscription.component';
import {MatCardModule} from '@angular/material/card';
import { ModalComponent } from './Components/Alert/modal/modal.component';
import { CommandeComponent } from './Components/commandes/ajoutCommande/commande.component';
import { ListeCommandeComponent } from './Components/commandes/liste-commande/liste-commande.component';
import { AllProductsComponent } from './Components/produits/all-products/all-products.component';
import { ListePComponent } from './Components/produits/liste-p/liste-p.component';
import { AjoutStoreComponent } from './Components/store/ajout-store/ajout-store.component';
import { ListeSComponent } from './Components/store/liste-s/liste-s.component';
import { ModifStoreComponent } from './Components/store/modif-store/modif-store.component';
import { UserInfoComponent } from './Components/user/user-info/user-info.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { AccueilComponent } from './Components/Accueil/accueil/accueil.component';
import { NavBarAccueilComponent } from './Components/nav-bar-accueil/nav-bar-accueil.component';
import { FooterComponent } from './Components/footer/footer.component';
import { AlertComponent } from './Components/Alert/alert/alert.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AccueilAdminComponent } from './Components/Accueil/accueil-admin/accueil-admin.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { MatDialogModule } from '@angular/material/dialog';
import { DetailsCommandeComponent } from './Components/commandes/details-commande/details-commande.component';
import { ListeClientsComponent } from './Components/user/liste-clients/liste-clients.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';
import { AfficherProduitComponent } from './Components/commandes/afficher-produit/afficher-produit.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTableModule } from '@angular/material/table';
import { ProfilComponent } from './Components/user/profil/profil.component';
import { ModifierProfilComponent } from './Components/user/modifier-client/modifier-profil.component';
import { AjouterClientComponent } from './Components/user/ajouter-client/ajouter-client.component';

@NgModule({
  declarations: [
    AppComponent,
    AjoutStoreComponent,
    ModifStoreComponent,
    ListeSComponent,
    SidebarComponent,
    ListePComponent,
    PanierComponent,
    CommandeComponent,
    ListeCommandeComponent,
    NavBarComponent,
    LoginComponent,
    InscriptionComponent,
    AllProductsComponent,
    ModalComponent,
    UserInfoComponent,
    AccueilComponent,
    NavBarAccueilComponent,
    FooterComponent,
    AlertComponent,
    AccueilAdminComponent,
    DetailsCommandeComponent,
    ListeClientsComponent,
    AfficherProduitComponent,
    ProfilComponent,
    ModifierProfilComponent,
    AjouterClientComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    FontAwesomeModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    ScrollingModule,
    MatTabsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPaginationModule,
    MatDialogModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxChartsModule,
    MatTableModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
