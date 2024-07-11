// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AlertController } from '@ionic/angular';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.page.html',
//   styleUrls: ['./register.page.scss'],
// })
// export class RegisterPage implements OnInit {
//   registerForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private alertController: AlertController,
//     private authService: AuthService
//   ) {
//     this.registerForm = this.fb.group({
//       username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
//       password: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
//       confirmPassword: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]]
//     });
//   }

//   ngOnInit() {}

//   async presentAlert() {
//     const alert = await this.alertController.create({
//       header: 'Registro Exitoso',
//       subHeader: 'Su cuenta ha sido creada',
//       message: 'Ahora puede iniciar sesión.',
//       buttons: [{
//         text: 'OK',
//         handler: () => {
//           this.router.navigate(['/login']);
//         }
//       }]
//     });

//     await alert.present();
//   }

//   onRegister() {
//     console.log('Register form submitted');
//     if (this.registerForm.valid) {
//       const username = this.registerForm.get('username')?.value;
//       const password = this.registerForm.get('password')?.value;
//       const confirmPassword = this.registerForm.get('confirmPassword')?.value;
//       const email = this.registerForm.get('email')?.value;

//       if (password === confirmPassword) {
//         console.log('Registration successful');
//         this.authService.register(username, email, password);
//         this.presentAlert();
//       } else {
//         console.log('Passwords do not match');
//         this.presentPasswordMismatchAlert();
//       }
//     }
//   }

//   async presentPasswordMismatchAlert() {
//     const alert = await this.alertController.create({
//       header: 'Error',
//       subHeader: 'Contraseñas no coinciden',
//       message: 'Por favor, asegúrese de que las contraseñas coincidan.',
//       buttons: ['OK']
//     });

//     await alert.present();
//   }
// }


// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AlertController } from '@ionic/angular';
// import { DatabaseService } from '../../services/database.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.page.html',
//   styleUrls: ['./register.page.scss'],
// })
// export class RegisterPage {
//   registerForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private alertController: AlertController,
//     private dbService: DatabaseService
//   ) {
//     this.registerForm = this.fb.group({
//       username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
//       password: ['', [Validators.required, Validators.minLength(4)]],
//       confirmPassword: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//     });
//   }

//   async presentAlert() {
//     const alert = await this.alertController.create({
//       header: 'Registro Exitoso',
//       subHeader: 'Su cuenta ha sido creada',
//       message: 'Ahora puede iniciar sesión.',
//       buttons: [{
//         text: 'OK',
//         handler: () => {
//           this.router.navigate(['/login']);
//         }
//       }]
//     });

//     await alert.present();
//   }

//   async onRegister() {
//     if (this.registerForm.valid) {
//       const username = this.registerForm.get('username')?.value;
//       const password = this.registerForm.get('password')?.value;
//       const confirmPassword = this.registerForm.get('confirmPassword')?.value;
//       const email = this.registerForm.get('email')?.value;

//       if (password === confirmPassword) {
//         const added = await this.dbService.addUser(username, email, password);
//         if (added) {
//           console.log('Registration successful');
//           this.presentAlert();
//         } else {
//           console.log('Error registering user');
//         }
//       } else {
//         console.log('Passwords do not match');
//         this.presentPasswordMismatchAlert();
//       }
//     }
//   }

//   async presentPasswordMismatchAlert() {
//     const alert = await this.alertController.create({
//       header: 'Error',
//       subHeader: 'Contraseñas no coinciden',
//       message: 'Por favor, asegúrese de que las contraseñas coincidan.',
//       buttons: ['OK']
//     });

//     await alert.present();
//   }
// }


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
    private dbService: DatabaseService // Asegúrate de inyectar DatabaseService aquí
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
      password: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Registro Exitoso',
      subHeader: 'Su cuenta ha sido creada',
      message: 'Ahora puede iniciar sesión.',
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
    console.log('Register form submitted');
    if (this.registerForm.valid) {
      const username = this.registerForm.get('username')?.value;
      const password = this.registerForm.get('password')?.value;
      const confirmPassword = this.registerForm.get('confirmPassword')?.value;
      const email = this.registerForm.get('email')?.value;

      if (password === confirmPassword) {
        console.log('Registration successful');
        const success = await this.dbService.addUser(username, email, password);
        if (success) {
          await this.presentAlert();
        } else {
          console.error('User registration failed');
          // Manejar el fallo de registro según sea necesario
        }
      } else {
        console.log('Passwords do not match');
        // Manejar contraseña incorrecta
      }
    } else {
      console.log('Form is invalid');
      // Manejar formulario no válido
    }
  }
}
