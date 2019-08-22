
import { CdrIcon } from 'componentsdir/icon/CdrIcon';

export default {
  name: 'IconShrink',
  components: {
    CdrIcon,
  },
  extends: CdrIcon,
  render() {
    return (<cdr-icon {...this.$props}>
      {this.$slots.default}
      <path d="M9.00225906 16.4200001l-4.29515228 4.2866955c-.39052429.3905242-1.02368927.3905242-1.41421356 0-.39052429-.3905243-.39052429-1.0236893 0-1.4142136L7.58225899 15H5.00225906c-.55228475 0-1-.4477153-1-1s.44771525-1 1-1l5.00685464.0000269c.2534637.0018537.506357.0994758.6997475.2928663.2025857.2025858.3000795.4704674.2924812.7359.0002746 4.6883865.000412 4.9647436.000412 4.9712068 0 .5522847-.4477153 1-1 1-.5510577 0-.99801003-.445728-1.00041205-.9963203l.00091671-2.5836796zm5.99723624-8.8404114l4.2951523-4.28669548c.3905243-.39052429 1.0236893-.39052429 1.4142136 0 .3905243.39052429.3905243 1.02368927 0 1.41421356l-4.2893658 4.292482h2.5799999c.5522848 0 1 .44771525 1 1 0 .55228472-.4477152 1.00000002-1 1.00000002l-5.0068546-.0000269c-.2534637-.0018538-.506357-.0994759-.6997475-.2928663-.2025858-.2025858-.3000795-.4704674-.2924812-.73589998C13.0001373 5.28240907 13 5.006052 13 4.99958878c0-.55228475.4477153-1 1-1 .5510577 0 .99801.44572798 1.000412.99632034l-.0009167 2.58367958z"></path>
    </cdr-icon>)
  },
};
