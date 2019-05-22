import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameOfLifeService {
  constructor() {}
  private LIVE = 3;
  private STAY = 2;
  private cells = [
    { line: 10, column: 10 },
    { line: 10, column: 10 },
    { line: 10, column: 12 },
    { line: 9, column: 12 },
    { line: 8, column: 11 }
  ];
  /*
   * Retourne l'ensemble des cellules
   * */
  getCells() {
    return this.cells || [];
  }

  killAll() {
    this.cells = [];
  }

  /*
   * Test si une cellule est en vie
   * */
  isAliveAt(column, line) {
    return this.cells.some(
      cell => cell.line === line && cell.column === column
    );
  }

  /*
   * Tue une cellule
   * */
  killAt(column, line) {
    let deleted = false;
    if (this.isAliveAt(column, line)) {
      this.cells = this.cells.filter(
        cell => !(cell.column === column && cell.line === line)
      );
      deleted = true;
    }
    return deleted;
  }

  /*
   * Crée une nouvelle cellule
   * */
  deliverAt(column, line) {
    let delivered = false;
    if (!this.isAliveAt(column, line)) {
      this.cells.push({ column, line });
      delivered = true;
    }
    return delivered;
  }

  /*
   * Récupère les cellules au voisinage
   * */
  getNeighborhoodAt(column, line) {
    return [
      { column: column - 1, line: line - 1 },
      { column, line: line - 1 },
      { column: column + 1, line: line - 1 },
      { column: column - 1, line },
      { column: column + 1, line },
      { column: column - 1, line: line + 1 },
      { column, line: line + 1 },
      { column: column + 1, line: line + 1 }
    ].reduce((neighborhood, neighbor) => {
      if (this.isAliveAt(neighbor.column, neighbor.line)) {
        neighborhood.push(neighbor);
      }
      return neighborhood;
    }, []);
  }

  /*
   * Détermine l'état suivant d'une cellule
   * */
  nextAt(column, line) {
    let cell;
    const neighborhood = this.getNeighborhoodAt(column, line);
    const rebirth = this.LIVE === neighborhood.length;
    const stayAlive =
      this.STAY === neighborhood.length && this.isAliveAt(column, line);

    if (rebirth || stayAlive) {
      cell = { column, line };
    }
    return cell;
  }

  updateWith(next) {
    this.cells = next;
  }

  randomize(cellArray: Array<{ line: number; column: number }>) {
    if (!cellArray) {
      throw new Error('Aucun tableau fourni en paramètre');
    }
    const size = Math.floor(Math.random() * cellArray.length);
    const shuffled = cellArray.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, size);
  }
}
