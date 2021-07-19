import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInfoPersonalComponent } from './editar-info-personal.component';

describe('EditarInfoPersonalComponent', () => {
  let component: EditarInfoPersonalComponent;
  let fixture: ComponentFixture<EditarInfoPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarInfoPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarInfoPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
