/** Resolve local paths both at localhost / and under the GitHub Pages project path. */
export const withBase = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
