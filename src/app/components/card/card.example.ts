import { CanchaInfo } from './card';

/**
 * Datos de ejemplo para las canchas
 * Puedes usar este array para probar el componente CanchaCard
 */
export const CANCHAS_EJEMPLO: CanchaInfo[] = [
  {
    canchaId: 1,
    name: 'Cancha Principal',
    description: 'Cancha de fútbol 11 con césped sintético de última generación, iluminación LED y vestuarios completos.',
    hourlyPrice: 150,
    canchaState: 'D'
  },
  {
    canchaId: 2,
    name: 'Cancha Futsal',
    description: 'Cancha techada para fútbol sala, ideal para partidos rápidos y entrenamientos.',
    hourlyPrice: 100,
    canchaState: 'D'
  },
  {
    canchaId: 3,
    name: 'Cancha 7 vs 7',
    description: 'Cancha de tamaño mediano perfecta para equipos pequeños, con césped natural y sistema de riego automático.',
    hourlyPrice: 120,
    canchaState: 'M'
  },
];

