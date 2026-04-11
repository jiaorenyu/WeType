import type { Template } from '../types';
import {
  literaryClean,
  techMinimal,
  businessElegant,
  midnightRadio,
  minimalBW,
  energeticOrange,
  vintageNews,
  girlPink,
  geekCode,
  foodExplore,
} from '../components/Templates/templates';

export const templates: Template[] = [
  literaryClean,
  techMinimal,
  businessElegant,
  midnightRadio,
  minimalBW,
  energeticOrange,
  vintageNews,
  girlPink,
  geekCode,
  foodExplore,
];

export const getTemplateById = (id: string): Template | undefined => {
  return templates.find((t) => t.id === id);
};

export const getTemplatesByCategory = (category: string): Template[] => {
  return templates.filter((t) => t.category === category);
};
