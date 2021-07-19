import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInfoPersonalComponent } from './listar-info-personal.component';

describe('ListarInfoPersonalComponent', () => {
  let component: ListarInfoPersonalComponent;
  let fixture: ComponentFixture<ListarInfoPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarInfoPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarInfoPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
