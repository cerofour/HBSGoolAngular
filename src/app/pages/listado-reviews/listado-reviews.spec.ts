import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListadoReviews } from './listado-reviews';
import { ReviewService } from '../../services/review/review.service';

describe('ListadoReviews', () => {
  let component: ListadoReviews;
  let fixture: ComponentFixture<ListadoReviews>;

  const mockPage = {
    content: [],
    totalElements: 0,
    totalPages: 1,
    size: 20,
    number: 0,
  };

  const mockReviewService = {
    getListadoReviews: jasmine.createSpy('getListadoReviews').and.returnValue(of(mockPage)),
  } as Partial<ReviewService> as ReviewService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoReviews],
      providers: [{ provide: ReviewService, useValue: mockReviewService }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListadoReviews);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call reviewService.getListadoReviews on init', () => {
    expect(mockReviewService.getListadoReviews).toHaveBeenCalled();
  });
});
