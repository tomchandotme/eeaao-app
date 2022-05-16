import { useEffect, useState } from 'react';
import { generateUniverses, UniverseLink, UniverseNode } from 'utils/universes';
import { max } from 'lodash';
import { random } from 'utils/random';

const WIDTH = 768;
const HEIGHT = 512;
const PADDING = WIDTH > HEIGHT ? WIDTH / 8 : HEIGHT / 8;
const MIN_DISTANCE = 64;

const GridBackground = ({
    size = 16,
    stroke = '#3c3',
    strokeWidth = 1,
    blackgroundColor = '#111',
}: {
    size?: number;
    stroke?: string;
    strokeWidth?: number;
    blackgroundColor?: string;
}) => (
    <>
        <pattern
            id="pattern"
            x={0}
            y={0}
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
        >
            <line
                x1={size}
                y1={0}
                x2={size}
                y2={size}
                strokeWidth={strokeWidth}
                stroke={stroke}
            />
            <line
                x1={0}
                y1={size}
                x2={size}
                y2={size}
                strokeWidth={strokeWidth}
                stroke={stroke}
            />
        </pattern>
        <rect
            fill={blackgroundColor}
            x={-0.5 * WIDTH}
            y={-0.5 * HEIGHT}
            width="100%"
            height="100%"
        />
        <rect
            fill="url(#pattern)"
            x={-0.5 * WIDTH}
            y={-0.5 * HEIGHT}
            width="100%"
            height="100%"
            stroke={stroke}
            strokeWidth={strokeWidth}
        />
    </>
);

const Universe = ({
    x = 0,
    y = 0,
    main,
    selected,
}: {
    x: number;
    y: number;
    main?: boolean;
    selected?: boolean;
}) => (
    <circle
        cx={x}
        cy={y}
        r={main ? 12 : 8}
        fill="#888"
        stroke="#fff"
        strokeWidth={2}
    />
);

const UniversesMap = () => {
    const [universes, setUniverses] = useState<UniverseNode[]>([]);
    const [links, setLinks] = useState<UniverseLink[]>([]);

    const setup = () => {
        const count = random(36, 49);

        const { nodes, lines } = generateUniverses(
            count,
            -0.5 * (WIDTH - PADDING),
            0.5 * (WIDTH - PADDING),
            -0.5 * (HEIGHT - PADDING),
            0.5 * (HEIGHT - PADDING),
            MIN_DISTANCE
        );
        setUniverses(nodes);
        setLinks(lines);
    };

    useEffect(() => setup, []);

    return (
        <svg
            width={WIDTH}
            height={HEIGHT}
            viewBox={`${-0.5 * WIDTH} ${-0.5 * HEIGHT} ${WIDTH} ${HEIGHT}`}
            onClick={setup}
        >
            <GridBackground
                size={16}
                strokeWidth={1}
                stroke="#3c38"
                blackgroundColor="#0008"
            />

            {links.map(({ x1, y1, x2, y2 }, i) => (
                <line
                    key={`link_${i}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#fffc"
                    strokeWidth={2}
                    strokeDasharray={`8 8`}
                />
            ))}

            {universes.map(({ id, x, y }) => (
                <Universe
                    x={x}
                    y={y}
                    key={`universe_${id}`}
                    main={id === 'main'}
                />
            ))}
        </svg>
    );
};

export default UniversesMap;
