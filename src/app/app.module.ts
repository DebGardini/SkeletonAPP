// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { RouteReuseStrategy } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http'; 

// import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import { AppRoutingModule } from './app-routing.module';

// import { ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatInputModule } from '@angular/material/input';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';

// import { AppComponent } from './app.component';
// import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
// import { IonicStorageModule } from '@ionic/storage-angular';

// @NgModule({
//   declarations: [AppComponent],
//   imports: [
//     BrowserModule,
//     ReactiveFormsModule,
//     BrowserAnimationsModule,
//     MatInputModule,
//     MatDatepickerModule,
//     MatNativeDateModule,
//     MatFormFieldModule,
//     MatIconModule,
//     IonicModule.forRoot(),
//     IonicStorageModule.forRoot(),
//     AppRoutingModule,
//     HttpClientModule 
//   ],
//   providers: [
//     { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
//     SQLite
//   ],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatIconModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule 
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
