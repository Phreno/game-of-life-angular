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
  });

  describe('le formulaire', () => {
    it('doit disposer d un champ qui va renseigner le nombre de cellules par coté', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#gof-grid-cells-per-side')).toBeDefined();
    });
    it('doit disposer d un nombre de cellule par cote par défault', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#gof-grid-cells-per-side').value).toEqual(
        '30'
      );
    });
    it('doit associer la taille de la cellule avec le nombre de cellules par coté', () => {
      // On a vu dans les tests précédents que la grille dispose d une largeur et d une
      // hauteur par défault
      expect(component.cellSize).toBe(10);
    });
    it('doit disposer d un champ qui va renseigner la taille de la grille', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#gof-grid-width')).toBeDefined();
    });
  });
});
