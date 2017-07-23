import { LegalFrontPage } from './app.po';

describe('legal-front App', () => {
  let page: LegalFrontPage;

  beforeEach(() => {
    page = new LegalFrontPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
