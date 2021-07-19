import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarInfoPersonalComponent } from './eliminar-info-personal.component';

describe('EliminarInfoPersonalComponent', () => {
  let component: EliminarInfoPersonalComponent;
  let fixture: ComponentFixture<EliminarInfoPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarInfoPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarInfoPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
