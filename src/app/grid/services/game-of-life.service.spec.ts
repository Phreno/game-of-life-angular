import { TestBed } from '@angular/core/testing';

import { GameOfLifeService } from './game-of-life.service';

describe('GameOfLifeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameOfLifeService = TestBed.get(GameOfLifeService);
    expect(service).toBeTruthy();
  });

  it('doit disposer d une fonction pour tuer toutes les cellules', () => {
    const service: GameOfLifeService = TestBed.get(GameOfLifeService);
    expect(service.killAll).toBeDefined();
  });

  it('doit tuer toutes les cellules', () => {
    const service: GameOfLifeService = TestBed.get(GameOfLifeService);
    service.updateWith([
      { line: 10, column: 10 },
      { line: 10, column: 11 },
      { line: 10, column: 12 },
      { line: 9, column: 12 },
      { line: 8, column: 11 }
    ]);

    expect(service.getCells().length).toBe(5);
    service.killAll();
    expect(service.getCells().length).toBe(0);
  });

  describe('randomize', () => {
    it('doit disposer d une fonction qui randomize un tableau de cellules', () => {
      const service: GameOfLifeService = TestBed.get(GameOfLifeService);
      expect(service.randomize).toBeDefined();
    });

    it('doit prendre en argument un tableau', () => {
      const service: GameOfLifeService = TestBed.get(GameOfLifeService);
      expect(() => {
        service.randomize(undefined);
      }).toThrowError('Aucun tableau fourni en paramètre');
    });

    it('doit mélanger les cellules fournies en paramètre', () => {
      const service: GameOfLifeService = TestBed.get(GameOfLifeService);
      const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(indice => {
        return service.randomize([
          { line: 1, column: 1 },
          { line: 2, column: 2 }, // dummy stuff after (we only check for first element)
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 }
        ]);
      });
      const checkRandomIndex = expected.some(el => el[0].line !== 1);
      expect(checkRandomIndex).toBeTruthy();
    });

    it('doit retourner un tableau de taille variable', () => {
      const service: GameOfLifeService = TestBed.get(GameOfLifeService);
      const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(indice => {
        return service.randomize([
          { line: 1, column: 1 },
          { line: 2, column: 2 }, // dummy stuff after (we only check for first element)
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 },
          { line: 2, column: 2 }
        ]);
      });
      const checkRandomLength = expected.some(
        el => el.length < expected.length
      );
      expect(checkRandomLength).toBeTruthy();
    });
  });
});
