// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.page.html',
//   styleUrls: ['./login.page.scss'],
// })
// export class LoginPage implements OnInit {
//   loginForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private authService: AuthService
//   ) {
//     this.loginForm = this.fb.group({
//       username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
//       password: ['', [Validators.required, Validators.minLength(4)]],
//     });
//   }

//   ngOnInit() {}

//   onLogin() {
//     if (this.loginForm.valid) {
//       const username = this.loginForm.get('username')?.value;
//       const password = this.loginForm.get('password')?.value;
//       this.authService.login(username, password);
//     }
//   }

//   navigateToRegister() {
//     this.router.navigate(['/register']);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit() {}

  async onLogin() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      const success = await this.authService.login(username, password);
      if (success) {
        this.router.navigate(['/home']);
      } else {
        console.log('Login failed');
      }
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
