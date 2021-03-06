import { useEffect, useState } from 'react';
import {
    calculateRoute,
    generateUniverses,
    UniverseLink,
    UniverseNode,
} from 'utils/universes';
import { random } from 'utils/random';
import { isUndefined } from 'lodash';

import Styles from 'styles/Universes.module.scss';

const WIDTH = 512;
const HEIGHT = 512;
const PADDING = (WIDTH > HEIGHT ? WIDTH : HEIGHT) / 8;
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
    name,
    onClick,
}: {
    x: number;
    y: number;
    name?: string;
    main?: boolean;
    selected?: boolean;
    onClick?: () => any;
}) => (
    <>
        <circle
            className={
                main ? Styles.main : selected ? Styles.selected : undefined
            }
            id={`Universe_${name}`}
            cx={x}
            cy={y}
            r={main ? 12 : 8}
            fill={main ? '#6f6' : selected ? '#6f6' : '#888'}
            stroke={main ? '#6f66' : '#fff'}
            strokeWidth={main ? 8 : 2}
            onClick={onClick}
        />
        {(main || selected) && (
            <text
                x={x}
                y={y + 28}
                alignmentBaseline="central"
                textAnchor="middle"
                fill="#fff"
                fontWeight={700}
                fontSize={14}
            >
                {name}
            </text>
        )}
    </>
);

const UniversesMap = ({ onChange }: { onChange?: (v?: string) => any }) => {
    const [universes, setUniverses] = useState<UniverseNode[]>([]);
    const [links, setLinks] = useState<UniverseLink[]>([]);

    const [selected, setSelected] = useState<number>();
    const [highlighted, sethighlighted] = useState<number[]>([]);

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
        sethighlighted([]);
    };

    useEffect(() => {
        setup();
    }, []);

    useEffect(() => {
        if (!isUndefined(selected) && selected > 0) {
            sethighlighted(calculateRoute(universes, links, selected));
        }

        if (onChange)
            onChange(
                isUndefined(selected) ? undefined : universes[selected].name
            );
    }, [selected]);

    return (
        <svg
            className={Styles.universes}
            width={WIDTH}
            height={HEIGHT}
            viewBox={`${-0.5 * WIDTH} ${-0.5 * HEIGHT} ${WIDTH} ${HEIGHT}`}
        >
            <GridBackground
                size={16}
                strokeWidth={1}
                stroke="#fff2"
                blackgroundColor="#004c"
            />

            {links.map(({ x1, y1, x2, y2 }, i) => (
                <line
                    className={
                        highlighted.includes(i) ? Styles.highlight : undefined
                    }
                    key={`link_${i}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={highlighted.includes(i) ? '#ff4' : '#fffc'}
                    strokeWidth={highlighted.includes(i) ? 4 : 2}
                    strokeDasharray={`8 8`}
                />
            ))}

            {universes.map(({ x, y, name }, i) => (
                <Universe
                    name={name}
                    x={x}
                    y={y}
                    key={`node_${name}`}
                    main={i === 0}
                    selected={i === selected}
                    onClick={i > 0 ? () => setSelected(i) : () => {}}
                />
            ))}
        </svg>
    );
};

export default UniversesMap;
