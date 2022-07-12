<template>
  <div :class="mapClasses(
    style,
    baseClass,
    fullWidthClass,
    sizeClass
  )">
    <div :id="id" :class="style['cdr-switch__label']">
      <slot />
    </div>
    <button @click="onClick" :class="style['cdr-switch__button']" role="switch" :aria-checked="checked"
      :aria-labelledby="id">
      <icon-check-sm :class="style['cdr-switch__button-icon']" />
      <icon-x-sm :class="style['cdr-switch__button-icon']" />
      <div :class="style['cdr-switch__handle']"></div>
    </button>
  </div>
</template>

<script setup>
import { useCssModule, computed } from 'vue';
import propValidator from '../../utils/propValidator.js';
import { buildBooleanClass } from '../../utils/buildClass.js';
import IconCheckSm from '../icon/comps/check-sm.vue';
import IconXSm from '../icon/comps/x-sm.vue';
import mapClasses from '../../utils/mapClasses.js';

const emit = defineEmits(['switch'])

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => propValidator(
      value,
      ['medium', 'large'],
    ),
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  checked: {
    type: Boolean,
    default: false
  }
})
//Safari focus state

const onClick = (e) => {
  emit('switch', e);
}
const style = useCssModule();
const baseClass = 'cdr-switch';
const sizeClass = computed(() => props.size ? `cdr-switch--${props.size}` : "cdr-switch--medium")
const fullWidthClass = computed(() => props.fullWidth
  && buildBooleanClass(baseClass, props.fullWidth, 'full-width'));
</script>

<style lang="scss" module src="./styles/CdrSwitch.module.scss">
</style>
