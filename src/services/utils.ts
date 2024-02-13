export const render = (query: string, block: string) => {
  const root = document.querySelector(query) as HTMLElement;

  root.textContent = block;

  return root;
};

export function isEmpty(value: any) {
  if (typeof value === 'number') {
    return true;
  }

  if (!Boolean(value)) {
    return true;
  }

  if (typeof value === 'string') {
    return false;
  }

  if (Array.isArray(value)) {
    return !Boolean(value.length);
  }

  if (value instanceof Set) {
    return !Boolean(value.size);
  }

  if (value instanceof Map) {
    return !Boolean(value.size);
  }

  if (typeof value === 'object') {
    return !Boolean(Object.keys(value).length);
  }

  if (typeof value === 'boolean') {
    return value;
  }

  return false;
}

export function isEqual(a: object, b: object): boolean {
  if (a === b) {
    return true;
  }

  if (!(a instanceof Object) || !(b instanceof Object)) {
    return false;
  }

  const keysA = Object.keys(a) as (keyof typeof a)[];
  const keysB = Object.keys(b) as (keyof typeof b)[];

  if (keysA.length !== keysB.length) {
    return false;
  }

  const areKeysEqual =
    keysA.length === keysB.length &&
    keysA.every((key) => keysB.includes(key) && isEqual(a[key], b[key]));

  if (!areKeysEqual) {
    return false;
  }

  return true;
}

function merge(target: any, source: any) {
  const merged = { ...target };

  Object.keys(source).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (source[key] instanceof Object && !Array.isArray(source[key])) {
        merged[key] = merge(target[key], source[key]);
      } else {
        merged[key] = source[key];
      }
    }
  });

  return merged;
}

export function set(object: any, path: string, value: any): any {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  if (!(object instanceof Object)) {
    return object;
  }

  const keys = path.split('.');
  let currentObject: any | {} = object;

  for (let i = 0; i < keys.length - 1; i += 1) {
    const key: any = keys[i];
    if (!currentObject[key] || !currentObject[key]) {
      currentObject[key] = {};
    }
    currentObject = currentObject[key];
  }

  const lastKey: any = keys[keys.length - 1];
  currentObject[lastKey] = value;

  return merge({}, object);
}
