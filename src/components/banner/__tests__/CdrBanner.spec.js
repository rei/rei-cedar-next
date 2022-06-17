import { expect } from 'vitest';
import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrBanner from '../CdrBanner.vue';

describe('CdrBanner', () => {
  describe('with icon-left slot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrBanner, {
        slots: {
          default: 'hey im a banner',
          'icon-left': '<div />'
        }
      });
    })
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('with icon-right slot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrBanner, {
        slots: {
          default: 'hey im a banner',
          'icon-left': '<div />',
          'icon-right': '<div />',
        }
      });
    })
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('with info-action slot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrBanner, {
        slots: {
          default: 'hey im a banner',
          'icon-left': '<div />',
          'icon-right': '<div />',
          'info-action': '<div />',
        }
      });
    })
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('with message-body slot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrBanner, {
        slots: {
          default: 'hey im a banner',
          'icon-left': '<div />',
          'message-body': 'and I am some extra information'
        }
      });
    })
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('with just the default slot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrBanner, {
        slots: {
          default: 'hey im a banner',
        }
      });
    })
    describe('with "type" prop set to "info"', () => {
      beforeEach(() => {
        wrapper.setProps({
          type: 'info',
        });
      });

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      })

      it('has the expected typeClass', () => {
        expect(wrapper.vm.typeClass).toBe('cdr-banner--info');
      });
    })
  })
});
