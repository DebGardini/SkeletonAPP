import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: {
            isLoggedIn: jasmine.createSpy('isLoggedIn').and.returnValue(true)
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should return true for a logged-in user', () => {
    const route = new ActivatedRouteSnapshot();
    const state = {} as RouterStateSnapshot;
    (authService.isLoggedIn as jasmine.Spy).and.returnValue(true);
    expect(authGuard.canActivate(route, state)).toBe(true);
  });

  it('should navigate to login for a logged-out user', () => {
    const route = new ActivatedRouteSnapshot();
    const state = {} as RouterStateSnapshot;
    (authService.isLoggedIn as jasmine.Spy).and.returnValue(false);
    expect(authGuard.canActivate(route, state)).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
