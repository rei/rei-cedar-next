import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrBreadcrumb from '../CdrBreadcrumb.vue';

const itemsA = [
  {
    item: {
      url: 'http://google.com',
      name: 'Longer Breadcrumb List Step 1',
    },
  },
  {
    item: {
      url: 'http://rei.com',
      name: 'Longer Breadcrumb Step 2',
    },
  },
  {
    item: {
      url: 'http://yahoo.com',
      name: 'Longer Breadcrumb Step 3',
    },
  },
];

const itemsB = [
  {
    item: {
      url: 'http://google.com',
      name: 'Shorter Breadcrumb List Step 1',
    },
  },
  {
    item: {
      url: 'http://rei.com',
      name: 'Shorter Breadcrumb List Step 2',
    },
  },
];

const itemsB2 = [
  {
    item: {
      url: 'http://google.com',
      name: 'Breadcrumb Extension Step 3',
    },
  },
  {
    item: {
      url: 'http://rei.com',
      name: 'Breadcrumb Extension Step 4',
    },
  },
];

describe('CdrBreadcrumb', () => {
  describe('with 3 or more breadcrumb items', () => {
    let wrapper;
    let ellipse;
    beforeEach(() => {
      wrapper = mount(CdrBreadcrumb, {
        propsData: {
          id: 'bc-test',
          items: itemsA
        },
        attachTo: document.body
      })
      ellipse = wrapper.find('.cdr-breadcrumb__ellipses');
    })
    it('renders correctly', async () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should truncate with 3 or more items', async () => {
      expect(wrapper.find('.cdr-breadcrumb__ellipses').exists()).toBe(true);
    });

    describe('a11y requirements', () => {
      it('the breadcrumb is a "NAV" element', () => {
        expect(wrapper.element.tagName).toBe('NAV');
      });

      it('the breadcrumb nav has the expected "aria-label" value', () => {
        expect(wrapper.attributes()['aria-label']).toBe('breadcrumbs');
      });

      it('the ellipse button has the expected "aria-label" value', () => {
        expect(ellipse.attributes()['aria-label']).toBe('show 1 more navigation level');
      });

      it('the ellipse button has the expected "aria-controls" value', () => {
        expect(ellipse.attributes()['aria-controls']).toBe('bc-testList');
      });

      it('the ellipse button has the expected "aria-expanded" value', () => {
        expect(ellipse.attributes()['aria-expanded']).toBe('false');
      });
    })

    describe('when truncated breadcrumb items list has been expanded', () => {
      beforeEach(() => {
        wrapper.find('.cdr-breadcrumb__ellipses').trigger('click');
      });

      it('is no longer truncated', () => {
        expect(wrapper.find('.cdr-breadcrumb__ellipses').exists()).toBeFalsy();
      });

      it('applies focus to first breadcrumb on ellipsis click', ()=>{
        expect(document.activeElement.textContent).toBe('Longer Breadcrumb List Step 1')
      })
    })
  });

  describe('when there is fewer than 3 items', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrBreadcrumb, {
        propsData: {
          id: 'bc-test',
          items: itemsB,
        }
      });
    });
    it('is not truncated', () => {
      expect(wrapper.find('.cdr-breadcrumb__ellipses').exists()).toBe(false);
    });

    it('breadcrumb should evaluate truncation when items are updated', async () => {
      expect(wrapper.find('.cdr-breadcrumb__ellipses').exists()).toBe(false);
      await wrapper.setProps({ items: itemsB.concat(itemsB2) });
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.cdr-breadcrumb__ellipses').exists()).toBe(true);
    });
  })
});