// @ts-ignore
import unidecode from "unidecode";
export const converToSlug = (text: string): string => {
  const unidecodeText = unidecode(text.trim());
  const slug = unidecodeText.replace(/\s+/g, "-").toLowerCase();
  return slug;
};
