export function formatAgentName(str) {
  return str
    .split('_') // ["bryon", "bierce"]
    .map(word => word[0].toUpperCase() + word.slice(1)) // ["Bryon", "Bierce"]
    .join(' ') // "Bryon Bierce"
}
