import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/ServiceUser/user.service';
import { CommandeService } from '../../../Services/ServiceCommande/commande.service';
import { StoreService } from '../../../Services/ServiceStore/store.service';
import { ProduitService } from '../../../Services/ServiceProduit/produit.service';
import { forkJoin, tap } from 'rxjs';


@Component({
  selector: 'app-accueil-admin',
  templateUrl: './accueil-admin.component.html',
  styleUrl: './accueil-admin.component.css',
})
export class AccueilAdminComponent implements OnInit {
  constructor(public serviceUser: UserService, public serviceCommande: CommandeService, public serviceStore: StoreService, public serviceProduit: ProduitService) {

  }

  nbreClients: any;
  nbreStores: any;
  nbreCommandes: any;
  nbreProduits: any;
  totalVentes: any;

  view: [number, number] = [950, 350];
  barChartcustomColors =
    [
      { name: "Wind Consulting", value: 'rgba(117, 230, 245)' },
      { name: "Al Vetrina", value: 'rgb(44, 107, 233)' },
      { name: "Wind (Api Paginée)", value: 'rgb(244, 166, 98)' },
      { name: "fakestore", value: 'pink' },
    ]
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Mois';
  showYAxisLabel = true;
  yAxisLabel = 'Ventes';
  autoScale = true;
  orders: any;

  isDataLoaded: boolean = false;
  data: any[] = [];

  venteByStore: any;
  
  customColorScheme = {
    domain: ['#FF5733', '#FFC300', '#C70039', '#900C3F', '#581845'] // Ajoutez vos couleurs personnalisées ici
  };

  ngOnInit() {
    this.getNbreClients();
    this.getNombreCommandes();
    this.getNombreStores();
    this.getNombreProduits();
    this.getTotalVentes();
    this.getStores();
  }

  onSelect(event: any) {
    // Gérer la sélection
  }
  
  getNbreClients() {
    this.serviceUser.nbreClients().subscribe(
      res => {
        this.nbreClients = res;
      },
      err => {
        console.error(err);
      }
    );
  }

  getNombreCommandes() {
    this.serviceCommande.nombreCommandes().subscribe(
      res => {
        this.nbreCommandes = res;
      },
      err => {
        console.error(err);
      }
    );
  }
  getNombreStores() {
    this.serviceStore.nombreStores().subscribe(
      res => {
        this.nbreStores = res;
      },
      err => {
        console.error(err);
      }
    );
  }
  getNombreProduits() {
    this.serviceProduit.nombreProduits().subscribe(
      res => {
        this.nbreProduits = res;
      },
      err => {
        console.error(err);
      }
    );
  }
  getTotalVentes() {
    this.serviceCommande.totalVentes().subscribe(
      res => {
        this.totalVentes = res;
      },
      err => {
        console.error(err);
      }
    );
  }

  getVenteTotalByStore(storeId: any) {
    return this.serviceCommande.totalVentesByStore(storeId).pipe(
      tap(res => console.log(`Total ventes for store ${storeId}:`, res))
    );
  }


  getStores() {
    this.serviceStore.getAll().subscribe(
      (res: any) => {
        const requests = res.map((store: any) =>
          this.getVenteTotalByStore(store.id)
        );

        forkJoin(requests).subscribe(
          (ventes: any) => {
            ventes.forEach((vente: any, index: number) => {
              this.data.push({ name: res[index].nom, value: vente });
            });
            this.isDataLoaded = true;
          },
          (err: any) => console.error('Error fetching ventes for stores:', err)
        );
      },
      (err: any) => console.error('Error fetching stores:', err)
    );
  }

}
