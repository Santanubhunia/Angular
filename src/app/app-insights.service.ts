import { Injectable, NgZone } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppInsightsService {
  appInsights: ApplicationInsights;

  constructor(zone: NgZone) {
    zone.runOutsideAngular(() => {
      this.appInsights = new ApplicationInsights({
        config: {
          instrumentationKey: environment.appInsights.instrumentationKey,
          endpointUrl: 'https://dc.applicationinsights.us/v2/track?ngsw-bypass'
        }
      });
      this.appInsights.loadAppInsights();
    });
  }

  logPageView(name?: string, uri?: string) {
    this.appInsights.trackPageView({
      name,
      uri
    });
  }

  logEvent(name: string, properties?: { [key: string]: any }) {
    this.appInsights.trackEvent({ name }, properties);
  }

  logMetric(
    name: string,
    average: number,
    properties?: { [key: string]: any }
  ) {
    this.appInsights.trackMetric({ name, average }, properties);
  }

  logException(exception: Error, severityLevel?: number) {
    this.appInsights.trackException({
      exception,
      severityLevel
    });
  }

  logTrace(message: string, properties?: { [key: string]: any }) {
    this.appInsights.trackTrace({ message }, properties);
  }
}
