export function getCssColor(varName) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--${varName}`)
    .trim();
}
