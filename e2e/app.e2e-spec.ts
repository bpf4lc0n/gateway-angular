import { GuelphTemplatePage } from './app.po';

describe('Guelph App', function() {
  let page: GuelphTemplatePage;

  beforeEach(() => {
    page = new GuelphTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
