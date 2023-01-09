// Dependencies
import { LABELS } from "./constants";

// Utilities
export const getLabel = (labelName: string, appLanguage: string) => {
  const labelObject = LABELS[labelName];
  const labelValue = labelObject[appLanguage as keyof typeof labelObject];
  return labelValue;
};
