import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarRegistroPagoComponent } from './eliminar-registro-pago.component';

describe('EliminarRegistroPagoComponent', () => {
  let component: EliminarRegistroPagoComponent;
  let fixture: ComponentFixture<EliminarRegistroPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarRegistroPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarRegistroPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
