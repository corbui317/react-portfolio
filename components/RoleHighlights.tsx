'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface RoleHighlightsProps {
  id: string;
  highlights: string[];
  visibleCount?: number;
}

function Bullet({ text }: { text: string }) {
  return (
    <li className="relative pl-5 leading-relaxed text-ink-2">
      <span className="absolute left-0 top-[0.7em] h-px w-2.5 bg-accent" aria-hidden="true" />
      {text}
    </li>
  );
}

export function RoleHighlights({ id, highlights, visibleCount = 2 }: RoleHighlightsProps) {
  const [open, setOpen] = useState(false);
  const shown = highlights.slice(0, visibleCount);
  const hidden = highlights.slice(visibleCount);
  const panelId = `role-highlights-${id}`;

  return (
    <div className="mt-5">
      <ul className="space-y-3">
        {shown.map((text) => (
          <Bullet key={text} text={text} />
        ))}
      </ul>
      {hidden.length > 0 ? (
        <>
          <div id={panelId} className="collapsible" data-open={open} inert={!open}>
            <div>
              <ul className="space-y-3 pt-3">
                {hidden.map((text) => (
                  <Bullet key={text} text={text} />
                ))}
              </ul>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={panelId}
            className="focus-ring pressable mt-4 inline-flex items-center gap-1.5 rounded-sm font-mono text-xs uppercase tracking-[0.14em] text-accent"
          >
            {open ? 'Show less' : `Show all ${highlights.length}`}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ease-out ${open ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
        </>
      ) : null}
    </div>
  );
}
