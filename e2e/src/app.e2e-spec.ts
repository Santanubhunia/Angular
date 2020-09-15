import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('PSB-CY Database');
  });

  it('should redirect to cases', () => {
    page.navigateTo();
    expect(browser.driver.getCurrentUrl()).toContain('/cases');
  });

  it('should display incident list title', () => {
    page.navigateTo();
    page.getIncidentsButton().click();
    expect(page.getListTitle()).toEqual('Incident List');
  });

  it('should redirect to new incident when new incident is clicked', () => {
    page.navigateTo();
    page.getIncidentsButton().click();
    page.getAddIncidentButton().click();
    expect(browser.driver.getCurrentUrl()).toContain('/new');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry)
    );
  });
});
