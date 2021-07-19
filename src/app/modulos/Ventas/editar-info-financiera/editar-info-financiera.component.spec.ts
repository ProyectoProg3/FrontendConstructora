import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInfoFinancieraComponent } from './editar-info-financiera.component';

describe('EditarInfoFinancieraComponent', () => {
  let component: EditarInfoFinancieraComponent;
  let fixture: ComponentFixture<EditarInfoFinancieraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarInfoFinancieraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarInfoFinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
