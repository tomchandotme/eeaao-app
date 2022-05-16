import { useEffect, useState } from 'react';
import {
    calculateRoute,
    generateUniverses,
    UniverseLink,
    UniverseNode,
} from 'utils/universes';
import { random } from 'utils/random';
import { isUndefined } from 'lodash';

const WIDTH = 512;
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
    id,
    onClick,
}: {
    x: number;
    y: number;
    main?: boolean;
    selected?: boolean;
    id: string;
    onClick?: () => any;
}) => (
    <circle
        id={`node_${id}`}
        cx={x}
        cy={y}
        r={main ? 12 : 8}
        fill={main ? '#6f6' : selected ? '#6f6' : '#888'}
        stroke={main ? '#6f66' : '#fff'}
        strokeWidth={main ? 8 : 2}
        onClick={onClick}
    />
);

const UniversesMap = () => {
    const [universes, setUniverses] = useState<UniverseNode[]>([]);
    const [links, setLinks] = useState<UniverseLink[]>([]);

    const [selected, setSelected] = useState<number>();
    const [highLighted, setHighLighted] = useState<number[]>([]);

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
        setSelected(undefined);
    };

    useEffect(() => {
        setup();
    }, []);

    useEffect(() => {
        if (!isUndefined(selected) && selected > 0) {
            setHighLighted(calculateRoute(universes, links, selected));
        }
    }, [selected]);

    return (
        <svg
            width={WIDTH}
            height={HEIGHT}
            viewBox={`${-0.5 * WIDTH} ${-0.5 * HEIGHT} ${WIDTH} ${HEIGHT}`}
        >
            <GridBackground
                size={16}
                strokeWidth={1}
                stroke="#fff2"
                blackgroundColor="#004"
            />

            {links.map(({ x1, y1, x2, y2 }, i) => (
                <line
                    key={`link_${i}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={highLighted.includes(i) ? '#ff4' : '#fffc'}
                    strokeWidth={highLighted.includes(i) ? 4 : 2}
                    strokeDasharray={`8 8`}
                />
            ))}

            {universes.map(({ x, y }, i) => (
                <Universe
                    id={`node_${i}`}
                    x={x}
                    y={y}
                    key={`node_${i}`}
                    main={i === 0}
                    selected={i === selected}
                    onClick={() => setSelected(i)}
                />
            ))}
        </svg>
    );
};

export default UniversesMap;
