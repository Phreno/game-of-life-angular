import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GridComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('la grille', () => {
    it('est un canvas qui va permettre d afficher la grille', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#gof-grid-canvas')).toBeDefined();
    });

    it('doit avoir une hauteur et une largeur par défault', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#gof-grid-canvas').height).toBe(300);
      expect(compiled.querySelector('#gof-grid-canvas').width).toBe(300);
    });

    it('doit modifié sa taille lors du changement de la variable gridWidth', () => {
      const newWidth = 10;
      component.gridWidth = newWidth;
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#gof-grid-canvas').height).toBe(newWidth);
      expect(compiled.querySelector('#gof-grid-canvas').width).toBe(newWidth);
    });

    it('doit être lié au composant', () => {
      expect(component.canvas).toBeDefined();
    });

    it('doit prendre en charge le click sur une case', () => {
      expect(component.gridClick_handler).toBeDefined();
    });

    it('doit pouvoir retrouver la position d une cellule en fonction de ces coordonnées', () => {
      expect(component.getCellFromCoordinates).toBeDefined();
    });
  });
});
