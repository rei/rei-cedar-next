
import CdrIcon from '../CdrIcon';

export default {
  name: 'IconPrint',
  components: {
    CdrIcon,
  },
  extends: CdrIcon,
  render() {
    return (<cdr-icon {...{props: this.$props} }>
      {this.$slots.default}
      <path d="M3 17c-.55228475 0-1-.4477153-1-1V9c0-.55228475.44771525-1 1-1h4V5c0-.55228475.44771525-1 1-1h8c.5522847 0 1 .44771525 1 1v3h4c.5522847 0 1 .44771525 1 1v7c0 .5522847-.4477153 1-1 1h-3l.5612574 1.6837722c.1746478.5239434-.1085122 1.0902633-.6324555 1.2649111A1.00000098 1.00000098 0 0 1 17.6125741 20H6.38742589c-.55228475 0-1-.4477153-1-1 0-.1074821.01732788-.2142613.0513167-.3162278L6 17H3zm14.3333333-2H20v-5H4v5h2.66666667l.10540925-.3162278C6.90818997 14.2754301 7.29032881 14 7.72075922 14h8.55848158c.4304304 0 .8125692.2754301.9486833.6837722L17.3333333 15zM8.5 8h7V5.5h-7V8zM7.26999998 18.5h9.45999952l-.67-3H7.94000006l-.67000008 3zM17.75 13.5c-.6903559 0-1.25-.5596441-1.25-1.25S17.0596441 11 17.75 11s1.25.5596441 1.25 1.25-.5596441 1.25-1.25 1.25z"></path>
    </cdr-icon>)
  },
};
