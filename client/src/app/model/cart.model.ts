import {ProductModelServer} from "./product.model";

// Interface pour le modèle de panier côté serveur
export interface CartModelServer {
  total: number; // Le coût total du panier
  data: {
    product: ProductModelServer | undefined; // Le kebab contenu dans le panier
    numInCart: number; // Le nombre de ce kebab dans le panier
  }[];
}

// Interface pour le modèle de panier public 
export interface CartModelPublic {
  total: number; // Le coût total du panier
  prodData: [{
    id: number, // L'identifiant du produit
    incart: number // Le nombre de ce produit dans le panier
  }]
}
