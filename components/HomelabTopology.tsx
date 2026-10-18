'use client';

import { useState } from 'react';
import { homelabNodes } from '@/data/homelab';

const GATEWAY = { x: 300, y: 40 };
const NODE_Y = 190;

function nodeX(index: number, count: number) {
  return 75 + (index * 450) / Math.max(count - 1, 1);
}

function pathFor(x: number) {
  const midY = (GATEWAY.y + NODE_Y) / 2;
  return `M ${GATEWAY.x} ${GATEWAY.y} C ${GATEWAY.x} ${midY}, ${x} ${midY}, ${x} ${NODE_Y}`;
}

export function HomelabTopology() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const count = homelabNodes.length;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
      <figure className="surface-card p-4 sm:p-6" data-reveal>
        <svg viewBox="0 0 600 230" className="h-auto w-full" role="img" aria-labelledby="topology-title">
          <title id="topology-title">{`Homelab topology: gateway connected to ${count} services`}</title>
          {homelabNodes.map((node, index) => {
            const d = pathFor(nodeX(index, count));
            const active = activeId === node.id;
            return (
              <g key={node.id}>
                <path d={d} className="fill-none stroke-rim" strokeWidth={1.5} />
                <path
                  d={d}
                  pathLength={1}
                  className="topology-trace fill-none stroke-accent"
                  strokeWidth={2}
                  data-active={active}
                />
              </g>
            );
          })}

          <circle cx={GATEWAY.x} cy={GATEWAY.y} r={14} className="fill-accent" />
          <text
            x={GATEWAY.x + 24}
            y={GATEWAY.y + 4}
            className="fill-ink-2 font-mono text-[12px] uppercase tracking-[0.14em]"
          >
            Gateway
          </text>

          {homelabNodes.map((node, index) => {
            const x = nodeX(index, count);
            const active = activeId === node.id;
            return (
              <g key={node.id}>
                <circle
                  cx={x}
                  cy={NODE_Y}
                  r={9}
                  className={`stroke-[2] transition-colors duration-200 ${active ? 'fill-accent stroke-accent' : 'fill-elevated stroke-ink-3'}`}
                />
                <text
                  x={x}
                  y={NODE_Y + 30}
                  textAnchor="middle"
                  className={`font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-200 ${active ? 'fill-ink' : 'fill-ink-3'}`}
                >
                  {node.role}
                </text>
              </g>
            );
          })}
        </svg>
      </figure>

      <ul className="grid gap-4 sm:grid-cols-2">
        {homelabNodes.map((node) => (
          <li
            key={node.id}
            tabIndex={0}
            onMouseEnter={() => setActiveId(node.id)}
            onMouseLeave={() => setActiveId(null)}
            onFocus={() => setActiveId(node.id)}
            onBlur={() => setActiveId(null)}
            className={`focus-ring surface-card p-5 transition-[border-color] duration-200 ${activeId === node.id ? 'border-accent' : ''}`}
            data-reveal
          >
            <p className="eyebrow">{node.role}</p>
            <h3 className="mt-2 font-serif text-step-1">{node.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">{node.description}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${node.title} technologies`}>
              {node.tags.map((tag) => (
                <li key={tag}>
                  <span className="tag-pill">{tag}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
