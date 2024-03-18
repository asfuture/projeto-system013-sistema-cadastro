import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaNovoUsuarioComponent } from './tela-novo-usuario.component';

describe('TelaNovoUsuarioComponent', () => {
  let component: TelaNovoUsuarioComponent;
  let fixture: ComponentFixture<TelaNovoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaNovoUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaNovoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
