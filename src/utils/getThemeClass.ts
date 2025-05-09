export const getThemeClass = (
  theme: string,
  styles: { [key: string]: string }
) => {
  return theme === 'dark' ? styles.dark : '';
};
