import { isUndefined, flatten, chunk, min } from 'lodash';
import { distance } from './points';
import { random } from './random';
import { customAlphabet } from 'nanoid';

import Delaunator from 'delaunator';

export type UniverseNode = {
    name: string;
    x: number;
    y: number;
    near: number[];
};

export type UniverseLink = {
    nodes: number[];
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};

const generateUniverseName = () => {
    const numbers = '0123456789';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const pre = customAlphabet(alphabet, 3);
    const post = customAlphabet(numbers, 6);

    return `${pre()}-${post()}`;
};

export const generateUniverses = (
    count: number,
    minX: number,
    maxX: number,
    minY: number,
    maxY: number,
    minDistance: number
) => {
    let nodes: UniverseNode[] = [{ x: 0, y: 0, name: 'EVELYN', near: [] }];
    for (let i = 0; i < count; i++) {
        const x = random(minX, maxX);
        const y = random(minY, maxY);

        let tooClose = false;

        for (let j = 0; j <= i; j++) {
            const bx = isUndefined(nodes[j]) ? 0 : nodes[j].x;
            const by = isUndefined(nodes[j]) ? 0 : nodes[j].y;
            if (distance(x, y, bx, by) < minDistance) {
                tooClose = true;
                break;
            }
        }
        if (tooClose) continue;
        else {
            const name = generateUniverseName();
            nodes.push({ x, y, name, near: [] });
        }
    }

    const delaunay = new Delaunator(flatten(nodes.map(({ x, y }) => [x, y])));

    const t = delaunay.triangles;
    const lines: UniverseLink[] = chunk(t, 3)
        .map(([a, b, c]) => [a, b, a, c, b, c])
        .map(([i1, i2]) => {
            nodes[i1].near.push(i2);
            nodes[i2].near.push(i1);
            return {
                nodes: [i1, i2],
                x1: nodes[i1].x,
                y1: nodes[i1].y,
                x2: nodes[i2].x,
                y2: nodes[i2].y,
            };
        });

    return { nodes: nodes.filter((n) => n.near.length > 0), lines };
};

export const calculateRoute = (
    nodes: UniverseNode[],
    edges: UniverseLink[],
    target: number
) => {
    const nodeCount = nodes.length;

    let openList = [0];

    let cameFrom: number[] = Array(nodeCount);

    let f: number[] = Array(nodeCount).fill(Number.MAX_VALUE);

    let g: number[] = Array(nodeCount).fill(Number.MAX_VALUE);
    g[0] = 0;

    let h: number[] = Array(nodeCount)
        .fill(0)
        .map((_, i) => distance(0, 0, nodes[i].x, nodes[i].y));

    f[0] = h[0];

    while (openList.length > 0) {
        const f_filtered = f.map((v, i) =>
            openList.includes(i) ? v : Number.MAX_VALUE
        );
        let current = f_filtered.findIndex((v) => v === min(f_filtered));

        if (current === target) {
            break;
        }

        openList = openList.filter((v) => v !== current);

        for (let i = 0; i < nodes[current].near.length; i++) {
            const near = nodes[current].near[i];

            let temp =
                g[current] +
                distance(
                    nodes[current].x,
                    nodes[current].y,
                    nodes[near].x,
                    nodes[near].y
                );

            if (temp < g[near]) {
                cameFrom[near] = current;
                g[near] = temp;
                f[near] = temp + h[near];

                if (!openList.includes(near)) openList.push(near);
            }
        }
    }

    let path = [target];
    let current = target;

    while (true) {
        current = cameFrom[current];
        path.push(current);

        if (current === 0) break;
    }

    let l: number[] = [];
    edges.forEach((e, i) => {
        if (e.nodes.every((n) => path.includes(n))) {
            l.push(i);
        }
    });

    return l;
};
