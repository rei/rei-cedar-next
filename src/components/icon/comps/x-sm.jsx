
import { CdrIcon } from '../CdrIcon';

export default {
  name: 'IconXSm',
  components: {
    CdrIcon,
  },
  extends: CdrIcon,
  render() {
    return (<cdr-icon {...this.$props}>
      {this.$slots.default}
      <path d="M13.4061423 12.0055575l3.2972044-3.29508076c.3905243-.3905243.3905243-1.02368927 0-1.41421357-.3905243-.39052429-1.0236893-.39052429-1.4142136 0l-3.2968194 3.29469613-3.28520692-3.29469613c-.39052429-.39052429-1.02368927-.39052429-1.41421356 0-.39052429.3905243-.39052429 1.02368927 0 1.41421357l3.28482218 3.29431116-3.28482218 3.2886203c-.39052429.3905243-.39052429 1.0236893 0 1.4142136.39052429.3905242 1.02368927.3905242 1.41421356 0l3.28443732-3.2882356 3.297589 3.2882356c.3905243.3905242 1.0236893.3905242 1.4142136 0 .3905243-.3905243.3905243-1.0236893 0-1.4142136l-3.2972044-3.2878507z"></path>
    </cdr-icon>)
  },
};