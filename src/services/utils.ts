export const render = (query, block) => {
  const root = document.querySelector(query);
  root.textContent = block;
  return root;
};

export function isEmpty(value) {
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

  for (const key of keysA) {
    if (!keysB.includes(key) || !isEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}

function merge(target: any, source: any) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (source[key] instanceof Object && !Array.isArray(source[key])) {
        Object.assign(source[key], merge(target[key], source[key]));
      }
    }
  }
  return { ...target, ...source };
}

export function set(
  object: any | unknown,
  path: string,
  value: unknown
): any | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  if (!(object instanceof Object)) {
    return object;
  }

  const keys = path.split('.');
  let currentObject: any = object;

  for (let i = 0; i < keys.length - 1; i++) {
    const key: string = keys[i];
    if (!currentObject[key] || !(currentObject[key] instanceof Object)) {
      currentObject[key] = {} as any;
    }
    currentObject = currentObject[key];
  }

  const lastKey = keys[keys.length - 1];
  currentObject[lastKey] = value as any;

  return merge({}, object);
}
