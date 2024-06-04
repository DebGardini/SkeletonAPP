import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicationPageRoutingModule } from './medication-routing.module';

import { MedicationPage } from './medication.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MedicationPageRoutingModule
  ],
  declarations: [MedicationPage]
})
export class MedicationPageModule {}
