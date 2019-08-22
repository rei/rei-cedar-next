
import { CdrIcon } from 'componentsdir/icon/CdrIcon';

export default {
  name: 'IconXStroke',
  components: {
    CdrIcon,
  },
  extends: CdrIcon,
  render() {
    return (<cdr-icon {...this.$props}>
      {this.$slots.default}
      <path d="M12 22C6.4771525 22 2 17.5228475 2 12S6.4771525 2 12 2s10 4.4771525 10 10-4.4771525 10-10 10zm0-2c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8zm1.4061423-7.9978124l3.2972044-3.29508082c.3905243-.39052429.3905243-1.02368927 0-1.41421356-.3905243-.39052429-1.0236893-.39052429-1.4142136 0l-3.2968194 3.29469608-3.28520692-3.29469608c-.39052429-.39052429-1.02368927-.39052429-1.41421356 0-.39052429.39052429-.39052429 1.02368927 0 1.41421356L10.5777154 12.001418l-3.28482218 3.2886202c-.39052429.3905243-.39052429 1.0236893 0 1.4142136.39052429.3905243 1.02368927.3905243 1.41421356 0l3.28443732-3.2882356 3.297589 3.2882356c.3905243.3905243 1.0236893.3905243 1.4142136 0 .3905243-.3905243.3905243-1.0236893 0-1.4142136l-3.2972044-3.2878506z"></path>
    </cdr-icon>)
  },
};
