import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StoreService implements OnInit{
  stores : any;
  storeModif: any;
  idStore: any;
  private urlStore = 'http://localhost:8080/api/store/';
  listeStores:any;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  createNewStore(store: any) {
    return this.http.post(this.urlStore + "add", store);
  }
  updateStore(store: any) {
    return this.http.put(this.urlStore + "update", store);
  }
  getAll() {
    return this.http.get(this.urlStore);
  }
  deleteStore(id: any) {
    return this.http.delete(this.urlStore + "delete/" + id);
  }

  getStoreParId(id: any) {
    return this.http.get(this.urlStore + "findstoreById/" + id);
  }

  getProductsByStore(id: any) {
    return this.http.get(this.urlStore + "getAllproduitsByStore/" + id);
  }
  filterStoresByName(nom: string){
    return this.http.get(this.urlStore + "findStoreByNom/" + nom );
  }
  nombreStores(){
    return this.http.get(this.urlStore + "nbreStores");
  }
  filterProduit(nom:string){
    return this.http.get(this.urlStore + "filter/" + nom + "/" + this.idStore);
  }
}
