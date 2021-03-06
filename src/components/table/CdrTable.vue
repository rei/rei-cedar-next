<script setup>
import { useCssModule, computed } from 'vue';

import mapClasses from '../../utils/mapClasses.js';
import { buildBooleanClass } from '../../utils/buildClass.js';
import propValidator from '../../utils/propValidator.js';

const props = defineProps({
  striped: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Boolean,
    default: true,
  },
  fullWidth: {
    type: [Boolean, String],
    default: true,
  },
  responsive: {
    type: Boolean,
    default: true,
  },
  hover: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => propValidator(
      value,
      ['small', 'medium', 'large'],
    ),
  },
});

const baseClass = 'cdr-table';
const sizeClass = computed(() => props.size && `${baseClass}--${props.size}`);
const stripedClass = computed(() => props.striped && `${baseClass}--striped`);
const hoverClass = computed(() => props.hover && `${baseClass}--hover`);
const borderClass = computed(() => props.border && !props.striped
  && `${baseClass}--border`);
const fullWidthClass = computed(() => props.fullWidth
  && buildBooleanClass(baseClass, props.fullWidth, 'full-width'));
const wrapperClass = computed(() => props.responsive && `${baseClass}--responsive`);
const style = useCssModule();
</script>

<template>
  <div :class="style[wrapperClass]">
    <table
      v-bind="$attrs"
      :class="mapClasses(style,
                         baseClass,
                         sizeClass,
                         stripedClass,
                         hoverClass,
                         borderClass,
                         fullWidthClass,
      )"
    >
      <slot />
    </table>
  </div>

</template>

<style lang="scss" module src="./styles/CdrTable.module.scss">
</style>
