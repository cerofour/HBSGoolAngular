import { Component, computed, Input, signal } from '@angular/core';
import { ReservationFormCashier, ReservationFormUser } from '../../services/reservation/reservation.service';
import { calculateEndTime, getDate, getTime } from '../../utils/general-utils';

@Component({
  selector: 'app-reservation-summary',
  imports: [],
  templateUrl: './reservation-summary.html'
})
export class ReservationSummary {
  private _data = signal<(ReservationFormCashier | ReservationFormUser) & { totalPrice?: number } | null>(null);
  @Input() set data(value: (ReservationFormCashier | ReservationFormUser) & { totalPrice?: number } | null) {
    this._data.set(value);
  }
  @Input() imagen = 'cancha.png';


  get data(): (ReservationFormCashier | ReservationFormUser) & { totalPrice?: number } | null  {
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
