import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrQuote from '../CdrQuote.vue';

describe('CdrQuote', () => {

  describe('default component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrQuote, {
        propsData: {
          tag: 'aside',
          summary: 'This is the summary',
          citation: 'This is the citation'
        }
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('pullquote', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrQuote, {
        propsData: {
          summary: 'This is the pull summary',
          citation: 'This is the pull citation',
          modifier: 'pull'
        }
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
