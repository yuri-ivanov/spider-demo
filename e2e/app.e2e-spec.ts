import { AngTestCliPage } from './app.po';

describe('ang-test-cli App', function() {
  let page: AngTestCliPage;

  beforeEach(() => {
    page = new AngTestCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
