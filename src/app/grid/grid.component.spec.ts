import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';
import { log } from 'util';

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

    it('doit être lié au composant', () => {
      expect(component.canvas).toBeDefined();
    });

    it('doit prendre en charge le click sur une case', () => {
      expect(component.gridClick_handler).toBeDefined();
    });

    it('doit pouvoir retrouver la position d une cellule en fonction de ces coordonnées', () => {
      expect(component.getCellFromCoordinates).toBeDefined();
    });

    it('doit pouvoir effacer entièrement la grille', () => {
      expect(component.flushGrid).toBeDefined();
      spyOn(component.services.gameOfLife, 'killAll');
      component.flushGrid();
      expect(component.services.gameOfLife.killAll).toHaveBeenCalled();
    });

    it('doit redessiner la grille lorsque toutes les cellules sont tuées', () => {
      spyOn(component, 'redraw');
      component.flushGrid();
      expect(component.redraw).toHaveBeenCalled();
    });

    it('doit permettre de générer une grille aléatoire', () => {
      expect(component.setupRandom).toBeDefined();
    });

    it('doit appeler le service lors du remplissage aléatoire de la grille', () => {
      spyOn(component.services.gameOfLife, 'randomize');
      component.setupRandom();
      expect(component.services.gameOfLife.randomize).toHaveBeenCalled();
    });
    it('doit mettre à jour le game of life service après avoir fait un random', () => {
      spyOn(component.services.gameOfLife, 'updateWith');
      component.setupRandom();
      expect(component.services.gameOfLife.updateWith).toHaveBeenCalled();
    });

    it('doit redessiner la grille après avoir fait un random', () => {
      spyOn(component, 'redraw');
      component.setupRandom();
      expect(component.redraw).toHaveBeenCalled();
    });
  });
});
