export function splitForSIForm(text: string) {
  return text
    .replaceAll("\n", "")
    .match(/.{1,35}/g)
    ?.join("\n")
    .toUpperCase();
}
