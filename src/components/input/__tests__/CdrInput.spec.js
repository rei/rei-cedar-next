import { mount } from '../../../../test/vue-jest-style-workaround.js';
import sinon from 'sinon';
import { h } from '@vue/runtime-core';
import CdrInput from '../CdrInput.vue';
import CdrButton from '../../button/CdrButton.vue';

const baseComponentPattern = {
  propsData: {
    label: 'Label Test',
    id: 'renders',
  }
}

describe('CdrInput', () => {
  describe('basic input component', () => {
    let wrapper;
    let input;
    beforeEach(() => {
      wrapper = mount(CdrInput, { ...baseComponentPattern });
      input = wrapper.find('input');
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders an input element', () => {
      expect(input.element.tagName).toBe('INPUT');
    });

    it('sets default input type correctly', () => {
      expect(input.attributes('type')).toBe('text');
    });

    it('does not apply aria-describedby if attr or helper slots are not present', () => {
      expect(input.attributes('aria-describedby')).toBe(undefined);
    });

    it('emits an input event', () => {
      input.setValue('foo');
      expect(wrapper.emitted()['update:modelValue'][0][0]).toBe('foo');
    });
    
    describe('with prop type of "number"', () => {
      beforeEach(() => {
        wrapper.setProps({ type: 'number' })
      });

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });


      it('has a inputmode attribute of "numeric"', () => {
        expect(input.attributes('inputmode')).toBe('numeric');
      });
    });

    describe('with error prop set', () => {
      beforeEach(() => {
        wrapper.setProps({ error: 'Something is wrong!' })
      });

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    describe('with the "disabled" prop set to true', () => {
      beforeEach(() => {
        wrapper.setProps({ disabled: true })
      });

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('sets input disabled attribute correctly', () => {
        expect(input.attributes('disabled')).toBe('');
      });
    });

    describe('with the "required" prop set to true', () => {
      beforeEach(() => {
        wrapper.setProps({ required: true })
      });

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('sets input disabled attribute correctly', () => {
        expect(input.attributes('aria-required')).toBe('true');
      });
    });

    describe('with prop "type" set to "number"', () => {
      beforeEach(() => {
        wrapper.setProps({
          required: true,
          type: 'number',
        })
      });

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('sets the expected attributes', () => {
        expect(wrapper.find('input').attributes('novalidate')).toBe('');
        expect(wrapper.find('input').attributes('pattern')).toBe('[0-9]*');
        expect(wrapper.find('input').attributes('inputmode')).toBe('numeric');
        expect(wrapper.find('input').attributes('type')).toBe('number');
      });
    });

    describe('with prop "numeric" set to true', () => {
      beforeEach(() => {
        wrapper.setProps({
          required: true,
          numeric: true,
        })
      });

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('sets the expected attributes', () => {
        expect(wrapper.find('input').attributes('novalidate')).toBe('');
        expect(wrapper.find('input').attributes('pattern')).toBe('[0-9]*');
        expect(wrapper.find('input').attributes('inputmode')).toBe('numeric');
        expect(wrapper.find('input').attributes('type')).toBe('text');
      });
    });

    describe('with the "rows" prop set to 2', () => {
      beforeEach(() => {
        wrapper.setProps({ rows: 2 })
      });

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('sets multiline to textarea correctly', () => {
        expect(wrapper.find('textarea').element.tagName).toBe('TEXTAREA');
      });
    });

    describe('when "multiline" is set to true and the "rows" prop is set to 10', () => {
      beforeEach(() => {
        wrapper.setProps({
          multiLine: true,
          rows: 10
        })
      });

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('sets multiline rows correctly', () => {
        expect(wrapper.find('textarea').attributes('rows')).toBe('10');
      });
    });

    describe('when "type" is set to url', () => {
      beforeEach(() => {
        wrapper.setProps({ type: 'url' })
      });

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('overrides input type correctly', () => {
        expect(wrapper.find('.cdr-input').attributes('type')).toBe('url');
      });
    });

    describe('with error prop set', () => {
      beforeEach(() => {
        wrapper.setProps({ error: 'incorrect!' })
      });

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('renders text when passed as error', () => {
        expect(wrapper.find('.cdr-form-error').text()).toBe('incorrect!');
      });
    });
  });

  describe('components with attributes', () => {
    let wrapper;
    let input;
    let blurSpy;
    let pasteSpy;
    let keydownSpy;
    let focusSpy;
    beforeEach(() => {
      blurSpy = sinon.spy();
      pasteSpy = sinon.spy();
      keydownSpy = sinon.spy();
      focusSpy = sinon.spy();
      wrapper = mount(CdrInput, {
        propsData: {
          label: 'Label Test',
          id: 'test'
        },
        attrs: {
          pizza: 'time',
          name: 'testName',
          readonly: true,
          autofocus: true,
          maxlength: '20',
          placeholder: 'test placeholder',
          onBlur: blurSpy,
          onPaste: pasteSpy,
          onKeydown: keydownSpy,
          onFocus: focusSpy
        }
      });
      input = wrapper.find('.cdr-input');
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('passes all attributes to input element', () => {
      expect(input.attributes('pizza')).toBe('time');
      expect(input.attributes('name')).toBe('testName');
      expect(input.attributes('readonly')).toBe('');
      expect(input.attributes('autofocus')).toBe('');
      expect(input.attributes('maxlength')).toBe('20');
      expect(input.attributes('placeholder')).toBe('test placeholder');
    });

    it('emits a blur event', () => {
      input.trigger('blur')
      expect(blurSpy.calledOnce).toBeTruthy();
    });

    it('emits a paste event', () => {
      input.trigger('paste')
      expect(pasteSpy.calledOnce).toBeTruthy();
    });

    it('emits a keydown event', () => {
      input.trigger('keydown', { key: 'a' })
      expect(keydownSpy.called).toBeTruthy();
    });

    it('emits a focus event', () => {
      input.trigger('focus')
      expect(focusSpy.calledOnce).toBeTruthy();
    })

    it('adds focused class to wrapper on input focus and removes it on blur', async () => {
      input.trigger('focus')
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.cdr-input--focus').exists()).toBeTruthy();
      input.trigger('blur')
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.cdr-input--focus').exists()).toBeFalsy();
    });
  });

  describe('with "helper-text-bottom" slot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrInput, {
        ...baseComponentPattern,
        slots: { 'helper-text-bottom': 'very helpful' },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders helper-text-bottom slot', () => {
      expect(wrapper.find('.cdr-input__helper-text').text()).toBe('very helpful');
    });
  });

  describe('with a pre-icon slot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrInput, {
        ...baseComponentPattern,
        slots: { 'pre-icon': '🤠' },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders pre-icon slot', () => {
      expect(wrapper.find('.cdr-input__pre-icon').text()).toBe('🤠');
    });
  });

  describe('with a post-icon slot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrInput, {
        ...baseComponentPattern,
        slots: { 'post-icon': '😎' },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders post-icon slot', () => {
      expect(wrapper.find('.cdr-input__post-icon').text()).toBe('😎');
    });

    it('adds spacing class when post-icon slot is present', () => {
      expect(wrapper.find('.cdr-input--posticon').exists()).toBe(true);
    });
  });

  describe('when multiple elements are present in post-icon slot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrInput, {
        ...baseComponentPattern,
        slots: {
          'post-icon': () => [
            h(CdrButton),
            h(CdrButton)
          ],
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('adds spacing class', () => {
      expect(wrapper.find('.cdr-input--posticons').exists()).toBe(true);
    });
  });

  describe('with info action slot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrInput, {
        ...baseComponentPattern,
        slots: { 'info-action': '🤠' },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders info action slot', () => {
      expect(wrapper.find('.cdr-label-standalone__info-action').text()).toBe('🤠');
    });
  });

  describe('when error state is active', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrInput, {
        propsData: {
          id: 'test',
          label: 'test',
          error: true
        },
        slots: { 'error': 'whoops' },
      })
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders error slot', () => {
      expect(wrapper.find('.cdr-form-error').text()).toBe('whoops');
    });
  });

  describe(' when error state is inactive', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrInput, {
        propsData: {
          id: 'test',
          label: 'test',
          error: false
        },
        slots: { 'error': 'whoops' },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('does not render error slot', () => {
      expect(wrapper.find('.cdr-form-error').exists()).toBe(false);
    });
  });

  describe('when error is active and a helper-bottom-text slot has been passed', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrInput, {
        propsData: {
          id: 'test',
          label: 'test',
          error: true,
        },
        slots: {
          'error': 'whoops',
          'helper-text-bottom': 'not me'
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders error slot instead of bottom helper slot', () => {
      expect(wrapper.find('.cdr-form-error').text()).toBe('whoops');
      expect(wrapper.find('.cdr-input__helper-text-bottom').exists()).toBe(false);
    });
  });

  describe('with both helper-text-top and helper-text-bottom slots', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrInput, {
        propsData: {
          label: 'test',
          id: 'aria-test',
        },
        slots: {
          'helper-text-top': 'extremely helpful',
          'helper-text-bottom': 'very helpful',
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('helper text slots are linked to input via aria-describedby', () => {
      expect(wrapper.find('input').attributes('aria-describedby')).toBe('aria-test-helper-text-top aria-test-helper-text-bottom');
    });
  });

  describe('with both helper-text-top and helper-text-bottom slots and aria-describedby set', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrInput, {
        propsData: {
          label: 'test',
          id: 'aria-test',
        },
        attrs: {
          'aria-describedby': 'foo',
        },
        slots: {
          'helper-text-top': 'extremely helpful',
          'helper-text-bottom': 'very helpful',
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('dynamic aria-describedby is merged with native attr', () => {
      expect(wrapper.find('input').attributes('aria-describedby')).toBe('aria-test-helper-text-top aria-test-helper-text-bottom foo');
    });
  });
});
