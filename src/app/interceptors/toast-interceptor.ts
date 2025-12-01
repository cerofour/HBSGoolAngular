import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastService } from '../services/toast/toast.service';

const SILENT_ENDPOINTS = [
  '/auth', '/api/reviews', '/api/cierre_cajero', '/api/sesion_cajero'
];

export const toastInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  const isSilent = SILENT_ENDPOINTS.some(endpoint => req.url.includes(endpoint));
  
  const skipToast = req.headers.has('X-Skip-Toast');

  return next(req).pipe(
    tap(event => {

      if (!isSilent && !skipToast && event.type === 4) { // 4 = HttpEventType.Response
        const response = event as any;
        
        const isModifyingRequest = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method);
        
        if (isModifyingRequest && response.status >= 200 && response.status < 300) {
          let title = '¡Operación exitosa!';
          let message = 'La acción se completó correctamente.';

          switch (req.method) {
            case 'POST':
              title = '¡Creado exitosamente!';
              message = 'El registro se creó correctamente.';
              break;
            case 'PUT':
            case 'PATCH':
              title = '¡Actualizado exitosamente!';
              message = 'Los cambios se guardaron correctamente.';
              break;
            case 'DELETE':
              title = '¡Eliminado exitosamente!';
              message = 'El registro se eliminó correctamente.';
              break;
          }

          // Mensaje personalizado por el backend
          if (response.body && response.body.message) {
            message = response.body.message;
          }

          toastService.success(title, message);
        }
      }
    }),
    catchError((error: HttpErrorResponse) => {
      if (!isSilent && !skipToast) {
        let title = 'Error';
        let message = 'Ocurrió un error inesperado. Por favor, intenta de nuevo.';

        switch (error.status) {
          case 0:
            title = 'Sin conexión';
            message = 'No se pudo conectar al servidor. Verifica tu conexión a internet.';
            break;
          case 400:
            title = 'Datos inválidos';
            message = error.error?.message || 'Los datos proporcionados no son válidos.';
            break;
          case 401:
            title = 'No autorizado';
            message = 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.';
            break;
          case 403:
            title = 'Acceso denegado';
            message = 'No tienes permisos para realizar esta acción.';
            break;
          case 404:
            title = 'No encontrado';
            message = 'El recurso solicitado no fue encontrado.';
            break;
          case 409:
            title = 'Conflicto';
            message = error.error?.message || 'Ya existe un registro con estos datos.';
            break;
          case 422:
            title = 'Datos inválidos';
            message = error.error?.message || 'Los datos proporcionados no cumplen con los requisitos.';
            break;
          case 500:
            title = 'Error del servidor';
            message = 'Ocurrió un error en el servidor. Por favor, intenta más tarde.';
            break;
          case 503:
            title = 'Servicio no disponible';
            message = 'El servicio está temporalmente no disponible. Intenta más tarde.';
            break;
          default:
            // En caso de que el backend envie un mensaje de error
            if (error.error?.message) {
              message = error.error.message;
            }
        }

        toastService.error(title, message);
      }

      return throwError(() => error);
    })
  );
};