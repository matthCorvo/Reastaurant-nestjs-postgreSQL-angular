
import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductModelServer } from '../model/product.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    apiURL =  environment.serverURL;
    ;

    constructor(private http: HttpClient) {}

    /**
     * Récupère tous les produits depuis l'API.
     * @returns Un observable contenant un modèle de produit serveur.
     */
    getAllProducts(): Observable<ProductModelServer> {
        return this.http.get<ProductModelServer>(this.apiURL + '/product')
    }

    /**
     * Récupère un produit unique en fonction de son ID depuis l'API.
     * @param id L'identifiant unique du produit.
     * @returns Un observable contenant un modèle de produit serveur.
     */
    getSingleProduct(id: Number): Observable<ProductModelServer> {
        return this.http.get<ProductModelServer>(this.apiURL + '/product/' + id);
      }
}