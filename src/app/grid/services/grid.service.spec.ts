import { TestBed } from '@angular/core/testing';

import { GridService } from './grid.service';

describe('GridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GridService = TestBed.get(GridService);
    expect(service).toBeTruthy();
  });

  describe('getCellAtColumnLine', () => {
    it('doit etre défini', () => {
      const service: GridService = TestBed.get(GridService);
      expect(service.getCellAtColumnLine).toBeDefined();
    });

    it('doit retourner une erreur si la colone n’est pas fournie', () => {
      const service: GridService = TestBed.get(GridService);
      expect(() => {
        service.getCellAtColumnLine(undefined, undefined, undefined, 1);
      }).toThrow(Error('Indice de colone incorrect'));
      expect(() => {
        service.getCellAtColumnLine(undefined, undefined, -1, 1);
      }).toThrow(Error('Indice de colone incorrect'));
      expect(() => {
        service.getCellAtColumnLine(undefined, undefined, 0, 1);
      }).not.toThrow(Error('Indice de colone incorrect'));
    });

    it('doit retourner une erreur si la ligne n’est pas fournie', () => {
      const service: GridService = TestBed.get(GridService);
      expect(() => {
        service.getCellAtColumnLine(undefined, undefined, 1, undefined);
      }).toThrow(Error('Indice de colone incorrect'));
      expect(() => {
        service.getCellAtColumnLine(undefined, undefined, 1, -1);
      }).toThrow(Error('Indice de colone incorrect'));
      expect(() => {
        service.getCellAtColumnLine(undefined, undefined, 1, 0);
      }).not.toThrow(Error('Indice de colone incorrect'));
    });
  });

  describe('getCells', () => {
    it('doit etre défini', () => {
      const service: GridService = TestBed.get(GridService);
      expect(service.getCells).toBeDefined();
    });

    it('doit prendre en paramètre un canvas', () => {
      const service: GridService = TestBed.get(GridService);
      expect(() => {
        const canvas = undefined;
        const cellsPerSide = 3;
        service.getCells(canvas, cellsPerSide);
      }).toThrow(Error('impossible de récupérer le canvas'));
    });
    it('doit prendre en paramètre un nombre de cellules par coté', () => {
      const service: GridService = TestBed.get(GridService);
      expect(() => {
        const canvas = { width: undefined, height: undefined };
        const cellsPerSide = undefined;
        service.getCells(canvas, cellsPerSide);
      }).toThrow(Error('impossible de récupérer le tracé de la grille'));
    });
    it('doit retourner un tableau', () => {
      const service: GridService = TestBed.get(GridService);
      const cellsPerSide = 2;
      const canvas = { width: 10, height: 10 };
      const cells = service.getCells(canvas, cellsPerSide);
      expect(Array.isArray(cells)).toBeTruthy();
    });
    it('doit retourner 4 cellules pour une grille 2x2', () => {
      const service: GridService = TestBed.get(GridService);
      const cellsPerSide = 2;
      const canvas = { width: 10, height: 10 };
      const cells = service.getCells(canvas, cellsPerSide);
      expect(cells.length).toBe(4);
      expect(cells.every(cell => cell.position)).toBeTruthy();
      expect(cells.every(cell => cell.strokes)).toBeTruthy();
    });
  });

  describe('getStrokesForGrid', () => {
    it('doit récupérer les valeurs de x pour chacunes des colones de la grille', () => {
      const service: GridService = TestBed.get(GridService);
      const canvas = {
        width: 15,
        height: undefined
      };
      const cellsPerSide = 3;
      const expected = [5, 10];
      const lines = service.getXPositionsForColumns(canvas, +cellsPerSide);
      expect(lines).toEqual(expected);
    });

    it('doit récupérer les valeurs de y pour chacunes des lignes de la grille', () => {
      const service: GridService = TestBed.get(GridService);
      const canvas = {
        width: undefined,
        height: 10
      };
      const cellsPerSide = 5;
      const expected = [2, 4, 6, 8];
      const lines = service.getYPositionsForLines(canvas, +cellsPerSide);
      expect(lines).toEqual(expected);
    });

    it('doit récupérer un segment référent a une colone de la grille', () => {
      const service: GridService = TestBed.get(GridService);
      const canvas = {
        width: undefined,
        height: 10
      };
      const expected = {
        start: { x: 2, y: 0 },
        end: { x: 2, y: 10 }
      };
      const segment = service.getStrokeAboveX(canvas, 2);
      expect(segment.start).toEqual(expected.start);
      expect(segment.end).toEqual(expected.end);
    });

    it('doit récupérer un segment référent à une ligne de la grille', () => {
      const service: GridService = TestBed.get(GridService);
      const canvas = {
        width: 12,
        height: undefined
      };
      const expected = {
        start: { x: 0, y: 5 },
        end: { x: 12, y: 5 }
      };
      const segment = service.getStrokeAboveY(canvas, 5);
      expect(segment.start).toEqual(expected.start);
      expect(segment.end).toEqual(expected.end);
    });

    it('doit récupérer l ensemble des segments definissant les lignes', () => {
      const service: GridService = TestBed.get(GridService);
      const cellsPerSide = 3;
      const canvas = {
        width: 6,
        height: 6
      };
      const expected = [
        {
          start: { x: 0, y: 2 },
          end: { x: 6, y: 2 }
        },
        {
          start: { x: 0, y: 4 },
          end: { x: 6, y: 4 }
        }
      ];
      const segments = service.getStrokesForLines(canvas, cellsPerSide);
      expect(segments).toEqual(expected);
    });

    it('doit récupérer l ensemble des segments definissant les colones', () => {
      const service: GridService = TestBed.get(GridService);
      const cellsPerSide = 3;
      const canvas = {
        width: 6,
        height: 6
      };
      const expected = [
        {
          start: { x: 2, y: 0 },
          end: { x: 2, y: 6 }
        },
        {
          start: { x: 4, y: 0 },
          end: { x: 4, y: 6 }
        }
      ];
      const segments = service.getStrokesForColumns(canvas, cellsPerSide);
      expect(segments).toEqual(expected);
    });

    it('doit récupérer l ensemble des segments définissant la grille', () => {
      const service: GridService = TestBed.get(GridService);
      const canvas = {
        width: 12,
        height: 12
      };
      const cellsPerSide = 2;
      const segments = service.getStrokesForGrid(canvas, cellsPerSide);
      expect(segments.length).toBe(2);
    });

    it('doit retourner une erreur si le canvas n’existe pas', () => {
      const service: GridService = TestBed.get(GridService);
      const canvas = null;
      expect(() => {
        service.getStrokesForGrid(canvas, 1);
      }).toThrow(Error('impossible de récupérer le canvas'));
    });

    it('doit retourner une erreur si cellsPerSide n’existe pas', () => {
      const service: GridService = TestBed.get(GridService);
      const canvas = {
        width: undefined,
        height: undefined
      };
      expect(() => {
        service.getStrokesForGrid(canvas, 0);
      }).toThrow(Error('impossible de récupérer le tracé de la grille'));
      expect(() => {
        service.getStrokesForGrid(canvas, null);
      }).toThrow(Error('impossible de récupérer le tracé de la grille'));
    });

    it('doit faire appel à getStrokesForLines', () => {
      const service: GridService = TestBed.get(GridService);
      const canvas = {
        width: 12,
        height: 12
      };
      const cellsPerSide = 3;
      spyOn(service, 'getStrokesForLines');
      service.getStrokesForGrid(canvas, cellsPerSide);
      expect(service.getStrokesForLines).toHaveBeenCalled();
    });

    it('doit faire appel à getStrokesForColumns', () => {
      const service: GridService = TestBed.get(GridService);
      const canvas = {
        width: 12,
        height: 12
      };
      const cellsPerSide = 3;
      spyOn(service, 'getStrokesForColumns');
      service.getStrokesForGrid(canvas, cellsPerSide);
      expect(service.getStrokesForColumns).toHaveBeenCalled();
    });
  });
});
