<template>
  <component :is="tag" :class="mapClasses(style, baseClass, modifierClass)">
    <slot />
  </component>
</template>

<script>
import { defineComponent, useCssModule, computed } from 'vue';
import propValidator from '../../utils/propValidator';
import { buildClass } from '../../utils/buildClass';
import mapClasses from '../../utils/mapClasses';

export default /*#__PURE__*/defineComponent({
  name: 'CdrContainer',
  props: {
    /** Any valid HTML tag */
    tag: {
      type: String,
      default: 'div',
    },
    modifier: {
      type: String,
      default: 'static',
      validator: (value) => propValidator(
        value,
        ['static', 'fluid'],
        false,
      ),
    },
  },
  setup(props, ctx) {
    const baseClass = 'cdr-container';
    const modifierClass = computed(() => buildClass(baseClass, props.modifier));
    return {
      style: useCssModule(),
      baseClass,
      modifierClass,
      mapClasses,
    };
  },
});
</script>

<style lang="scss" module src="./styles/CdrContainer.module.scss">
</style>
