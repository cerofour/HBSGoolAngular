import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListadoUsers } from './listado-users';
import { UserService } from '../../services/users/user.service';

describe('ListadoUsers', () => {
  let component: ListadoUsers;
  let fixture: ComponentFixture<ListadoUsers>;

  const mockPage = {
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

  const mockUserService = {
    getListadoUsers: jasmine.createSpy('getListadoUsers').and.returnValue(of(mockPage)),
  } as Partial<UserService> as UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoUsers],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoUsers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call userService.getListadoUsers on init', () => {
    expect(mockUserService.getListadoUsers).toHaveBeenCalled();
  });
});
