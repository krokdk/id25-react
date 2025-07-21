import { getCssColor } from './utils/getColorVar';

export function getColorScheme() {
  return {
    primary: getCssColor('primary-color'),
    secondary: getCssColor('secondary-color'),
    accent: getCssColor('accent-color'),//'#f5ce20',
    background: getCssColor('background-color'),
    lenasExtra: getCssColor('lenas-color'),
    white: getCssColor('white-color'),
  };
}
