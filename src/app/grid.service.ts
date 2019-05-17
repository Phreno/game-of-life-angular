import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  constructor() {}
  getYPositionsForLines(
    canvas: { width: number; height: number },
    cellsPerSide: number
  ) {
    const cellHeight: number = +canvas.height / +cellsPerSide;
    return Array.from(Array(+cellsPerSide - 1).keys()).map(
      index => (+index + 1) * +cellHeight
    );
  }

  getXPositionsForColumns(
    canvas: { width: number; height: number },
    cellsPerSide: number
  ) {
    const cellHeight: number = canvas.width / +cellsPerSide;
    return Array.from(Array(+cellsPerSide - 1).keys()).map(
      index => (index + 1) * +cellHeight
    );
  }

  getStrokeAboveX(canvas: { width: number; height: number }, x: number) {
    return {
      start: { x, y: 0 },
      end: { x, y: canvas.height }
    };
  }

  getStrokeAboveY(canvas: { width: number; height: number }, y: number) {
    return {
      start: { x: 0, y },
      end: { x: canvas.width, y }
    };
  }

  getStrokesForLines(
    canvas: { width: number; height: number },
    cellsPerSide: number
  ) {
    return this.getYPositionsForLines(canvas, cellsPerSide).map(y =>
      this.getStrokeAboveY(canvas, y)
    );
  }

  getStrokesForColumns(
    canvas: { width: number; height: number },
    cellsPerSide: number
  ) {
    return this.getXPositionsForColumns(canvas, cellsPerSide).map(x =>
      this.getStrokeAboveX(canvas, x)
    );
  }

  getStrokesForGrid(
    canvas: { width: number; height: number },
    cellsPerSide: number
  ) {
    this.checkArgs(canvas, cellsPerSide);
    const lines = this.getStrokesForLines(canvas, cellsPerSide) || [];
    const columns = this.getStrokesForColumns(canvas, cellsPerSide) || [];

    return [...lines, ...columns];
  }

  getCells(canvas: { width: number; height: number }, cellsPerSide: number) {
    this.checkArgs(canvas, cellsPerSide);
    const lines = Array.from(Array(cellsPerSide).keys());
    const columns = Array.from(Array(cellsPerSide).keys());
    const cellWidth = canvas.width / cellsPerSide;
    const cellHeight = canvas.height / cellsPerSide;
    const cells = [];
    lines.map(line => {
      return columns.map(column => {
        const start = {
          x: column * cellWidth,
          y: line * cellHeight
        };
        const end = {
          x: cellWidth,
          y: cellHeight
        };
        cells.push({
          position: {
            column,
            line
          },
          strokes: {
            start,
            end
          }
        });
      });
    });
    return cells;
  }

  getCellAtColumnLine(column: number, line: number) {
    const wrongColumn = undefined === column || null === column || 0 > column;
    const wrongLine = undefined === line || null === line || 0 > line;
    if (wrongColumn || wrongLine) {
      throw new Error('Indice de colone incorrect');
    }
  }

  private checkArgs(
    canvas: { width: number; height: number },
    cellsPerSide: number
  ) {
    if (!canvas) {
      throw Error('impossible de récupérer le canvas');
    }
    if (typeof cellsPerSide !== 'number' || 0 >= cellsPerSide) {
      throw Error('impossible de récupérer le tracé de la grille');
    }
  }
}
