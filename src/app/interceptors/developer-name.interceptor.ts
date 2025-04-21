import { HttpInterceptorFn } from '@angular/common/http';

export const developerNameInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({
    setHeaders: {
      'Developer-Name': 'Rachel Bloy'
    }
  });

  return next(modifiedReq);
};
