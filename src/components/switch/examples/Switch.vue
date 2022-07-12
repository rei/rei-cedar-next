<template>
  <div>
    <h2>Toggle Switch</h2>
    <cdr-grid class="switch-grid">
      <cdr-switch id="foo-123" :checked="kronkLever" @switch="kronkLever = !kronkLever">
        Pull the Lever Kronk! (Medium)
      </cdr-switch>
      <cdr-switch id="foo-345" :checked="kronkLever" :full-width="true" @switch="kronkLever = !kronkLever">
        <cdr-text>Pull the Lever Kronk! (Medium: Full Width)</cdr-text>
      </cdr-switch>
      <cdr-switch id="foo-678" size="large" :checked="kronkLever" @switch="kronkLever = !kronkLever">
        <cdr-text>Pull the Lever Kronk! (Large)</cdr-text>
      </cdr-switch>
      <cdr-switch id="foo-789" size="large" :full-width="true" :checked="kronkLever" @switch="kronkLever = !kronkLever">
        Pull the Lever Kronk! (Large: Full Width)
      </cdr-switch>
      <cdr-switch id="foo-101112" :checked="kronkLever" @switch="kronkLever = !kronkLever">
        <cdr-text class="custom-text-style">Pull the lever with custom text styling</cdr-text>
      </cdr-switch>
      <img class="kronk" :style="{ maxHeight: kronkLever ? '500px' : 0 }"
        src="https://c.tenor.com/hPZScif7OvwAAAAC/pull-lever.gif" alt="">
    </cdr-grid>
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'Switch',
  data() {
    return {
      kronkLever: false
    }
  },
  components: {
    ...Components,
  },
};
</script>

<style>
.switch-grid {
  padding: 2rem;
  gap: 2rem;
  width: 550px;
}

.custom-text-style {
  color: #1f513f;
  font-weight: bold;
}

.switch-grid>div[class^="cdr-switch"] {
  border: 1px solid #dcd6cb;
  padding: 1rem;
}

.kronk {
  transition: max-height 1.15s ease-out;
  margin: auto;
  width: 500px;
}
</style>
