import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  ScheduleModule,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  EventSettingsModel
} from '@syncfusion/ej2-angular-schedule';
import { Page, Reservation, ReservationService } from '../../services/reservation/reservation.service';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule, ScheduleModule],
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
  @Input() startHour: string = '08:00';
  @Input() endHour: string = '22:00';
  @Input() readonly: boolean = false;
  @Input() allowAdding: boolean = true;
  @Input() allowEditing: boolean = true;
  @Input() allowDeleting: boolean = true;

  private reservation = inject(ReservationService);

  public selectedDate: Date = new Date();
  public eventData: Object[] = [];
  public eventSettings: EventSettingsModel = {
    dataSource: this.eventData,
    allowAdding: this.allowAdding,
    allowDeleting: this.allowDeleting,
    allowEditing: this.allowEditing
  };

  ngOnInit() {
    this.loadEvents();
  }


  loadEvents() {
    this.reservation.getListReservationCashier().subscribe({
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
    if (event.action === 'date' || event.action === 'view') {
      this.selectedDate = event.currentDate;
      this.loadEvents();
    }
  }

  onScheduleCreated() {
    this.loadEvents();
  }


  private calculateEndTime(start: string, duration: string): Date {
    const end = new Date(start);
    if (!duration) return end;

    const dur = duration.trim().toLowerCase();

    const regex = /(?:(\d+)\s*hours?)?\s*(?:(\d+)\s*minutes?)?/;
    const match = dur.match(regex);

    const hours = match && match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match && match[2] ? parseInt(match[2], 10) : 0;

    end.setHours(end.getHours() + hours);
    end.setMinutes(end.getMinutes() + minutes);

    return end;
  }
}
