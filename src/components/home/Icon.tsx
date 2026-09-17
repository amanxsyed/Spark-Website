const paths = {
  pin: 'M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  calendar: 'M4 6.5h16v13H4v-13Zm0 4h16M8 3.5v4M16 3.5v4',
  bed: 'M3 18v-7.5h18V18M3 14.5h18M6.5 10.5V8h5v2.5',
  bath: 'M4 12h16v2.5a4.5 4.5 0 0 1-4.5 4.5h-7A4.5 4.5 0 0 1 4 14.5V12Zm2 0V6a2 2 0 0 1 3.6-1.2',
  lock: 'M6.5 10.5h11v9h-11v-9Zm2.5 0V8a3 3 0 0 1 6 0v2.5',
  search: 'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Zm4.7-1.8L20 20',
  arrow: 'M5 12h13m-5-5 5 5-5 5',
  chevronL: 'M14.5 6 8.5 12l6 6',
  chevronR: 'M9.5 6l6 6-6 6',
  heart: 'M12 19.5s-7.5-4.4-7.5-10A4.2 4.2 0 0 1 12 7a4.2 4.2 0 0 1 7.5 2.5c0 5.6-7.5 10-7.5 10Z',
  building: 'M5 20.5V4.5h9v16M14 9.5h5v11M8 8h3M8 11.5h3M8 15h3',
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 18, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={paths[name]} />
    </svg>
  );
}
