import { SearchResultPage } from './app.po';

describe('search-result App', function() {
  let page: SearchResultPage;

  beforeEach(() => {
    page = new SearchResultPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
