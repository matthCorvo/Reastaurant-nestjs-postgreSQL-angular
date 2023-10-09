import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Formulaire de connexion
  loginForm!:FormGroup;
  // Indicateur pour savoir si le formulaire a été soumis
  isSubmitted = false;
  // URL de retour après la connexion
  returnUrl = '';

  constructor(private formBuilder: FormBuilder,
     private activatedRoute:ActivatedRoute,
     private userService:UserService,
     private router:Router) { }
 
  ngOnInit(): void {
    // Initialisation du formulaire avec des champs pour l'email et le mot de passe
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required,Validators.email]],
      password:['', Validators.required]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  // Accès rapide aux contrôles du formulaire
  get fc(){
    return this.loginForm.controls;
  }

  // Fonction appelée lors de la soumission du formulaire
  submit(){
    this.isSubmitted = true;
    
    // Vérification de la validité du formulaire
    if(this.loginForm.invalid) return;
    
    // Appel au service de connexion avec les données du formulaire
    this.userService.login({email:this.fc.email.value,
      password: this.fc.password.value}).subscribe(() => {
        // Redirection vers l'URL de retour après la connexion
        this.router.navigateByUrl(this.returnUrl);
      });
  }

}