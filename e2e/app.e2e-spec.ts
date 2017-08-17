import { ANGULARBELATRIXPage } from './app.po';

describe('angular-belatrix App', () => {
  let page: ANGULARBELATRIXPage;

  beforeEach(() => {
    page = new ANGULARBELATRIXPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
