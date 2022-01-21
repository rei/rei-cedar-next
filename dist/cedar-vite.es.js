import { defineComponent, useCssModule, openBlock, createBlock, resolveDynamicComponent, normalizeClass, withCtx, renderSlot, computed } from "vue";
var style0$1 = {
  "cdr-text": "_cdr-text_1mhnz_1"
};
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  name: "CdrText",
  props: {
    tag: {
      type: String,
      default: "p"
    }
  },
  setup() {
    return {
      style: useCssModule()
    };
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    class: normalizeClass(_ctx.style["cdr-text"])
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
const cssModules$1 = {};
cssModules$1["$style"] = style0$1;
var CdrText = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__cssModules", cssModules$1]]);
function validateProp(propValue, validArr, responsive = true) {
  const strArr = propValue.split(" ");
  return strArr.every((mod) => {
    const modValid = validArr.some((validStr) => {
      if (responsive) {
        return mod === validStr || mod === `${validStr}@xs` || mod === `${validStr}@sm` || mod === `${validStr}@md` || mod === `${validStr}@lg`;
      }
      return mod === validStr;
    });
    if (!modValid) {
      console.error(`Invalid prop value: ${mod}`);
    }
    return modValid;
  });
}
const modifyClassName = (base, modifier) => `${base}--${modifier}`;
const buildClass = (baseClass, prop, propNamePrefix = false) => {
  if (!prop)
    return void 0;
  let propArgsArr = prop.split(" ").filter((x) => x);
  let builtClasses = [];
  if (propNamePrefix) {
    propArgsArr = propArgsArr.map((mod) => `${prop}${mod}`);
  }
  builtClasses = builtClasses.concat(propArgsArr.map((mod) => modifyClassName(baseClass, mod)));
  return builtClasses.join(" ");
};
function mapClasses(style, ...classes) {
  return classes.reduce((acc, el) => acc.concat((el || "").split(" ")), []).map((className) => style[className]).filter((x) => x).join(" ");
}
var style0 = {
  "cdr-container": "_cdr-container_1b20r_1",
  "cdr-container--static": "_cdr-container--static_1b20r_19"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  name: "CdrContainer",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    modifier: {
      type: String,
      default: "static",
      validator: (value) => validateProp(value, ["static", "fluid"], false)
    }
  },
  setup(props, ctx) {
    const baseClass = "cdr-container";
    const modifierClass = computed(() => buildClass(baseClass, props.modifier));
    return {
      style: useCssModule(),
      baseClass,
      modifierClass,
      mapClasses
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    class: normalizeClass(_ctx.mapClasses(_ctx.style, _ctx.baseClass, _ctx.modifierClass))
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
const cssModules = {};
cssModules["$style"] = style0;
var CdrContainer = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export { CdrContainer, CdrText };
