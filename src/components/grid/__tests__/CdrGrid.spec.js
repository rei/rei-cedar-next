import { h } from 'vue'
import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrGrid from '../CdrGrid.vue';


describe('CdrGrid', () => {
  describe('simple grid', ()=>{
    let wrapper;
    beforeEach(()=>{
      wrapper = mount(CdrGrid, {
        slots: {
          // TODO: plain HTML in VTU slots raise a warning for "Property undefined was accessed during render but is not defined on instance."
          default: h('div', 'griddy'),
        }
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  })

  describe('complex grid example', ()=>{
    let wrapper;
    beforeEach(()=>{
      wrapper = mount(CdrGrid, {
      propsData: {
        gutter: 'none@xs large@sm medium@md small@sm',
        tag: 'ul'
      },
      slots: {
        default: h('li', 'list')
      }
    });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  })
});
