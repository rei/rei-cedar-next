import { shallowMount, mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrAccordion from '../CdrAccordion.vue';

const baseComponentPattern = {
  propsData: {
    id: 'test',
    level: '2',
  },
  slots: {
    default: 'This is some slot text.',
    label: 'label',
  },
}

describe('CdrAccordion', () => {
  describe('component snapshot when wrapped', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(CdrAccordion, { ...baseComponentPattern });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot()
    });
  })

  describe('component snapshot when unwrapped', () => {
    let wrapper;

    beforeEach(() => {
      const unwrappedComponent = {
        ...baseComponentPattern,
        global: {
          provide: {
            unwrap: {
              isUnwrapped: {
                value: true
              }
            }
          },
        }
      }
      wrapper = mount(CdrAccordion, unwrappedComponent);
    });
    it('renders correctly', async () => {
      expect(wrapper.element).toMatchSnapshot()
    });
  })

  describe('component unit tests', () => {
    let wrapper;
    let button;
    let contentArea;
    beforeEach(() => {
      wrapper = shallowMount(CdrAccordion, { ...baseComponentPattern });
      button = wrapper.find('#test');
      contentArea = wrapper.find('.cdr-accordion__content');
    })
    describe('when the accordion is closed', () => {
      it('sets maxHeight to be 0', () => {
        expect(wrapper.vm.maxHeight).toBe(0);
      });

      it('sets the "isOpenClass" computed prop to "cdr-accordion--closed" ', async () => {
        expect(wrapper.vm.isOpenClass).toEqual('cdr-accordion--closed');
      });
      describe('when an accordion button receives focus', () => {
        beforeEach(() => {
          button.trigger('focus');
        })
        it('should be focused', ()=>{
          expect(wrapper.vm.focused).toBeTruthy();
        })
        it('should have the proper focus class', ()=>{
          expect(wrapper.classes()).toContain('cdr-accordion--focused');
        })
        describe('when an accordion button receives focus', () => {
          beforeEach(() => {
            button.trigger('blur');
          });
          it('should NOT be focused', ()=>{
            expect(wrapper.vm.focused).toBeFalsy();
          })
          it('should NOT have the proper focus class', ()=>{
            expect(wrapper.classes()).not.toContain('cdr-accordion--focused');
          })
        });
      })
      describe('a11y requirements', () => {
        it('contains the "js-cdr-accordion-button" class', () => {
          expect(button.classes()).toContain('js-cdr-accordion-button');
        });

        it('has the expected "aria-expanded" value', () => {
          expect(button.attributes('aria-expanded')).toBe('false');
        });

        it('has the expected "aria-hidden" value for the content area', () => {
          expect(contentArea.attributes('aria-hidden')).toBe('true');
        });

        it('has the expected "aria-controls: value', () => {
          expect(button.attributes('aria-controls')).toBe(`${wrapper.vm.id}-collapsible`);
        });
      })
    })

    describe('when the accordion is open', () => {
      beforeEach(async() => {
        button.trigger('click');
        wrapper.setProps({ opened: true }); // fake the opening logic
        //TODO: e2e test where clicks work as expected. These could be visual regression tests where we check the visual appearance of the open state
      })
      it('updates maxHeight on prop update', (done) => {
        setTimeout(()=>{
          expect(wrapper.vm.maxHeight).toBe('none');
          done();
        }, 500)
      });

      it('sets the "isOpenClass" computed prop to "cdr-accordion--open" ', () => {
        expect(wrapper.vm.isOpenClass).toEqual('cdr-accordion--open');
      });

      it('emits an "accordion-toggle" event', () => {
        expect(wrapper.emitted('accordion-toggle'));
      });
      describe('a11y requirements', () => {
        it('has the expected "aria-expanded" value', () => {
          expect(button.attributes('aria-expanded')).toBe('true');
        });

        it('has the expected "aria-hidden" value for the content area', () => {
          expect(contentArea.attributes('aria-hidden')).toBe('false');
        });
      })
    })
    describe('when contentSpacing is set to false', () => {
      beforeEach(() =>{
        wrapper.setProps({
          contentSpacing: false,
        });
      })
      it('applies the  "cdr-accordion--no-spacing" class', ()=>{
        expect(wrapper.classes()).toContain('cdr-accordion--no-spacing');

      })
    })

    describe('when compact and borderAligned props are true', () => {
      beforeEach(() =>{
        wrapper.setProps({
          compact: true,
          borderAligned: true,
        });
      })
      it('applies the "compact" class', ()=>{
        expect(wrapper.classes()).toContain('cdr-accordion--compact');
      });
      it('applies the "border-aligned" class', ()=>{
        expect(wrapper.classes()).toContain('cdr-accordion--border-aligned');
      });
    })
  })
});