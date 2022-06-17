import { shallowMount, mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrImg from '../CdrImg.vue';
import sinon from 'sinon';

describe('CdrImg', () => {
  describe('with just the alt text set', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrImg, {
        propsData: {
          src: '/src/dev/static/cedar-350x150.jpg',
          alt: 'test alt',
        }
      });
    })

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('sets the alt attr correctly', () => {
      expect(wrapper.attributes().alt).toBe('test alt');
    });
  })

  describe('when crop and ratio is set', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrImg, {
        propsData: {
          ratio: "square",
          cover: true,
          crop: "left",
          alt: "crop left",
          src: "/src/dev/static/cedar-1920x1080.jpg",
        }
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('a media frame', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(CdrImg, {
        propsData: {
          src: '/src/dev/static/cedar-350x150.jpg',
          ratio: 'square',
          alt: 'test alt',
        }
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('sets the alt attr correctly', () => {
      expect(wrapper.find('img').attributes().alt).toBe('test alt');
    });
  });

  describe('when arbitrary HTML attrs are passed', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrImg, {
        propsData: {
          src: '/src/dev/static/cedar-350x150.jpg',
          loading: 'lazy',
          ratio: 'square'
        }
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('the arbitrary attrs are passed to the img element', () => {
      expect(wrapper.find('img').attributes()['loading']).toBe('lazy');
    });
  });

  describe('', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = sinon.spy();
      wrapper = shallowMount(CdrImg, {
        propsData: {
          src: 'localhost:8000/nothing-to-see-here.png',
          onError: spy,
        }
      });
      wrapper.find('img').trigger('error');
    });

    it('emits error event for default image', () => {
      expect(spy.calledOnce).toBeTruthy();
    })
  });

  describe('image with auto ratio', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(CdrImg, {
        propsData: {
          src: 'localhost:8000/nothing-to-see-here.png',
          ratio: 'auto',
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('has the expected ratio object value', () => {
      expect(wrapper.vm.ratioObject['--ratio']).toBe('0');
    });
  });


  describe('image with 3-2 ratio', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = sinon.spy();
      wrapper = shallowMount(CdrImg, {
        propsData: {
          src: 'localhost:8000/nothing-to-see-here.png',
          ratio: '3-2',
          onError: spy
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('has the expected ratio object value', () => {
      expect(wrapper.vm.ratioObject['--ratio']).toBe('66.66666666666666%');
    });

    it('emits error event for ratio image', () => {
      wrapper.find('img').trigger('error');
      expect(spy.calledOnce).toBeTruthy();
    })
  });
});
