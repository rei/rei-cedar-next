import CdrIcon from '../CdrIcon';
export default {
  name: 'IconKayak',
  components: {
    CdrIcon,
  },
  extends: CdrIcon,
  render() {
    return (<cdr-icon {...{props: this.$props, attrs: this.$attrs} }>
      {this.$slots.default}
      <path role="presentation" d="M6.574 7.955L5.05 7.04a.997.997 0 01-.313-.212L3.322 5.414a1 1 0 010-1.414l.707-.707a1 1 0 011.414 0l1.415 1.414c.088.09.157.19.205.299l.88 1.466L9.017 7.55a17.933 17.933 0 0110.82-4.53.975.975 0 01.264-.015h.027l-.003.003a1 1 0 01.885 1.17 17.847 17.847 0 01-4.526 10.855l1.004 1.007 1.513.907c.114.05.22.12.313.213l1.415 1.414a1 1 0 010 1.414l-.707.707a1 1 0 01-1.415 0l-1.414-1.414a.998.998 0 01-.206-.298l-.878-1.467-1.054-1.056A17.848 17.848 0 014 20.99a1 1 0 01-.958-1.288 17.931 17.931 0 014.55-10.727l-1.018-1.02zm2.743 2.75a3 3 0 003.991 4.003l-3.99-4.002zm1.43-1.423l3.991 4a3 3 0 00-3.992-4zm6.171 1.668a15.816 15.816 0 001.94-5.765 15.88 15.88 0 00-5.73 1.932 5.007 5.007 0 013.79 3.833zm-5.937 5.935a5.007 5.007 0 01-3.835-3.8 15.891 15.891 0 00-1.945 5.74 15.817 15.817 0 005.78-1.94z"></path>
    </cdr-icon>)
  },
};
