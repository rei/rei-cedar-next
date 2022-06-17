import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrFormError from '../CdrFormError.vue';

describe('CdrFormError', () => {
  describe('using just the error prop (no slot)', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrFormError, {
        propsData: {
          error: 'yahoo!',
        },
      });
    })

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders error prop', () => {
      expect(wrapper.find('.cdr-form-error').text()).toBe('yahoo!');
    });
  })

  describe('using an error slot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper =  mount(CdrFormError, {
        propsData: {
          error: true
        },
        slots: {
          'error': 'whoops',
        },
      });
    })

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders error slot', () => {
      expect(wrapper.find('.cdr-form-error').text()).toBe('whoops');
    });
  });
});
