import { useEffect, useState } from 'react';
import { isUndefined } from 'lodash';
import { calculateRoute, generateUniverses } from '../utils/universes.js';
import { random } from '../utils/random.js';
import styles from '../styles/Universes.module.css';

const WIDTH = 512;
const HEIGHT = 512;
const PADDING = (WIDTH > HEIGHT ? WIDTH : HEIGHT) / 8;
const MIN_DISTANCE = 64;

const GridBackground = ({
  size = 16,
  stroke = '#3c3',
  strokeWidth = 1,
  blackgroundColor = '#111',
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
}) => (
  <>
    <circle
      className={
        main ? styles.main : selected ? styles.selected : undefined
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

const UniversesMap = ({ onChange }) => {
  const [universes, setUniverses] = useState([]);
  const [links, setLinks] = useState([]);

  const [selected, setSelected] = useState();
  const [highlighted, setHighlighted] = useState([]);

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
    setHighlighted([]);
  };

  useEffect(() => {
    setup();
  }, []);

  useEffect(() => {
    if (!isUndefined(selected) && selected > 0) {
      setHighlighted(calculateRoute(universes, links, selected));
    }

    if (onChange)
      onChange(
        isUndefined(selected) ? undefined : universes[selected].name
      );
  }, [selected]);

  return (
    <svg
      className={styles.universes}
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
            highlighted.includes(i) ? styles.highlight : undefined
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
