import { Position } from "./position.entity";

export class Route {
  constructor(title?: string, startPosition?: Position, endPosition?: Position) {
    this.title = title;
    this.startPosition = startPosition;
    this.endPosition = endPosition;
  }

  title: string;
  
  startPosition: Position;
  
  endPosition: Position;
}
