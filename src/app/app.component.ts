// import { Component } from '@angular/core';
// import { Platform } from '@ionic/angular';
// import { DatabaseService } from './services/database.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: 'app.component.html',
//   styleUrls: ['app.component.scss'],
// })
// export class AppComponent {
//   constructor(
//     private platform: Platform,
//     private databaseService: DatabaseService
//   ) {
//     this.initializeApp();
//   }

//   async initializeApp() {
//     await this.platform.ready();
//     await this.databaseService.init();  
//   }
// }

import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private databaseService: DatabaseService) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.databaseService.initializeDatabase(); // Llama al método correcto
    
  }
}

