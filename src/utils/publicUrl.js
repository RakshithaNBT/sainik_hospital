/**
 * Helper to ensure static asset paths correctly include process.env.PUBLIC_URL
 * for GitHub Pages subpath deployment (/sainik_hospital).
 * 
 * @param {string} path - The relative or absolute path of the asset
 * @returns {string} - The processed URL with public URL prefix
 */
export const getPublicUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${process.env.PUBLIC_URL}${cleanPath}`;
};

export default getPublicUrl;
