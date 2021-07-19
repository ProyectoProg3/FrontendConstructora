import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRegistroPagoComponent } from './listar-registro-pago.component';

describe('ListarRegistroPagoComponent', () => {
  let component: ListarRegistroPagoComponent;
  let fixture: ComponentFixture<ListarRegistroPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarRegistroPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarRegistroPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
