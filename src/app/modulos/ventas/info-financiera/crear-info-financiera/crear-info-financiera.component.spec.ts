import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearInfoFinancieraComponent } from './crear-info-financiera.component';

describe('CrearInfoFinancieraComponent', () => {
  let component: CrearInfoFinancieraComponent;
  let fixture: ComponentFixture<CrearInfoFinancieraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearInfoFinancieraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearInfoFinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
