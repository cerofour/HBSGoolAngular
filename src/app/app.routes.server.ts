import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'reservar/:canchaId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'admin/cajero/resumen/:cajeroId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'admin/pago/:pagoId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'admin/ver-reservaciones/:reservacionId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'admin/cajero/transacciones/:sesionId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'admin/canchas/actualizar/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
