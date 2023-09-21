import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  products: ProductResponseModel[] = [];
  apiURL = environment.serverURL;

  constructor(private http: HttpClient) {
  }

  // Récupère une commande unique en fonction de son ID
  getSingleOrder(id: Number) {
    return this.http.get<ProductResponseModel[]>(`${this.apiURL}orders/${id}`);
  }

  // Récupère les commandes d'un utilisateur en fonction de son ID
  getUserOrder(id: Number) {
    return this.http.get<ProductResponseModel[]>(`${this.apiURL}orders/${id}`);
  }

  
}

interface ProductResponseModel {
  id: number;
  title: String;
  price: number;
}
