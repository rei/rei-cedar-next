import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrLabelStandalone from '../CdrLabelStandalone.vue';

describe('CdrFormLabelStandalone', () => {
  describe('component with label, forId, required and helper/info slots', ()=>{
    let wrapper;
    beforeEach(()=>{
      wrapper = mount(CdrLabelStandalone, {
        propsData: {
          label: 'Label Test',
          forId: 'test',
          required: true,
        },
        slots: {
          helper: 'very helpful',
          info: 'very informative',
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders a label element', () => {
      expect(wrapper.find('.cdr-label-standalone__label').text()).toBe('Label Test *');
    });

    it('maps input id to label for correctly', () => {
      expect(wrapper.find('.cdr-label-standalone__label').attributes('for')).toBe('test');
    });

    it('renders required label', () => {
      expect(wrapper.find('.cdr-label-standalone__label').text()).toContain('*');
    });

    it('renders helper slot', () => {
      expect(wrapper.find('.cdr-label-standalone__helper').text()).toBe('very helpful');
    });

    it('renders break between label and helper if both are present', () => {
      expect(wrapper.find('br').exists()).toBe(true);
    });

    it('renders info slot', () => {
      expect(wrapper.find('.cdr-label-standalone__info').text()).toBe('very informative');
    });
  });

  describe('component with hideLabel', ()=>{
    let wrapper;
    beforeEach(()=>{
      wrapper = mount(CdrLabelStandalone, {
        propsData: {
          label: 'Label Test',
          forId: 'test',
          hideLabel: true,
        },
        slots: {
          'helper': 'very helpful',
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders label as sr-only', () => {
      expect(wrapper.find('label').classes()).toContain('cdr-label-standalone__label--sr-only');
    });

    it('does not render break between label and helper if label is hidden', () => {
      expect(wrapper.find('br').exists()).toBe(false);
    });
  });
  describe('component with both required and optional labels', ()=>{
    let wrapper;
    beforeEach(()=>{
      wrapper = mount(CdrLabelStandalone, {
        propsData: {
          label: 'test',
          required: true,
          optional: true,
          forId: 'test',
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('does not render both required and optional labels simultaneously', () => {
      expect(wrapper.find('.cdr-label-standalone__label').text()).toBe('test *');
    });
  });

  describe('component with optional label', ()=>{
    let wrapper;
    beforeEach(()=>{
      wrapper = mount(CdrLabelStandalone, {
        propsData: {
          label: 'test',
          optional: true,
          forId: 'test',
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders optional messaging', () => {
      expect(wrapper.find('.cdr-label-standalone__label').text()).toBe('test (optional)');
    });
  });
});
