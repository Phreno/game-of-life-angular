import {
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  ElementRef,
  SimpleChanges,
  AfterViewInit
} from '@angular/core';
import { GridService } from '../grid.service';
import { DrawerService } from '../drawer.service';
import { GameOfLifeService } from '../game-of-life.service';
const DEFAULT_GRID_WIDTH = 300;
const DEFAULT_CELL_PER_SIDE = 30;

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, OnChanges, AfterViewInit {
  constructor(
    private gridService: GridService,
    private drawerService: DrawerService,
    private gameOfLifeService: GameOfLifeService
  ) {}
  gridWidth: number = DEFAULT_GRID_WIDTH;
  cellsPerSide: number = DEFAULT_CELL_PER_SIDE;
  gridReady = false;
  @ViewChild('grid') canvas: ElementRef;

  get cellSize(): number {
    return this.gridWidth / this.cellsPerSide;
  }

  get grid(): HTMLCanvasElement {
    return this.canvas.nativeElement as HTMLCanvasElement;
  }

  get context(): CanvasRenderingContext2D {
    return this.grid.getContext('2d');
  }

  get gridStrokes() {
    return this.gridService.getStrokesForGrid(this.grid, this.cellsPerSide);
  }

  get gridCells() {
    return this.gridService.getCells(this.grid, this.cellsPerSide);
  }

  next() {
    const next = this.gridCells
      .map(cell =>
        this.gameOfLifeService.nextAt(cell.position.column, cell.position.line)
      )
      .filter(el => el);
    this.gameOfLifeService.updateWith(next);
  }

  getCoordinateFromPosition(position: { column: number; line: number }) {
    return this.gridCells.find(
      cell =>
        cell.position.column === position.column &&
        cell.position.line === position.line
    ).strokes;
  }

  drawGrid() {
    this.drawerService.drawLines(this.context, this.gridStrokes);
    this.gridReady = true;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    if (!this.gridReady) {
      this.drawGrid();
      setInterval(() => {
        this.drawGrid();
        this.gameOfLifeService.getCells().map(cell => {
          const rect = this.getCoordinateFromPosition(cell);
          this.drawerService.fillRectangle(this.context, rect);
        });
        this.next();
      }, 100);
    }
  }

  private debug() {
    this.gridCells.map(cell => {
      this.drawerService.fillRectangle(this.context, cell.strokes);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
}
