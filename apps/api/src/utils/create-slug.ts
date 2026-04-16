export function createSlug(text: string) {
  return text
    .normalize('NFD')
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}
