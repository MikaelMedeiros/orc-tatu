import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
  const router: Router = inject(Router)  
  const codeLogin: string = route.queryParams['code'];
  const objetoString = localStorage.getItem('user');    

  if (codeLogin) {           
    return true;
  } else if (objetoString && objetoString !== null && objetoString !== '{}') {    
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};


