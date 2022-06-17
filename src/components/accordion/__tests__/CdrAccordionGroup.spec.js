import { shallowMount, mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrAccordionGroup from '../CdrAccordionGroup.vue';
import CdrAccordion from '../CdrAccordion.vue';
import { h } from '@vue/runtime-core';

describe('CdrAccordionGroup', () => {
  let wrapper;

  describe('component snapshot when mounted', () => {
    beforeEach(()=>{
      wrapper = mount(h(CdrAccordionGroup, {}, {default: () => [
        h(CdrAccordion, {id: 'tab1', level: '2', label: 'label1'}),
        h(CdrAccordion, {id: 'tab2', level: '2', label: 'label2'}),
      ]}));
    })

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot()
    });  
  });

  describe('component snapshot when mounted unwrapped', () => {
    let wrapper;
    let buttons;
    beforeEach(()=>{
      wrapper = mount(h(CdrAccordionGroup, { unwrap: true }, {default: () => [
        h(CdrAccordion, {id: 'tab1', level: '2', label: 'label1'}),
        h(CdrAccordion, {id: 'tab2', level: '2', label: 'label2'}),
        h(CdrAccordion, {id: 'tab3', level: '2', label: 'label3'}),
      ]}));
      buttons = wrapper.vm.accordionButtons;
    })

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot()
    });
  });

  describe('component unit tests', () => {
    let wrapper;
    beforeEach(()=>{
      wrapper = mount(h(CdrAccordionGroup, { unwrap: true }, {default: () => [
        h(CdrAccordion, {id: 'tab1', level: '2', label: 'label1'}),
        h(CdrAccordion, {id: 'tab2', level: '2', label: 'label2'}),
        h(CdrAccordion, {id: 'tab3', level: '2', label: 'label3'}),
      ]}));
    })

    describe('a11y requirements', ()=>{
      it('accordion groups are organized into unordered lists', ()=>{
        expect(wrapper.element.tagName).toBe('UL');
      })
    });
  });

  //TODO: Since the keyboard interaction tests don't work here, we may want write new e2e tests to ensure keyboard interactions work

  // it('has correct a11y', async () => {
  //   const elem = document.createElement('div')
  //   if (document.body) {
  //     document.body.appendChild(elem)
  //   }
  //     attachTo: elem,

  //   const wrapper = mount(h(CdrAccordionGroup, { unwrap: true }, {default: () => [
  //     h(CdrAccordion, {id: 'tab1', level: '2', label: 'label1'}),
  //     h(CdrAccordion, {id: 'tab2', level: '2', label: 'label2'}),
  //     h(CdrAccordion, {id: 'tab3', level: '2', label: 'label3'}),
  //   ]}));

  //   /* keyboard nav tests
  //     `focusin` doesn't fire outside of the browser environment so it's faked by just doing the logic
  //     manually instead with setData. The proper focus logic is still checked via document.activeElement
  //   */
  //   const buttons = wrapper.vm.accordionButtons;
  //   // Up (first to last)
  //   wrapper.trigger('keydown', { key: 'ArrowUp' });
  //   wrapper.setData({ currentIdx: 2 });
  //   await wrapper.vm.$nextTick();
  //   expect(buttons[2]).toBe(document.activeElement);
  //   // Down (last to first)
  //   wrapper.trigger('keydown', { key: 'ArrowDown' });
  //   wrapper.setData({ currentIdx: 0 });
  //   await wrapper.vm.$nextTick();
  //   expect(buttons[0]).toBe(document.activeElement);
  //   // Down
  //   wrapper.trigger('keydown', { key: 'ArrowDown' });
  //   wrapper.setData({ currentIdx: 1 });
  //   await wrapper.vm.$nextTick();
  //   expect(buttons[1]).toBe(document.activeElement);
  //   // Up
  //   wrapper.trigger('keydown', { key: 'ArrowUp' });
  //   wrapper.setData({ currentIdx: 0 });
  //   await wrapper.vm.$nextTick();
  //   expect(buttons[0]).toBe(document.activeElement);
  //   // End
  //   wrapper.trigger('keydown', { key: 'End' });
  //   wrapper.setData({ currentIdx: 2 });
  //   await wrapper.vm.$nextTick();
  //   expect(buttons[2]).toBe(document.activeElement);
  //   // Home
  //   wrapper.trigger('keydown', { key: 'Home' });
  //   wrapper.setData({ currentIdx: 0 });
  //   await wrapper.vm.$nextTick();
  //   expect(buttons[0]).toBe(document.activeElement);
  //   wrapper.destroy();
  // });
});
