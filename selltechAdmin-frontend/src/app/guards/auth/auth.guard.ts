import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('token');
  
  const router = inject(Router);

  if(token){
    try {
      const response = await firstValueFrom(authService.verifyToken(token));
      if(response){
        console.log('Token valido');
        return true;
      }
      else{
        console.log('Token invalido');
        router.navigate(['/login']);
        return false;
      }
    } catch (error) {
      return router.navigate(['/login']);
    }
  }
  //
  else{
    return router.navigate(['/login']);
  }

};
