import jsonpatch from 'fast-json-patch';

export function createModel<T>(params: Partial<T>): T {
  return { ...params } as T;
}

export function patchModel<T>(original: T, newValues: Partial<T>) {
  return jsonpatch
    .compare(original, deepCopy<T>(original, newValues))
    .filter(op => {
      if (op.op === 'add') {
        return op.value !== null;
      }

      return true;
    });
}

export function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function deepCopy<T>(
  target: T,
  newValues: Partial<T>,
  valuesToIgnore?: string[]
) {
  target = valuesToIgnore?.length
    ? Object.keys(target).reduce((acc, curr) => {
        if (!valuesToIgnore.includes(curr)) {
          acc[curr] = target[curr];
        }

        return acc;
      }, {} as T)
    : deepClone<T>(target);

  Object.keys(newValues).forEach(key => {
    let newValue = newValues[key];
    const originalValue = target[key];

    if (
      newValue instanceof Date &&
      typeof originalValue === 'string' &&
      newValue.getTime() === new Date(originalValue).getTime()
    ) {
      newValue = originalValue;
    }

    target[key] =
      originalValue && newValue && isObject(originalValue) && isObject(newValue)
        ? deepCopy<T>(originalValue, newValue, valuesToIgnore)
        : newValue;
  });

  return target;
}

export function isObject(value: any) {
  if (value === null || Array.isArray(value)) {
    return false;
  }

  return typeof value === 'object';
}
