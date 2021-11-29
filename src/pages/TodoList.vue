<template>
  <div class="todo-list">
    <transition name="model">
      <div class="warning-box" v-show="isShowWarning">
        大兄弟，你啥也没输入
      </div>
    </transition>
    <input type="text" v-model="title" @keydown.enter="addTodo" @blur="closeBox"/>
    <button v-if="active < allNum" @click="clear">清除</button>
    <ul v-if="todos.length">
      <transition-group name="flip-list" tag="ul">
        <li v-for="(item, k) in todos" :key="k">
          <input type="checkbox" v-model="item.done"/>
          <span>{{item.title}}</span>
        </li>
      </transition-group>
    </ul>
    <div v-else>
      暂无数据
    </div>
    <div>
      全选<input type="checkbox" v-model="allDone"/>
      <span>{{active}} / {{allNum}}</span>
    </div>
    <Rate
      v-model="rateNum"
      temp="green"
    />
    
    <div class="box" :style="`width:${boxWidth}px`"></div>

    <transition name="fade">
      <h2 v-show="showText">你好，VUE</h2>
    </transition>

    <button @click="isShow">增加</button>
  </div>
</template>

<script setup>
  import {ref} from "vue"
  import {useTodos, useMouse} from "../utils/useUtils"
  import {Rate} from "../components"
  let {title, todos, allDone, active, allNum, addTodo, isShowWarning} = useTodos();
  let {x, y} = useMouse();
  let rateNum = ref(3.5);
  let boxWidth = ref(30);
  let showText = ref(true);
  function clear () {
    todos.value = todos.value.filter((item) => {
      return !item.done;
    });
  }
  
  /**
   * 添加宽度
   */
  function isShow () {
    showText.value = !showText.value;
  }

  function closeBox () {
    isShowWarning.value = false;
  }
</script>

<style scoped>
  .todo-list {
    color: red;
  }
  .box {
    background-color: aqua;
    height: 30px;
    width: 30px;
    position: relative;
    animation: move 2s linear infinite;
  }
  
  @keyframes move { 0% {left:0px} 50% {left:200px} 100% {left:0}}

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s linear;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .model-enter-from {
    opacity: 0;
    transform: rotateY(-60px);
  }

  .model-enter-active {
    transition: all .3s ease;
  }

  .model-leave-to {
    opacity: 0;
    transform: rotateY(-60px);
  }

  .model-leave-active {
    transition: add .3s ease;
  }

  .warning-box {
    width: 220px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: aqua;
  }

  .flip-list-move {
    transition: transform .8s ease;
  }

  .flip-list-enter-active,
  .flip-list-leave-active {
    transition: all 1s ease;
  }

  .flip-list-enter-from,
  .flip-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>