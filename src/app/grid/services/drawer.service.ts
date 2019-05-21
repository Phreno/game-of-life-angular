import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  constructor() {}

  /* Préparation du dessin
   * */
  openLayer(context: CanvasRenderingContext2D) {
    context.beginPath();
  }
  /* Validation du dession
   * */
  closeLayer(context: CanvasRenderingContext2D) {
    context.closePath();
  }
  /* Nettoyage du canvas
   * */
  flush(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }

  /* Prépare un segment à partir de bornes (x,y) sur le calque courant
   * */
  segment(context: CanvasRenderingContext2D, coordinates) {
    context.moveTo(coordinates.start.x, coordinates.start.y);
    context.lineTo(coordinates.end.x, coordinates.end.y);
  }

  /* Prépare le tracé d'un rectangle à partir de bornes (x,y) sur le calque courant
   * */
  rectangle(context: CanvasRenderingContext2D, coordinates) {
    context.rect(
      coordinates.start.x,
      coordinates.start.y,
      coordinates.end.x,
      coordinates.end.y
    );
  }

  /* Dessine les items en attente sur le calque courant
   * */
  ink(context: CanvasRenderingContext2D, color, fill = false) {
    if (fill) {
      context.fillStyle = color;
      context.fill();
    } else {
      context.strokeStyle = color;
      context.stroke();
    }
  }

  drawLines(
    context: CanvasRenderingContext2D,
    lines: Array<{ start: any; end: any }>,
    color = 'black',
    flush = true
  ) {
    this.openLayer(context);
    if (flush) {
      this.flush(context);
    }
    lines.forEach(line => this.segment(context, line));
    this.ink(context, color);
    this.closeLayer(context);
  }

  fillRectangle(
    context: CanvasRenderingContext2D,
    coordinates: { start: any; end: any },
    color = 'rgba(255, 0, 0, 0.5)'
  ) {
    this.openLayer(context);
    this.rectangle(context, coordinates);
    this.ink(context, color, true);
    this.closeLayer(context);
  }
}
