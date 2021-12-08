<template>
  <component
    :is="tag"
    :class="style['cdr-text']"
  >
    <slot />
  </component>
</template>

<script>
import { useCssModule, defineComponent } from 'vue';

export default /*#__PURE__*/defineComponent({
  name: 'CdrText',
  props: {
    tag: {
      type: String,
      default: 'p',
    },
  },
  setup() {
    return {
      style: useCssModule(),
    }
  }
});
</script>

<style lang="scss" module src="./styles/CdrText.module.scss">
</style>
