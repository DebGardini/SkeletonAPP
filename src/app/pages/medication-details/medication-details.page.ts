import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-medication-details',
  templateUrl: './medication-details.page.html',
  styleUrls: ['./medication-details.page.scss'],
})
export class MedicationDetailsPage implements OnInit {
  medications: any[] = [];

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.medications = navigation.extras.state['medications'] || [];
    }
  }

  ngOnInit() {}

  async onDelete(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas eliminar este medicamento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.medications.splice(index, 1);
            console.log('Medicamento eliminado:', index);
          }
        }
      ]
    });

    await alert.present();
  }
}




