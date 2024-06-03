import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  homeForm!: FormGroup;
  username: string = '';

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private alertController: AlertController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.username = params['username'] || '';
    });

    this.homeForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      nivelEducacion: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
    });
  }

  limpiar() {
    this.homeForm.reset();
    this.animateInputs();
  }

  mostrar() {
    const nombre = this.homeForm.get('nombre')?.value;
    const apellido = this.homeForm.get('apellido')?.value;
    
    this.alertController.create({
      header: 'Información',
      message: `Nombre: ${nombre} <br> Apellido: ${apellido}`,
      buttons: ['OK']
    }).then(alert => alert.present());
  }

  animateInputs() {
    const inputs = document.querySelectorAll('ion-input');
    inputs.forEach(input => {
      input.animate(
        [{ transform: 'translateX(-100%)'}, { transform: 'translateX(0)' }],
        { duration: 1000, iterations: 1 }
      );
    });
  }
}