import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRegistroPagoComponent } from './crear-registro-pago.component';

describe('CrearRegistroPagoComponent', () => {
  let component: CrearRegistroPagoComponent;
  let fixture: ComponentFixture<CrearRegistroPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearRegistroPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearRegistroPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
