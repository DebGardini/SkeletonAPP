import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Pastillas } from 'src/app/models/pastilla.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user!: Pastillas[];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getPastillas().subscribe(
      (data: Pastillas[]) => {
        this.user = data;
      },
      (error) => {
        console.error('Error loading pastillas:', error);
      }
    );
  }
}


