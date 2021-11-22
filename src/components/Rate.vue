<template>
  <div class="rate-template" :style="fontStyle">
    <div class="rate" @mouseout="onMouseOut">
      <span @mouseover="mouseOver(num)"  v-for='num in 5' :key="num">☆</span>
      <span class="hollow" :style="fontWidth">
        <span @click="onRate(num)" @mouseover="mouseOver(num)" v-for="num in 5" :key="num">★</span>
      </span>
    </div>
    {{rate}}
  </div>
</template>

<script setup>
  import {defineProps, computed, ref, defineEmits} from "vue";
  let props = defineProps({
    modelValue: Number,
    temp: {
      type: String,
      default: '#f5222d'
    }
  })
  let width = ref(props.modelValue);
  let emits = defineEmits(['update:modelValue']);
  let rate = computed(() => "★★★★★☆☆☆☆☆".slice(5 - props.modelValue, 10 - props.modelValue))

  let colorObj = {
    'black': '#00', 
    'white': '#fff', 
    'red': '#f5222d', 
    'orange': '#fa541c', 
    'yellow': '#fadb14', 
    'green': '#73d13d',
    'blue': '#40a9ff',
  };
  let fontStyle = computed(() => `color:${colorObj[props.temp]}`);

  /**
   * @description: 鼠标移出
   * @param {*}
   * @return {*}
   */  
  function onMouseOut () {
    width.value = props.modelValue;
  };

  /**
   * 鼠标移动
   */  
  function mouseOver (num) {
    width.value = num;
  }
  let fontWidth = computed(() => `width:${width.value}em`);

  /**
   * 点击星星
   */
  function onRate (num) {
    emits('update:modelValue', num);
  }
</script>

<style scoped>
.rate {
  position: relative;
  display: inline-block;
}

.rate > span.hollow {
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  width: 0;
  overflow: hidden;
}
</style>