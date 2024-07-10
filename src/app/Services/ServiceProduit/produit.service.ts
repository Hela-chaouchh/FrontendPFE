import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  produits: any;
  private urlProduit = 'http://localhost:8080/api/product/';
  
  constructor(private http: HttpClient) { }

  getAllProduits() {
    return this.http.get(this.urlProduit);
  }
  getProductById(id: any) {
    return this.http.get(this.urlProduit + "findproductById/" + id);
  }
  getQuantityByProduit(referenceId: any, storeId: any) {
    return this.http.get(this.urlProduit + "QuantityByProd/" + referenceId + "/" + storeId);
  }

  findProductByReferenceIdAndStoreId(referenceId : any, storeId: any){
    return this.http.get(this.urlProduit + "findProdbyRefId/" + referenceId + "/" + storeId);
  }
  getProduitByRefId(referenceId : any, storeId: any){
    return this.http.get(this.urlProduit + "prodDtoByRefId/" + referenceId + "/" + storeId);
  }

  nombreProduits(){
    return this.http.get(this.urlProduit + "nbreProduits");
  }
}
