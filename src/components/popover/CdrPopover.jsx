import clsx from 'clsx';
import style from './styles/CdrPopover.scss';
import propValidator from '../../utils/propValidator';
import IconXSm from  '../icon/comps/x-sm';
import CdrText from '../text/CdrText';
import CdrButton from '../button/CdrButton';

export default {
  name: 'CdrPopover',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    arrowDirection: {
      type: String,
      required: false,
      default: 'up',
      validator: (value) => propValidator(
        value,
        ['up', 'down', 'left', 'right'],
      ),
    },
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    IconXSm,
    CdrText,
    CdrButton,
  },
  data() {
    return {
      style,
      lastActive: undefined,
      keyHandler: undefined,
      clickHandler: undefined,
    };
  },
  computed: {
    arrowDirectionClass() {
      return this.arrowDirection ? this.style[`cdr-popover__arrow--${this.arrowDirection}`] : '';
    },
  },
  methods: {
    closePopover(e) {
      this.$emit('closed', e);
    },
    handleKeyDown({ key }) {
      switch (key) {
        case 'Escape':
        case 'Esc':
          this.closePopover();
          break;
        default: break;
      }
    },
    handleClick({ target }) {
      if (target !== this.$refs.popover && !this.$refs.popover.contains(target)) {
        this.closePopover();
      }
    },
    addHandlers() {
      this.keyHandler = this.handleKeyDown.bind(this);
      document.addEventListener('keydown', this.keyHandler);
      this.clickHandler = this.handleClick.bind(this);
      document.addEventListener('click', this.clickHandler);
    },
    handleOpened() {
      const { activeElement } = document;

      this.lastActive = activeElement;
      setTimeout(() => {
        this.addHandlers();
      }, 1);
    },
    handleClosed() {
      document.removeEventListener('keydown', this.keyHandler);
      document.removeEventListener('click', this.clickHandler);
      if (this.lastActive) this.lastActive.focus();
    },
  },
  watch: {
    open(newValue, oldValue) {
      if (!!newValue === !!oldValue) return;
      if (newValue) {
        this.handleOpened();
      } else {
        this.handleClosed();
      }
    }
  },
  render() {
    // TODO: make props/events match whatever modal does?
    // TODO: what h level should title tag be???? should it have one?
    return this.open ? (
      <div
        class={clsx(this.style['cdr-popover'], this.arrowDirectionClass)}
        role="dialog"
        ref="popover"
      >
        <div class={this.style['cdr-popover__header']}>
          <div class={this.style['cdr-popover__title']}>
            {
              this.$slots.title
            }
            {
              !this.$slots.title && (
                <cdr-text
                  tag="h1"
                  modifier="heading-serif-400"
                >
                  {this.title}
                </cdr-text>
              )
            }
          </div>
          <cdr-button
            class={this.style['cdr-popover__close-button']}
            icon-only
            on-click={this.closePopover}
            aria-label="Close"
            size="small"
          >
            <icon-x-sm
              slot="icon"
              inherit-color
            />
          </cdr-button>
        </div>
        {this.$slots.default}
      </div>
    ) : undefined;
  }
};
