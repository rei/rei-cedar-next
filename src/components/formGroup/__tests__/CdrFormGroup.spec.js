import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrFormGroup from '../CdrFormGroup.vue';

describe('CdrFormGroup', () => {
  describe('form group with label and default slot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrFormGroup, {
        propsData: {
          label: 'hey'
        },
        slots: {
          default: 'form elements!',
        },
      });
    })

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  })

  describe('form group with error state', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrFormGroup, {
        propsData: {
          id: 'renders',
          label: 'hey',
          error: 'Something is happening?'
        },
        slots: {
          'default': 'form elements!',
        },
      });
    })

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  })

  describe('form group with required state', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrFormGroup, {
        propsData: {
          label: 'hey',
          required: true,
        },
        slots: {
          default: 'form elements!',
        },
      });
    })

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('has appended the expected asterisk to the legend', () => {
      expect(wrapper.find('legend').text()).toBe('hey *');
    })
  })

  describe('form group with optional state', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrFormGroup, {
        propsData: {
          label: 'hey',
          optional: true,
        },
        slots: {
          default: 'form elements!',
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('has appended the expected "(optional)" text to the legend', () => {
      expect(wrapper.find('legend').text()).toBe('hey (optional)');
    });
  })

  describe('form group with required and optional state', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrFormGroup, {
        propsData: {
          label: 'hey',
          required: true,
          optional: true,
        },
        slots: {
          default: 'form elements!',
        },
      });
    })

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('overrides the optional property and appends the expected asterisk to the legend', () => {
      expect(wrapper.find('legend').text()).toBe('hey *');
    })
  });

  describe('form group with error slot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrFormGroup, {
        propsData: {
          id: '123',
          error: true
        },
        slots: {
          error: 'whoops',
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('has a containing element with the expected "cdr-form-group--error" class', () => {
      expect(wrapper.find('.cdr-form-group--error').exists()).toBe(true);
    });

    it('the error has the expected text', () => {
      expect(wrapper.find('.cdr-form-error').text()).toBe('whoops');
    });
  })

  describe('disabled form group', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrFormGroup, {
        propsData: {
          disabled: true
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('has the expected disabled class', () => {
      expect(wrapper.find('.cdr-form-group--disabled').exists()).toBe(true);
    });
  })

  describe('when text is passed as error prop', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrFormGroup, {
        propsData: {
          id: '123',
          error: 'false!'
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('has the expected error class', () => {
      expect(wrapper.find('.cdr-form-group--error').exists()).toBe(true);
    });

    it('has the expected error text', () => {
      expect(wrapper.find('.cdr-form-error').text()).toBe('false!');
    });
  })

  describe('when error state is inactive', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrFormGroup, {
        propsData: {
          id: '123',
          error: false
        },
        slots: {
          error: 'whoops',
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('does NOT have the expected error class', () => {
      expect(wrapper.find('.cdr-form-group--error').exists()).toBe(false);
    });

    it('does NOT render the element with "cdr-form-error" class', () => {
      expect(wrapper.find('.cdr-form-error').exists()).toBe(false);
    });
  });
});