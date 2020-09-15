import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationStore, ConfigurationState } from './configuration.store';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { cacheable, setLoading } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  apiUrl = `${environment.apiUrl}/config`;

  constructor(private store: ConfigurationStore, private http: HttpClient) {}

  getConfiguration() {
    const request$ = this.http
      .get<ConfigurationState>(`${this.apiUrl}/configuration`)
      .pipe(
        setLoading(this.store),
        tap(configuration => {
          this.store.update(configuration);
          this.store.setHasCache(true, { restartTTL: true });
        })
      );

    return cacheable(this.store, request$);
  }
}
