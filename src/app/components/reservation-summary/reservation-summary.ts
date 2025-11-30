import { Component, computed, Input, signal } from '@angular/core';
import { calculateEndTime, getDate, getTime } from '../../utils/general-utils';
import { ReservationForm } from '../../schemas/reservation';

@Component({
  selector: 'app-reservation-summary',
  imports: [],
  templateUrl: './reservation-summary.html'
})
export class ReservationSummary {
  private _data = signal<(ReservationForm) & { totalPrice?: number } | null>(null);
  @Input() set data(value: (ReservationForm) & { totalPrice?: number } | null) {
    this._data.set(value);
  }
  @Input() imagen = 'cancha.png';


  get data(): (ReservationForm) & { totalPrice?: number } | null  {
    return this._data();
  }

  date = computed(() => {
    const d = this._data();
    return d ? getDate(d.tiempoInicio) : null;
  });

  startTime = computed(() => {
    const d = this._data();
    return d ? getTime(d.tiempoInicio) : null;
  });
  
  endHour = computed(() => {
    const d = this._data();
    return d ? getTime(calculateEndTime(d.tiempoInicio, d.duracion).toISOString()) : null;
  });


}
