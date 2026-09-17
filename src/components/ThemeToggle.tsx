// 'use client';

// import { useEffect, useState } from 'react';

// /**
//  * Flips the site between the light and dark palettes.
//  * The choice is written to <html data-theme> and remembered, and the
//  * inline script in layout.tsx applies it before first paint so the
//  * page never flashes the wrong theme.
//  */
// export function ThemeToggle() {
//   const [theme, setTheme] = useState<'light' | 'dark'>('light');

//   useEffect(() => {
//     const current = document.documentElement.dataset.theme;
//     setTheme(current === 'dark' ? 'dark' : 'light');
//   }, []);

//   const flip = () => {
//     const next = theme === 'dark' ? 'light' : 'dark';
//     document.documentElement.dataset.theme = next;
//     try {
//       localStorage.setItem('spark-theme', next);
//     } catch {
//       /* private browsing — the choice just won't persist */
//     }
//     setTheme(next);
//   };

//   return (
//     <button
//       type="button"
//       className="theme-toggle"
//       onClick={flip}
//       aria-label={theme === 'dark' ? 'Switch to the light theme' : 'Switch to the dark theme'}
//     >
//       {theme === 'dark' ? (
//         <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
//           <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.5" />
//           <path
//             d="M12 2.4v2.4M12 19.2v2.4M2.4 12h2.4M19.2 12h2.4M5.2 5.2l1.7 1.7M17.1 17.1l1.7 1.7M18.8 5.2l-1.7 1.7M6.9 17.1l-1.7 1.7"
//             stroke="currentColor"
//             strokeWidth="1.5"
//             strokeLinecap="round"
//           />
//         </svg>
//       ) : (
//         <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
//           <path
//             d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.7 8.7 0 1 0 11.1 11.1Z"
//             stroke="currentColor"
//             strokeWidth="1.5"
//             strokeLinejoin="round"
//           />
//         </svg>
//       )}
//     </button>
//   );
// }
