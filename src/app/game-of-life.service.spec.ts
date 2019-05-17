import { TestBed } from '@angular/core/testing';

import { GameOfLifeService } from './game-of-life.service';

describe('GameOfLifeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameOfLifeService = TestBed.get(GameOfLifeService);
    expect(service).toBeTruthy();
  });
});
