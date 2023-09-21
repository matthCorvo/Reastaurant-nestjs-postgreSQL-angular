// Interface représentant un modèle de produit côté serveur
export interface ProductModelServer {
  id: number; // Identifiant unique du produit
  title: String; // Titre du produit
  price: number; // Prix du produit
  numInCart?: number; // Propriété optionnelle pour suivre la quantité dans le panier

}

// Interface représentant une réponse serveur contenant une liste de produits
export interface serverResponse  {
    products: ProductModelServer[] // Tableau de produits
};

