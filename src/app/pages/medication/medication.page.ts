import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.page.html',
  styleUrls: ['./medication.page.scss'],
})
export class MedicationPage implements OnInit {
  medicationForms: FormGroup[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.addNewForm();
  }

  ngOnInit() {}

  addNewForm() {
    const newForm = this.formBuilder.group({
      medicationName: ['', Validators.required],
      quantity: ['', Validators.required],
      time: ['', Validators.required],
      days: ['', Validators.required]
    });
    this.medicationForms.push(newForm);
  }

  onSave(index: number) {
    console.log('Guardar formulario en la posición', index);
  } 

  saveAll() {
    console.log('Guardar todos los formularios');
    const medicationsData = this.medicationForms.map(form => form.value);
    const navigationExtras: NavigationExtras = {
      state: {
        medications: medicationsData
      }
    };
    this.router.navigate(['/medication-details'], navigationExtras);
  }
}






