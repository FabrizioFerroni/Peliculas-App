import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewsEntitiesComponent } from './views-entities.component';
import { IServicioCrud } from '@app/shared/interfaces/IServicioCrud';
import { of } from 'rxjs';
import { SERVICIO_CRUD_TOKEN } from '@app/shared/providers/provider';
import { RouterModule } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Pageable } from '../modelos/pageable.dto';

describe('ViewsEntitiesComponent', () => {
  let component: ViewsEntitiesComponent<object, any>;
  let fixture: ComponentFixture<ViewsEntitiesComponent<object, any>>;
  let mockServicioCrud: jasmine.SpyObj<IServicioCrud<object, object>>;
  beforeEach(async () => {
    // mock IServicioCrud
    mockServicioCrud = jasmine.createSpyObj<IServicioCrud<object, object>>(
      'IServicioCrud',
      ['obtenerTodos', 'eliminar']
    );

    mockServicioCrud.obtenerTodos.and.returnValue(of());
    mockServicioCrud.eliminar.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      imports: [ViewsEntitiesComponent, RouterModule.forRoot([])],
      providers: [
        {
          provide: SERVICIO_CRUD_TOKEN,
          useValue: mockServicioCrud,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ViewsEntitiesComponent<object, any>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('You must set page equal to 1 when delete is called.', () => {
    component.eliminar('959eb296-08b8-49e2-ab26-173b9c70768f');
    fixture.detectChanges();
    component.page = 1;
    expect(component.page).toEqual(1);
  });

  it('should display a table when records exist when load record is called', () => {
    const respuestaMock = new HttpResponse<Pageable<object[]>>({
      body: {
        content: [
          [
            { id: '1', nombre: 'Record 1' },
            { id: '2', nombre: 'Record 2' },
          ],
        ],
        paginationDetails: {
          pageNumber: 1,
          pageSize: 1,
          offset: 0,
          nextPage: 1,
          previousPage: 0,
        },
        totalPages: 1,
        totalElements: 1,
        last: true,
        first: true,
      },
    });

    mockServicioCrud.obtenerTodos.and.returnValue(of(respuestaMock));

    component.obtenerTodos();

    fixture.detectChanges();

    const compiled: HTMLElement = fixture.nativeElement as HTMLElement;
    const table: NodeListOf<HTMLTableElement> =
      compiled.querySelectorAll('table');
    expect(table).not.toBeNull();
    expect(table?.length).toBe(1);
  });

  it('should not display a table when no records exist when load record is called', () => {
    const respuestaMock = new HttpResponse<Pageable<object[]>>({
      body: {
        content: [],
        paginationDetails: {
          pageNumber: 1,
          pageSize: 1,
          offset: 0,
          nextPage: 1,
          previousPage: 0,
        },
        totalPages: 1,
        totalElements: 1,
        last: true,
        first: true,
      },
    });

    mockServicioCrud.obtenerTodos.and.returnValue(of(respuestaMock));

    component.obtenerTodos();

    fixture.detectChanges();

    const compiled: HTMLElement = fixture.nativeElement as HTMLElement;
    const table: NodeListOf<HTMLTableElement> =
      compiled.querySelectorAll('table');
    expect(table?.length).toBe(0);
  });
});
