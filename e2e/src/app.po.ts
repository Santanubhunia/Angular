import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element.all(by.tagName('h1')).get(0).getText() as Promise<string>;
  }

  getListTitle(): Promise<string> {
    return element(by.css('app-incident-list h1')).getText() as Promise<string>;
  }

  getIncidentsButton(): ElementFinder {
    return element(by.css('.mat-flat-button'));
  }

  getAddIncidentButton(): ElementFinder {
    return element(by.css('.mat-fab'));
  }
}
