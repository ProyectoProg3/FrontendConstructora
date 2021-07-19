import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRegistroPagoComponent } from './editar-registro-pago.component';

describe('EditarRegistroPagoComponent', () => {
  let component: EditarRegistroPagoComponent;
  let fixture: ComponentFixture<EditarRegistroPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarRegistroPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarRegistroPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
