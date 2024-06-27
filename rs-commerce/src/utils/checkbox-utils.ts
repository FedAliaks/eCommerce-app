import { SimpleBooleanValue, SimpleValue } from 'types/types';

export function getRatingValues(min: number, max: number, step: number): SimpleValue[] {
  const out: SimpleValue[] = [];
  let i = max;
  while (i >= min) {
    const curValue = i.toFixed(1);
    out.push({ id: curValue, value: curValue });
    i -= step;
  }

  return out;
}

export function getInitialSimpleFiltersValues(simpleValuesArr: SimpleValue[]): SimpleBooleanValue {
  const out: SimpleBooleanValue = {};
  simpleValuesArr.forEach((el) => {
    out[el.id] = false;
  });

  return out;
}
