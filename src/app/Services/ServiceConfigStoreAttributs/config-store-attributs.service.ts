import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigStoreAttributsService {

  private urlConfigStoreAttributs = 'http://localhost:8080/api/configstoreattributs/';
  
  constructor(private http: HttpClient) { }

  getKeysGet() {
    return this.http.get(this.urlConfigStoreAttributs + "configAttributsProduit");
  }
  getKeysPost() {
    return this.http.get(this.urlConfigStoreAttributs + "configAttributsCommande");
  }
  getKeyParamsApiPageable() {
    return this.http.get(this.urlConfigStoreAttributs + "configAttributsParamsApiPageable");
  }
  
  deleteAttribut(idAttribut:any){
    return this.http.delete(this.urlConfigStoreAttributs + "delete/" + idAttribut);
  }

}
