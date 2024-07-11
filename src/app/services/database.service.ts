// import { Injectable } from '@angular/core';
// import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

// @Injectable({
//   providedIn: 'root'
// })
// export class DatabaseService {
//   private dbInstance: SQLiteObject | null = null; // Inicializar como null
//   private isDbReady: boolean = false;

//   constructor(private sqlite: SQLite) { }

//   public async init() {
//     try {
//       this.dbInstance = await this.sqlite.create({
//         name: 'data.db',
//         location: 'default'
//       });

//       await this.dbInstance.executeSql(`
//         CREATE TABLE IF NOT EXISTS users (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           username TEXT UNIQUE,
//           email TEXT UNIQUE,
//           password TEXT
//         );
//       `, []);

//       this.isDbReady = true;
//       console.log('Database initialized');
//     } catch (error) {
//       console.error('Error initializing database', error);
//     }
//   }

//   private async ensureDbReady() {
//     if (!this.isDbReady) {
//       await this.init();
//     }
//   }

//   public async addUser(username: string, email: string, password: string) {
//     await this.ensureDbReady();
//     try {
//       if (this.dbInstance) {
//         await this.dbInstance.executeSql(`
//           INSERT INTO users (username, email, password) VALUES (?, ?, ?);
//         `, [username, email, password]);
//         console.log('User added');
//       }
//     } catch (error) {
//       console.error('Error adding user', error);
//     }
//   }

//   public async getUser(username: string) {
//     await this.ensureDbReady();
//     try {
//       if (this.dbInstance) {
//         const res = await this.dbInstance.executeSql(`
//           SELECT * FROM users WHERE username = ?;
//         `, [username]);

//         if (res.rows.length > 0) {
//           return res.rows.item(0);
//         }
//       }
//       return null;
//     } catch (error) {
//       console.error('Error getting user', error);
//       return null;
//     }
//   }
// }

import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private dbInstance: SQLiteObject | null = null;
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite) {
    this.initializeDatabase(); 
  }

  public async initializeDatabase() {
    try {
      this.dbInstance = await this.sqlite.create({
        name: 'data.db',
        location: 'default'
      });

      await this.createTables(); 

      this.isDbReady.next(true);
      console.log('Database initialized');
    } catch (error) {
      console.error('Error initializing database', error);
    }
  }

  private async createTables() {
    try {
      await this.dbInstance?.executeSql(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE,
          email TEXT UNIQUE,
          password TEXT
        );
      `, []);
      console.log('Tables created');
    } catch (error) {
      console.error('Error creating tables', error);
    }
  }

  public async addUser(username: string, email: string, password: string): Promise<boolean> {
    await this.waitForDatabaseReady();
    try {
      if (this.dbInstance) {
        await this.dbInstance.executeSql(`
          INSERT INTO users (username, email, password) VALUES (?, ?, ?);
        `, [username, email, password]);
        console.log('User added');
        return true;
      } else {
        console.error('Database instance is null');
        return false;
      }
    } catch (error) {
      console.error('Error adding user', error);
      return false;
    }
  }

  public async getUser(username: string): Promise<any> {
    await this.waitForDatabaseReady();
    try {
      if (this.dbInstance) {
        const res = await this.dbInstance.executeSql(`
          SELECT * FROM users WHERE username = ?;
        `, [username]);

        if (res && res.rows.length > 0) {
          return res.rows.item(0);
        }
      }
      return null;
    } catch (error) {
      console.error('Error getting user', error);
      return null;
    }
  }

  private async waitForDatabaseReady() {
    return new Promise<void>((resolve) => {
      if (this.isDbReady.getValue()) {
        resolve();
      } else {
        const subscription = this.isDbReady.subscribe((ready) => {
          if (ready) {
            subscription.unsubscribe();
            resolve();
          }
        });
      }
    });
  }
}

