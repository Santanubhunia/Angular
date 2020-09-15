import { coerceArray } from '@datorama/akita';

export function userHasRoles(
  rolesToCheck: string | string[],
  userRoles: string | string[],
  inclusive: boolean,
  disableAdmin: boolean
) {
  if (!rolesToCheck) {
    return true;
  }

  if (inclusive) {
    return (
      coerceArray(rolesToCheck).every(r =>
        userRoles?.includes(r.toLowerCase())
      ) ||
      (!disableAdmin && userRoles?.includes('administrator'))
    );
  } else {
    return (
      coerceArray(rolesToCheck).some(r =>
        userRoles?.includes(r.toLowerCase())
      ) ||
      (!disableAdmin && userRoles?.includes('administrator'))
    );
  }
}
