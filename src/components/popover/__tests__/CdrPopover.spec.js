import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrPopover from '../CdrPopover.vue';

describe('CdrPopover', () => {

  describe('', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrPopover, {
        propsData: {
          id: 'popover-test',
        },
        slots: {
          trigger: '<button id="popover-trigger"></button>',
          default: 'popover content',
        }
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('emits event when opened', () => {
      wrapper.vm.openPopover(true);

      expect(wrapper.emitted('opened')).toBeTruthy();
    });

    it('emits event when closed', () => {
      wrapper.vm.closePopover(true);

      expect(wrapper.emitted('closed')).toBeTruthy();
    });

    it('sets aria properties on trigger', () => {
      expect(wrapper.find('#popover-trigger').attributes('aria-controls')).toBe('popover-test');
    });

    it('sets aria expanded to false by default', () => {
      expect(wrapper.find('#popover-test').attributes('aria-expanded')).toBe('false');
    });

    describe('after clicking the popover trigger', () => {
      beforeEach(() => {
        wrapper.find('#popover-trigger').trigger('click');
      });

      it('sets aria expanded on popup', () => {
        expect(wrapper.find('#popover-test').attributes('aria-expanded')).toBe('true');
      });
    });

    describe('when contentClass has been set', ()=>{
      beforeEach(()=>{
        wrapper.setProps({ contentClass: 'popover-override'})
      });

      it('binds the contentClass to content', () => {
        expect(wrapper.find('.popover-override').exists()).toBe(true);
      });
    });
  });


});
