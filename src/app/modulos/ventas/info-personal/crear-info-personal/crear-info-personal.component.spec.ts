import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearInfoPersonalComponent } from './crear-info-personal.component';

describe('CrearInfoPersonalComponent', () => {
  let component: CrearInfoPersonalComponent;
  let fixture: ComponentFixture<CrearInfoPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearInfoPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearInfoPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
