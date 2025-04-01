import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MostrarErroresComponent } from './mostrar-errores.component';

describe('MostrarErroresComponent', () => {
  let component: MostrarErroresComponent;
  let fixture: ComponentFixture<MostrarErroresComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MostrarErroresComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(MostrarErroresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    /*const component = fixture.componentInstance;*/
    expect(component).toBeTruthy();
  });

  it('should display a list-item when there is an error', () => {
    component.errores = ['Error 1', 'Error 2'];
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.nativeElement as HTMLElement;
    const listItems: NodeListOf<HTMLElement> = compiled.querySelectorAll('li');
    expect(listItems.length).toBe(2);
  });
});
