import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería obtener listado de usuarios con filtros y paginación', () => {
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
      name: 'Juan',
      dni: '84073303',
      active: 'true',
    };

    service.getListadoUsers(1, filtros).subscribe((resp) => {
      expect(resp).toEqual(mockResponse);
    });

    const req = httpMock.expectOne((request) => request.url.includes('/api/usuario'));
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe('0');
    expect(req.request.params.get('size')).toBe('20');
    expect(req.request.params.get('sort')).toBe('creado,desc');
    expect(req.request.params.get('name')).toBe('Juan');
    expect(req.request.params.get('dni')).toBe('84073303');
    expect(req.request.params.get('active')).toBe('true');

    req.flush(mockResponse);
  });
});
