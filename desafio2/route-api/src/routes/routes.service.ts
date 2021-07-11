import { Injectable } from '@nestjs/common';
import { Position } from './entities/position.entity';
import { Route } from './entities/route.entity';

@Injectable()
export class RoutesService {
  findAll() {
    return [
      new Route(
        'Rota 1',
        new Position(-15.82594, -47.45923),
        new Position(-15.82594, -47.45923),
      ),
      new Route(
        'Rota 2',
        new Position(-12.3461, -17.90911),
        new Position(43.122594, 47.65723),
      ),
      new Route(
        'Rota 3',
        new Position(15.76594, 38.75623),
        new Position(-25.4567, -17.9834),
      ),
      new Route(
        'Rota 4',
        new Position(-45.03594, -11.34923),
        new Position(38.2345, 32.1231),
      ),
      new Route(
        'Rota 5',
        new Position(12.28594, 27.18923),
        new Position(-17.8712, -27.4567),
      ),
    ];
  }
}
