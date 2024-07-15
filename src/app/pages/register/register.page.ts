import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private dbService: DatabaseService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
      password: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {}

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/login']);
        }
      }]
    });

    await alert.present();
  }

  async onRegister() {
    if (this.registerForm.valid) {
      const username = this.registerForm.get('username')?.value;
      const password = this.registerForm.get('password')?.value;
      const confirmPassword = this.registerForm.get('confirmPassword')?.value;
      const email = this.registerForm.get('email')?.value;

      if (password === confirmPassword) {
        try {
          const success = await this.authService.register(username, email, password);
          if (success) {
            await this.presentAlert('Registro Exitoso', 'Su cuenta ha sido creada. Ahora puede iniciar sesión.');
          } else {
            console.error('User registration failed');
            await this.presentAlert('Error', 'No se pudo completar el registro. Por favor, inténtelo de nuevo más tarde.');
          }
        } catch (error) {
          console.error('Error during registration', error);
          await this.presentAlert('Error', 'No se pudo completar el registro. Por favor, inténtelo de nuevo más tarde.');
        }
      } else {
        console.log('Passwords do not match');
        await this.presentAlert('Error', 'Las contraseñas no coinciden.');
      }
    } else {
      console.log('Form is invalid');
      await this.presentAlert('Error', 'El formulario es inválido. Por favor, revise los campos.');
    }
  }
}
