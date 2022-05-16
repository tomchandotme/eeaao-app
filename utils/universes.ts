import { isUndefined, flatten, chunk } from 'lodash';
import { distance } from './points';
import { random } from './random';

import Delaunator from 'delaunator';

export type UniverseNode = {
    id?: string;
    x: number;
    y: number;
};

export type UniverseLink = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};

export const generateUniverses = (
    count: number,
    minX: number,
    maxX: number,
    minY: number,
    maxY: number,
    minDistance: number
) => {
    let nodes: UniverseNode[] = [{ x: 0, y: 0, id: 'main' }];
    for (let i = 0; i < count; i++) {
        const x = random(minX, maxX);
        const y = random(minY, maxY);

        let tooClose = false;

        for (let j = 0; j < i; j++) {
            const bx = isUndefined(nodes[j]) ? 0 : nodes[j].x;
            const by = isUndefined(nodes[j]) ? 0 : nodes[j].y;
            if (distance(x, y, bx, by) < minDistance) {
                tooClose = true;
                break;
            }
        }
        if (tooClose) continue;
        else {
            const id = i.toString();
            nodes.push({ id, x, y });
        }
    }

    const delaunay = new Delaunator(flatten(nodes.map(({ x, y }) => [x, y])));

    const t = delaunay.triangles;
    const lines: UniverseLink[] = chunk(t, 3)
        .map(([a, b, c]) => [a, b, a, c, b, c])
        .map(([i1, i2]) => ({
            x1: nodes[i1].x,
            y1: nodes[i1].y,
            x2: nodes[i2].x,
            y2: nodes[i2].y,
        }));

    return { nodes, lines };
};
