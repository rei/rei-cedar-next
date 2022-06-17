<script setup>
import { useCssModule, computed, useSlots } from 'vue';

import mapClasses from '../../utils/mapClasses.js';
import { responsiveModifyClass, buildBooleanClass } from '../../utils/buildClass.js';
import propValidator from '../../utils/propValidator.js';

const slots = useSlots();
const props = defineProps({
tag: {
  type: String,
  default: 'button',
  validator: (value) => propValidator(value, ['button', 'a']),
},
type: {
  type: String,
  default: 'button',
  validator: (value) => propValidator(value, ['button', 'submit', 'reset']),
},
modifier: {
  type: String,
  default: 'primary',
  validator: (value) => propValidator(value, ['primary', 'secondary', 'sale', 'dark', 'link']),
},
size: {
  type: String,
  default: 'medium',
  validator: (value) => propValidator(
    value,
    ['small', 'medium', 'large'],
  ),
},
fullWidth: {
  type: [String, Boolean],
  default: false,
  validator: (value) => {
    if (typeof value === 'string') {
      return propValidator(
        value,
        ['@xs', '@sm', '@md', '@lg'],
        false,
      );
    }
    return typeof value === 'boolean';
  },
},
iconOnly: {
  type: Boolean,
  default: false,
},
withBackground: {
  type: Boolean,
  default: false,
},
});

const baseClass = 'cdr-button';
const style = useCssModule();

/************************  Computed properties *************************/
const buttonType = computed(() => props.tag === 'button' ? props.type : null);
const modifierClass = computed(() => `${baseClass}--${props.modifier}`);
const fullWidthClass = computed(() => !props.iconOnly && props.fullWidth
  && buildBooleanClass(baseClass, props.fullWidth, 'full-width'));
const sizeClass = computed(() => (!props.iconOnly
  ? responsiveModifyClass(baseClass, '', props.size)
  : `cdr-button--icon-only-${props.size}`));
const iconLeftClass = computed(() => slots['icon-left'] && slots.default
  && `${baseClass}--has-icon-left`);
const iconRightClass = computed(() => slots['icon-right'] && slots.default
  && `${baseClass}--has-icon-right`);
const iconOnlyClass = computed(() => props.iconOnly && `${baseClass}--icon-only`);
const withBackgroundClass = computed(() => props.iconOnly
  && props.withBackground && `${baseClass}--with-background`);

</script>
<template>
  <component
    :is="tag"
    :class="mapClasses(style,
                       baseClass,
                       modifierClass,
                       sizeClass,
                       fullWidthClass,
                       iconOnlyClass,
                       iconLeftClass,
                       iconRightClass,
                       withBackgroundClass,
    )"
    :type="buttonType"
  >
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </component>
</template>

<style lang="scss" module src="./styles/CdrButton.module.scss">
</style>
