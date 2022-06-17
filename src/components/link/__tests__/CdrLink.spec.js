import { shallowMount, mount } from '../../../../test/vue-jest-style-workaround.js';
import sinon from 'sinon';
import CdrLink from '../CdrLink.vue';

describe('CdrLink', () => {
  describe('basic link component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrLink);
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('computes the base class correctly', () => {
      expect(wrapper.classes()).toContain('cdr-link');
    });

    describe('when target prop is set', () => {
      beforeEach(() => {
        wrapper.setProps({ target: '_self' })
      });

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('sets target attr correctly', () => {
        expect(wrapper.attributes().target).toBe('_self');
      });
    });

    describe('with href prop set', () => {
      beforeEach(() => {
        wrapper.setProps({ href: 'www.rei.com' })
      });

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('sets a default href', () => {
        expect(wrapper.attributes().href).toBe('www.rei.com');
      });
    });

    describe('with rel prop set to "nofollow"', () => {
      beforeEach(() => {
        wrapper.setProps({ rel: 'nofollow' })
      });

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('sets rel attr correctly', () => {
        expect(wrapper.attributes().rel).toBe('nofollow');
      });
    });

    describe('when the target prop has been set to "_blank"', () => {
      beforeEach(() => {
        wrapper.setProps({ target: '_blank' })
      });

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('computes target="_blank" rel attr correctly', () => {
        expect(wrapper.attributes().rel).toBe('noopener noreferrer');
      });
    });

    describe('with standalone modifier set', () => {
      beforeEach(() => {
        wrapper.setProps({ modifier: 'standalone' })
      });

      it('computes classes correctly for standalone modifier', () => {
        expect(wrapper.classes()).toContain('cdr-link--standalone');
      });
    });

    describe('when the tag has been set to button', () => {
      beforeEach(() => {
        wrapper.setProps({ tag: 'button' })
      });

      it('renders a link with a button element and no href attribute', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    describe('when tag has been set to button', ()=>{
     let wrapper;
     let spy; 

      beforeEach(()=>{
        spy = sinon.spy();
        wrapper = shallowMount(CdrLink, {
          propsData: {
            tag: 'button',
          },
          attrs: {
            onClick: spy
          },
        });
      });

      it('renders a link with a button element and no href attribute', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('emits a click', () => {
        wrapper.trigger('click');
        expect(spy.called).toBeTruthy();
      });
    });
  });
});
