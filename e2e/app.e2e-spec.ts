import { SpiderPage } from './app.po';

describe('spider App', function() {
  let page: SpiderPage;

  beforeEach(() => {
    page = new SpiderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
