import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrSwitch from '../CdrSwitch.vue';

describe('CdrSwitch', () => {
  let wrapper;
  beforeEach(()=>{
    wrapper = mount(CdrSwitch, {
      props: {
        id: 'id-123',
      },
      slots: {
        default: ' <span class="custom-text-style">Pull the lever Kronk!</span>'
      }
    });
  })
  it('matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('has a role of "switch"', () => {
    expect(wrapper.find('button').attributes('role')).toBe('switch');
  });

  it('has an "aria-checked" value of "false"', () => {
    expect(wrapper.find('button').attributes('aria-checked')).toBe('false');
  });

  it('the aria-labelledby attribute references the correct id', () => {
    expect(wrapper.find('button').attributes('aria-labelledby')).toBe('id-123');
  });

  describe('when the "checked" property is set to true', ()=>{
    beforeEach(()=>{
      wrapper.setProps({ checked: true})
    });

    it('matches snapshot', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
    
    it('has an "aria-checked" value of "false"', () => {
      expect(wrapper.find('button').attributes('aria-checked')).toBe('true');
    });
  })
});
