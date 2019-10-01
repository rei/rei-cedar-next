
import CdrIcon from '../CdrIcon';

export default {
  name: 'IconFindLocation',
  components: {
    CdrIcon,
  },
  extends: CdrIcon,
  render() {
    return (<cdr-icon {...this.$props}>
      {this.$slots.default}
      <path d="M6 11a1 1 0 0 1 0 2H4.062A8.004 8.004 0 0 0 11 19.938V18a1 1 0 0 1 2 0v1.938A8.004 8.004 0 0 0 19.938 13H18a1 1 0 0 1 0-2h1.938A8.004 8.004 0 0 0 13 4.062V6a1 1 0 0 1-2 0V4.062A8.004 8.004 0 0 0 4.062 11H6zm6 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-8.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z"></path>
    </cdr-icon>)
  },
};
