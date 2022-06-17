import { shallowMount } from '../../../../test/vue-jest-style-workaround.js';
import CdrContainer from '../CdrContainer.vue';

describe('CdrContainer', () => {
  describe('using the default slot', ()=>{
    let wrapper;
    beforeEach(()=>{
      wrapper = shallowMount(CdrContainer, {
        slots: {
          default: 'foo'
        }
      });
    })

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('has a "cdr-container" class', () => {
      expect(wrapper.classes()).toContain('cdr-container');
    });

    it('has a static class', ()=>{
      expect(wrapper.classes()).toContain('cdr-container--static');
    })
  });

  describe('with "fluid" modifier', ()=>{
    let wrapper;
    beforeEach(()=>{
      wrapper = shallowMount(CdrContainer, {
        props: {
          modifier: 'fluid'
        },
        slots: {
          default: 'foo'
        }
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('has a "cdr-container" class', () => {
      expect(wrapper.classes()).toContain('cdr-container');
    });

    it('has a "cdr-container--fluid" class', () => {
      expect(wrapper.classes()).toContain('cdr-container--fluid');
    });

    it('does NOT have a "cdr-container--static" class', () => {
      expect(wrapper.classes()).not.toContain('cdr-container--static');
    });
  })
});
