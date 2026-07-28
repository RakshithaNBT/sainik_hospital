/**
 * Helper to ensure static asset paths correctly resolve using relative paths
 * for GitHub Pages subpath deployment (/sainik_hospital).
 * 
 * @param {string} path - The relative or absolute path of the asset
 * @returns {string} - The processed relative URL prefix
 */
export const getPublicUrl = (path) => {
  if (!path) return '';
  if (typeof path !== 'string') return path;
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const prefix = process.env.PUBLIC_URL || '.';
  return `${prefix}/${cleanPath}`;
};

export default getPublicUrl;
