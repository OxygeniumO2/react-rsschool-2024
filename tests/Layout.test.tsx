import SearchLayout from '../src/app/search/layout';
import RootLayout from '../src/app/layout';
import { render } from '../src/utils/test-utilts';

describe('DefaultPage', () => {
  it('should render layout', () => {
    render(
      <SearchLayout>
        <h1>test</h1>
      </SearchLayout>
    );
  });

  it('should render layout2', () => {
    render(
      <RootLayout>
        <h1>test</h1>
      </RootLayout>
    );
  });
});
