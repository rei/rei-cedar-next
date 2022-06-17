import { shallowMount, mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrButton from '../CdrButton.vue';
import sinon from 'sinon'

describe('CdrButton', () => {
  describe('snapshot test', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrButton);
    })
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  })

  describe('component unit tests', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(CdrButton);
    });

    describe('default component with no configuration', () => {
      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
      it('sets the default type prop correctly', () => {
        expect(wrapper.attributes().type).toBe('button');
      });

      it('does not add icon class when slot is unused', () => {
        expect(wrapper.vm.iconClass).toBe(undefined);
      });
    })

    describe('with prop "type" set to "reset"', () => {
      beforeEach(() => {
        wrapper.setProps({ type: 'reset' });
      });
      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
      it('sets type attr correctly', () => {
        expect(wrapper.attributes().type).toBe('reset');
      });
    })

    describe('when "el" is set to "a"', () => {
      beforeEach(() => {
        wrapper.setProps({ el: 'a' });
      });
      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
      it('computes base class correctly', () => {
        expect(wrapper.classes()).toContain('cdr-button');
      });
    })

    describe('when "iconOnly" is set to true and size is "large"', () => {
      beforeEach(() => {
        wrapper.setProps({
          size: 'large',
          iconOnly: true,
        });
      });
      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
      it('adds custom size class', () => {
        expect(wrapper.vm.sizeClass).toBe('cdr-button--icon-only-large');
      });
    })

    describe('when "iconOnly" and "withBackground" is set to true', () => {
      beforeEach(() => {
        wrapper.setProps({
          iconOnly: true,
          withBackground: true,
        });
      });
      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
      it('adds class for icon only', () => {
        expect(wrapper.classes()).toContain('cdr-button--icon-only');
      });

      it('adds class for icon background', () => {
        expect(wrapper.classes()).toContain('cdr-button--with-background');
      });
    })

    describe('with tag prop set to "a"', () => {
      beforeEach(() => {
        wrapper.setProps({ tag: 'a' });
      });
      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
      it('renders a link', () => {
        expect(wrapper.element.tagName).toBe('A');
      });
    })

    describe('with a function passed to the onClick attribute', () => {
      let spy;
      beforeEach(() => {
        spy = sinon.spy();
        wrapper = shallowMount(CdrButton, {
          attrs: {
            onClick: spy
          },
        });
        wrapper.trigger('click');
      });
      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
      it('the function is called', () => {
        expect(spy.calledOnce).toBeTruthy();
      });
    })



    describe('with an icon-left slot', () => {
      beforeEach(() => {
        wrapper = shallowMount(CdrButton, {
          slots: {
            default: ['default slot for text'],
            'icon-left': '<div />',
          },
        });
      });
      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
      it('adds the "cdr-button--has-icon-left" class', ()=>{
        expect(wrapper.classes()).toContain('cdr-button--has-icon-left');
      })
    });

    describe('with an icon-left slot', () => {
      beforeEach(() => {
        wrapper = shallowMount(CdrButton, {
          slots: {
            default: ['default slot for text'],
            'icon-right': '<div />',
          },
        });
      });
      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
      it('adds the "cdr-button--has-icon-right" class', ()=>{
        expect(wrapper.classes()).toContain('cdr-button--has-icon-right');
      })
    });
  });
});