import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { DrawerService } from '../drawer.service';
import { GameOfLifeService } from '../game-of-life.service';
import { GridService } from '../grid.service';
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
  loopInterval = undefined;
  gridReady = undefined;
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

  getCellFromCoordinates(coordinates: { x: number; y: number }) {
    return this.gridCells.find(cell => {
      return (
        cell.strokes.start.x <= coordinates.x &&
        cell.strokes.start.y <= coordinates.y &&
        cell.strokes.start.x + this.cellSize > coordinates.x &&
        cell.strokes.start.y + this.cellSize > coordinates.y
      );
    });
  }

  drawGrid() {
    const flush = true;
    const gridColor = 'grey';
    if (!this.gridReady) {
      this.drawerService.drawLines(
        this.context,
        this.gridStrokes,
        gridColor,
        flush
      );
    }
  }

  getCellFromMouseEvent(event: MouseEvent) {
    return this.getCellFromCoordinates({
      x: event.layerX,
      y: event.layerY
    });
  }

  killCell(cell) {
    this.gameOfLifeService.killAt(cell.position.column, cell.position.line);
    this.redrawIfGameIsStopped();
  }

  deliverCell(cell) {
    this.gameOfLifeService.deliverAt(cell.position.column, cell.position.line);
    this.redrawIfGameIsStopped();
  }

  toggleCellStatus(cell) {
    const isAlive = this.gameOfLifeService.isAliveAt(
      cell.position.column,
      cell.position.line
    );
    isAlive ? this.killCell(cell) : this.deliverCell(cell);
  }

  gridClick_handler(event: MouseEvent) {
    const cell = this.getCellFromMouseEvent(event);
    this.toggleCellStatus(cell);
  }

  redrawIfGameIsStopped() {
    // On ne redessine que lorsque le jeu est en pause
    if (!this.loopInterval) {
      this.redraw();
    }
  }

  getMousePosition(canvas: HTMLCanvasElement, event: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  addNewCell(cell) {
    if (cell) {
      this.gameOfLifeService.deliverAt(
        cell.position.column,
        cell.position.line
      );
      this.redrawIfGameIsStopped();
    }
  }

  gridOver_handler(event: MouseEvent) {
    const coordinates = this.getMousePosition(this.grid, event);
    const cell = this.getCellFromCoordinates(coordinates);
    this.addNewCell(cell);
  }

  ngOnInit() {}

  drawCells() {
    this.gameOfLifeService.getCells().map(cell => {
      const rect = this.getCoordinateFromPosition(cell);
      this.drawerService.fillRectangle(this.context, rect);
    });
  }

  redraw() {
    this.flushAll();
    this.drawGrid();
    this.drawCells();
  }

  ngAfterViewInit() {
    this.drawGrid();
  }

  flushAll() {
    this.drawerService.flush(this.context);
  }

  run() {
    // On ne lance pas la boucle si une autre est en cours
    if (!this.loopInterval) {
      this.loopInterval = setInterval(() => {
        this.redraw();
        this.next();
      }, 100);
    }
  }

  stopLoop() {
    clearInterval(this.loopInterval);
    this.loopInterval = undefined;
  }

  stop() {
    this.stopLoop();
    this.redraw();
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
