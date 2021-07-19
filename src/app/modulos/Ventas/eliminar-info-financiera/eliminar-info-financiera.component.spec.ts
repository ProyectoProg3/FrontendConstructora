import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarInfoFinancieraComponent } from './eliminar-info-financiera.component';

describe('EliminarInfoFinancieraComponent', () => {
  let component: EliminarInfoFinancieraComponent;
  let fixture: ComponentFixture<EliminarInfoFinancieraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarInfoFinancieraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarInfoFinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
