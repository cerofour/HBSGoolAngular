import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, signal, ViewChild } from '@angular/core';
import {
  ScheduleModule,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  EventSettingsModel,
  PopupOpenEventArgs,
  RenderCellEventArgs,
  ActionEventArgs,
  ScheduleComponent
} from '@syncfusion/ej2-angular-schedule';
import { Page, Reservation, ReservationFormCashier, ReservationFormUser, ReservationService } from '../../services/reservation/reservation.service';
import { modalType, ReservationModal } from '../modals/reservation-modal/reservation-modal';
import { calculateEndTime } from '../../utils/general-utils';
import { CanchaInfo, CanchaService } from '../../services/cancha/cancha.service';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule, ScheduleModule, ReservationModal],
  providers: [ScheduleModule,
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar {
  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;
  @Input() startHour: string = '08:00';
  @Input() endHour: string = '22:00';
  @Input() readonly: boolean = false;
  @Input() allowAdding: boolean = true;
  @Input() allowEditing: boolean = true;
  @Input() allowDeleting: boolean = true;
  @Input() allowPastDates: boolean = true;
  @Input() modalType: modalType = 'user';
  @Input() modalTitle: string = 'Nueva Reservación';
  @Input() initialModalData?: Partial<ReservationFormUser | ReservationFormCashier>;
  @Input({ required: true }) canchaId!: number;
  @Output() reservationConfirmed = new EventEmitter<any>();

  private reservation = inject(ReservationService);
  private canchaService = inject(CanchaService);

  public showModal = signal(false);
  public selectedDate: Date = new Date();
  public eventData: Object[] = [];
  public eventSettings: EventSettingsModel = {
    dataSource: this.eventData,
    allowAdding: this.allowAdding,
    allowDeleting: this.allowDeleting,
    allowEditing: this.allowEditing,
  };

  canchaInfo: CanchaInfo | null = null;
  startTime: string = '';
  availableHours: string[] = [];


  ngOnInit() {
    this.canchaService.getCanchaById(this.canchaId).subscribe({
      next: (data) => this.canchaInfo = data,
      error: () => {}
    })
    this.loadEvents();
  }

  loadEvents() {
    this.reservation.getListReservationCashier({canchaId: this.canchaId, size: 100}).subscribe({
      next: (data: Page<Reservation>) => {
        this.eventData = data.content.map((event: Reservation, index: number) => ({
          Id: event.idReservacion ?? index + 1,
          Subject: `Cancha ${event.canchaId}`,
          StartTime: new Date(event.tiempoInicio),
          EndTime: this.calculateEndTime(event.tiempoInicio, event.duracion),
          IsAllDay: false,
          Description: `Reserva de ${event.dni}`,
        }));

        this.eventSettings = {
          ...this.eventSettings,
          dataSource: this.eventData,
        };
      },
      error: (err) => {
        console.error('Error al obtener reservas:', err);
      }
    });
  }

  onNavigating(event: any) {
    if (!this.allowPastDates) {
      const now = new Date();
      now.setHours(0, 0, 0, 0);

      const targetDate = new Date(event.currentDate);
      targetDate.setHours(0, 0, 0, 0);

      if (targetDate < now) {
        event.cancel = true;
        return;
      }
    }

    if (event.action === 'date' || event.action === 'view') {
      this.selectedDate = event.currentDate;
      this.loadEvents();
    }
  }

  onScheduleCreated() {
    this.loadEvents();
  }


  onRenderCell(args: RenderCellEventArgs): void {
    if (!this.allowPastDates && this.isPastDateTime(args.date!)) {
      args.element.classList.add('e-past-date');
      (args.element as HTMLElement).style.pointerEvents = 'none';
      (args.element as HTMLElement).style.opacity = '0.5';
      (args.element as HTMLElement).style.backgroundColor = '#f5f5f5';
      (args.element as HTMLElement).style.cursor = 'not-allowed';
    }
  }

  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'QuickInfo' || args.type === 'Editor') {
      const eventData = args.data as any;
      args.cancel = true;

      if(this.canchaInfo === null || this.canchaInfo === undefined) return;

      if (eventData && eventData.Id) return;

      const startTime = new Date(eventData.StartTime);

      const startHourNum = parseInt(this.startHour.split(':')[0]);
      const startMinNum = parseInt(this.startHour.split(':')[1]);

      if (startTime.getHours() < startHourNum ||
        (startTime.getHours() === startHourNum && startTime.getMinutes() < startMinNum)) {
        return;
      }

      if (this.isTimeSlotOccupied(startTime)) return;

      this.availableHours = this.getAvailableEndTimes(startTime);

      if (this.availableHours.length === 0) return;

      this.startTime = this.toLocalISOString(startTime);

      this.showModal.set(true);
    }
  }

  onActionBegin(args: ActionEventArgs): void {
    if (!this.allowPastDates && args.requestType === 'eventCreate') {
      const eventData = (args.data as any[])[0];
      const startTime = new Date(eventData.StartTime);

      if (this.isPastDateTime(startTime)) args.cancel = true;
    }
  }

  handleClose(result?: any): void {
    this.showModal.set(false);
    if (result) this.reservationConfirmed.emit(result);
  }

  onClose() {
    this.showModal.set(false);
  }

  private isTimeSlotOccupied(time: Date): boolean {
    if (!this.scheduleObj) return false;

    const events = this.scheduleObj.getCurrentViewEvents();

    for (const ev of events) {
      const start = new Date((ev as any).StartTime);
      const end = new Date((ev as any).EndTime);
      if (time >= start && time < end) {
        return true;
      }
    }

    return false;
  }

  private getAvailableEndTimes(startTime: Date): string[] {
    const endHour: number = Number(this.endHour.split(":")[0]);

    const sameDayEvents = (this.eventData as any[])
      .filter(e => {
        const d = new Date(e.StartTime);
        return d.toDateString() === startTime.toDateString();
      })
      .sort((a, b) => new Date(a.StartTime).getTime() - new Date(b.StartTime).getTime());

    let nextEventStart: Date | null = null;
    for (const ev of sameDayEvents) {
      const evStart = new Date(ev.StartTime);
      if (evStart > startTime) {
        nextEventStart = evStart;
        break;
      }
    }

    const limit = nextEventStart ?? new Date(startTime);
    if (nextEventStart) {
      limit.setHours(nextEventStart.getHours());
      limit.setMinutes(nextEventStart.getMinutes());
    } else {
      limit.setHours(endHour, 0, 0, 0);
    }

    const available: string[] = [];
    const temp = new Date(startTime);

    while (temp < limit) {
      const next = new Date(temp);
      next.setHours(temp.getHours() + 1);
      if (next <= limit) {
        available.push(this.formatTime(next));
      }
      temp.setHours(temp.getHours() + 1);
    }

    return available;
  }

  private formatTime(date: Date): string {
    const d = new Date(date);
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  private isPastDateTime(date: Date): boolean {
    const now = new Date();
    return date < now;
  }

  public toLocalISOString = (d = new Date()) =>
  new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, -1);


  calculateEndTime = calculateEndTime;

}
