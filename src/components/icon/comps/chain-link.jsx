
import CdrIcon from '../CdrIcon';

export default {
  name: 'IconChainLink',
  components: {
    CdrIcon,
  },
  extends: CdrIcon,
  render() {
    return (<cdr-icon {...{props: this.$props} }>
      {this.$slots.default}
      <path d="M15.703372 8.29289322c.3905243.39052429.3905243 1.02368927 0 1.41421356L9.70710678 15.703372c-.39052429.3905243-1.02368927.3905243-1.41421356 0-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l5.99626518-5.99626518c.3905243-.39052429 1.0236893-.39052429 1.4142136 0zm-1.1491922 3.98556788l3.8642475-3.86424754c.7810486-.78104858.7810486-2.04737854 0-2.82842712-.7810486-.78104859-2.0473786-.78104859-2.8284271 0l-3.8642475 3.86424749c-.3563705-1.33446717-.011097-2.81733014 1.0358203-3.86424749l1.4142136-1.41421356c1.5620972-1.56209717 4.0947571-1.56209717 5.6568542 0 1.5620972 1.56209716 1.5620972 4.09475708 0 5.65685424l-1.4142135 1.41421358c-1.0469174 1.0469173-2.5297803 1.3921908-3.8642475 1.0358204zm-5.10414587-.5527084l-3.86424749 3.8642475c-.78104859.7810485-.78104859 2.0473785 0 2.8284271.78104858.7810486 2.04737854.7810486 2.82842712 0l3.86424754-3.8642475c.3563704 1.3344672.0110969 2.8173301-1.0358204 3.8642475l-1.41421358 1.4142135c-1.56209716 1.5620972-4.09475708 1.5620972-5.65685424 0-1.56209717-1.5620971-1.56209717-4.094757 0-5.6568542l1.41421356-1.4142136c1.04691735-1.0469173 2.52978032-1.3921908 3.86424749-1.0358203z"></path>
    </cdr-icon>)
  },
};
