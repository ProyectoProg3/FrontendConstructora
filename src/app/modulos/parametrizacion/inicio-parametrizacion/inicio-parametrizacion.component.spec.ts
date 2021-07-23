import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioParametrizacionComponent } from './inicio-parametrizacion.component';

describe('InicioParametrizacionComponent', () => {
  let component: InicioParametrizacionComponent;
  let fixture: ComponentFixture<InicioParametrizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioParametrizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioParametrizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
