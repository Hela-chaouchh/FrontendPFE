import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  categories: any;
  private urlCategorie = 'http://localhost:8080/api/categorie/';

  constructor(private http: HttpClient) { }

  getAllCategoryByStore(id: any) {
    return this.http.get(this.urlCategorie + "getCategoriesByStore/" + id);
  }

  getProduitsByCategories(categorie: any, storeId: any){
    return this.http.get(this.urlCategorie + "getProduitsByCategorie/" + categorie + "/" + storeId)
  }
}
