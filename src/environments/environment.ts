// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://localhost:51050/api',
  issuer: 'https://localhost:51052',
  appInsights: {
    instrumentationKey: 'e4f3f325-96fb-f885-a8b6-06d1fb93b155'
  },
  classification: 'IPT Dev Environment',
  classificationColor: 'dimgrey'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
