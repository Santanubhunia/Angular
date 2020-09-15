import { pipe, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { coerceArray } from '@datorama/akita';

export function toFormData<T>(data: T) {
  const formData = new FormData();

  buildFormData(formData, data);

  return formData;
}

function buildFormData(formData: FormData, data: any, parentKey?: string) {
  if (Array.isArray(data)) {
    if (parentKey) {
      data.forEach((value, index) => {
        buildFormData(formData, value, `${parentKey}[${index}]`);
      });
    }
  } else if (
    data &&
    typeof data === 'object' &&
    !(data instanceof Date) &&
    !(data instanceof File) &&
    !(data instanceof Blob)
  ) {
    Object.keys(data).forEach(key => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}.${key}` : key
      );
    });
  } else {
    const value = data == null ? '' : data;

    formData.append(parentKey, value);
  }
}

export function toResponseBody<T>() {
  return pipe(
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
    map((response: HttpResponse<T>) => response.body)
  );
}

export function uploadProgress<T>(cb: (progress: number) => void) {
  return tap((event: HttpEvent<T>) => {
    if (event.type === HttpEventType.UploadProgress) {
      cb(Math.round((100 * event.loaded) / event.total));
    }
  });
}

export function addEmptyItem() {
  return function selectOperator<T>(source: Observable<T[]>): Observable<T[]> {
    return new Observable(subscriber => {
      source.subscribe({
        next(value) {
          const nextValue = coerceArray(value);
          const keys = Object.keys(nextValue?.[0] || {});

          const emptyObject: T = keys.reduce(
            (curr: T, key: string) => ({
              ...curr,
              [key]: null
            }),
            {} as T
          );

          subscriber.next([emptyObject, ...nextValue]);
        },
        error(error) {
          subscriber.error(error);
        },
        complete() {
          subscriber.complete();
        }
      });
    });
  };
}
