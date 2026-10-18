'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

function subscribe() {
  return () => undefined;
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`focus-ring pressable rounded-full p-2 text-ink-2 transition-colors hover:text-ink ${className}`.trim()}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
    </button>
  );
}
