import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ReviewService } from './review.service';

describe('ReviewService', () => {
  let service: ReviewService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReviewService],
    });

    service = TestBed.inject(ReviewService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería obtener listado de reviews con filtros y paginación (ajustado a implementación)', () => {
    const mockResponse = {
      content: [],
      totalElements: 0,
      totalPages: 1,
      size: 20,
      number: 0,
      last: true,
      first: true,
      empty: true,
      numberOfElements: 0,
      pageable: {
        sort: { empty: true, sorted: false, unsorted: true },
        offset: 0,
        pageNumber: 0,
        pageSize: 20,
        paged: true,
        unpaged: false,
      },
      sort: { empty: true, sorted: false, unsorted: true },
    };

    const filtros = {
      usuarioId: 1,
      rating: '5',
      fechaDesde: '2024-01-01',
      fechaHasta: '2024-01-31',
    };

    service.getListadoReviews(1, filtros).subscribe((resp) => {
      expect(resp).toEqual(mockResponse);
    });

    const req = httpMock.expectOne((request) => request.url.includes('http://18.222.169.167:8080/api/reviews'));

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe('0');
    expect(req.request.params.get('size')).toBe('20');
    expect(req.request.params.get('sort')).toBe('creado,desc');
    expect(req.request.params.get('usuarioId')).toBe('1');
    expect(req.request.params.get('rating')).toBe('5');
    expect(req.request.params.get('fechaDesde')).toBe('2024-01-01');
    expect(req.request.params.get('fechaHasta')).toBe('2024-01-31');

    req.flush(mockResponse);
  });
});
