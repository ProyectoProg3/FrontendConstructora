import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInfoFinancieraComponent } from './listar-info-financiera.component';

describe('ListarInfoFinancieraComponent', () => {
  let component: ListarInfoFinancieraComponent;
  let fixture: ComponentFixture<ListarInfoFinancieraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarInfoFinancieraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarInfoFinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
