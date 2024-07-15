// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { DatabaseService } from './database.service';
// import { AlertController } from '@ionic/angular';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   constructor(
//     private router: Router,
//     private databaseService: DatabaseService,
//     private alertController: AlertController
//   ) {}

//   async register(username: string, email: string, password: string) {
//     try {
//       await this.databaseService.addUser(username, email, password);
//       this.router.navigate(['/login']);
//     } catch (error) {
//       this.showAlert('Error', 'Error registering user');
//     }
//   }

//   async login(username: string, password: string) {
//     try {
//       const user = await this.databaseService.getUser(username);
//       if (user && user.password === password) {
//         localStorage.setItem('token', 'your_jwt_token'); 
//         this.router.navigate(['/home']);
//       } else {
//         this.showAlert('Error', 'Invalid credentials');
//       }
//     } catch (error) {
//       this.showAlert('Error', 'Error logging in');
//     }
//   }

//   logout() {
//     localStorage.removeItem('token');
//     this.router.navigate(['/login']);
//   }

//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('token');
//   }

//   private async showAlert(header: string, message: string) {
//     const alert = await this.alertController.create({
//       header,
//       message,
//       buttons: ['OK']
//     });

//     await alert.present();
//   }
// }

import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;  

  constructor(private db: DatabaseService) {}

  async register(username: string, email: string, password: string): Promise<boolean> {
    const success = await this.db.addUser(username, email, password);
    return success;
  }

  async login(username: string, password: string): Promise<any> {
    const user = await this.db.getUser(username);
    if (user && user.password === password) {
      this.loggedIn = true; 
      return user;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
