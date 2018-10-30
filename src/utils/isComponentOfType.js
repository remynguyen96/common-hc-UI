import { createElement } from 'react';

export const isComponentOfType = (classType, reactElement) => {
  if (process.env.NODE_ENV !== 'production') {
    classType = createElement(classType).type;
  }
  return reactElement && reactElement.type === classType;
};
