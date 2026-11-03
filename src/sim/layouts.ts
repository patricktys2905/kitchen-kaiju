export type ObstacleStyle = 'cup' | 'shaker' | 'bowl' | 'candle' | 'napkin' | 'bread' | 'gravy';

export type Obstacle =
  | { shape: 'circle'; x: number; y: number; r: number; style: ObstacleStyle }
  | { shape: 'rect'; x: number; y: number; w: number; h: number; style: ObstacleStyle };

export interface Layout {
  name: string;
  obstacles: Obstacle[];
  spawns: [number, number][];
}

// Table spans x 100..1180, y 95..670 (centre 640, 382).
export const LAYOUTS: Layout[] = [
  {
    name: 'Sunday Roast',
    obstacles: [
      { shape: 'rect', x: 575, y: 345, w: 130, h: 75, style: 'gravy' },
      { shape: 'circle', x: 330, y: 250, r: 34, style: 'cup' },
      { shape: 'circle', x: 950, y: 515, r: 34, style: 'cup' },
      { shape: 'circle', x: 330, y: 515, r: 18, style: 'shaker' },
      { shape: 'circle', x: 950, y: 250, r: 18, style: 'shaker' },
    ],
    spawns: [[180, 170], [1100, 595], [1100, 170], [180, 595]],
  },
  {
    name: 'Dinner for Four',
    obstacles: [
      { shape: 'circle', x: 400, y: 270, r: 30, style: 'cup' },
      { shape: 'circle', x: 880, y: 270, r: 30, style: 'cup' },
      { shape: 'circle', x: 400, y: 495, r: 30, style: 'cup' },
      { shape: 'circle', x: 880, y: 495, r: 30, style: 'cup' },
      { shape: 'circle', x: 640, y: 382, r: 22, style: 'candle' },
      { shape: 'rect', x: 615, y: 140, w: 50, h: 70, style: 'napkin' },
      { shape: 'rect', x: 615, y: 555, w: 50, h: 70, style: 'napkin' },
    ],
    spawns: [[170, 160], [1110, 605], [1110, 160], [170, 605]],
  },
  {
    name: 'Leftovers',
    obstacles: [
      { shape: 'rect', x: 300, y: 190, w: 44, h: 180, style: 'bread' },
      { shape: 'rect', x: 936, y: 395, w: 44, h: 180, style: 'bread' },
      { shape: 'circle', x: 640, y: 382, r: 60, style: 'bowl' },
      { shape: 'circle', x: 500, y: 565, r: 16, style: 'shaker' },
      { shape: 'circle', x: 780, y: 200, r: 16, style: 'shaker' },
    ],
    spawns: [[170, 150], [1110, 615], [1110, 150], [170, 615]],
  },
];
