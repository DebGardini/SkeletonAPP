import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, style, transition, animate } from '@angular/animations';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('1s', style({ transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class HomePage implements OnInit {
  homeForm: FormGroup;
  username: string = '';
  password: string = '';
  animateInputs: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private alertController: AlertController) {
    this.homeForm = this.fb.group({
      name: ['', Validators.required], 
      surname: ['', Validators.required], 
      educationLevel: ['', Validators.required], 
      birthDate: ['', Validators.required] 
    });
  }
  
  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.username = navigation.extras.state['username'];
      this.password = navigation.extras.state['password'];
    }
  }

  clearForm() {
    this.animateInputs = true;
    setTimeout(() => {
      this.animateInputs = false;
      this.homeForm.reset();
    }, 1000);
  }

  async presentAlert() {
    if (this.homeForm.valid) {
      const name = this.homeForm.get('name')?.value;
      const surname = this.homeForm.get('surname')?.value;
      const educationLevel = this.homeForm.get('educationLevel')?.value;
      const birthDate = this.homeForm.get('birthDate')?.value;

      const alert = await this.alertController.create({
        header: 'Tú información',
        message: `Nombre: ${name} ${surname}\nNivel de Educación: ${educationLevel}\nFecha de Nacimiento: ${birthDate}`,
        buttons: [
          {
            text: 'Continuar',
            handler: () => {
              this.router.navigate(['/medication']);
            }
          }
        ]
      });

      await alert.present();
    }
  }

  showInfo() {
    this.presentAlert();
  }
}
