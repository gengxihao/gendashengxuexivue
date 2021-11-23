<template>
   <div class="todo-list">
    <input type="text" v-model="title" @keydown.enter="addTodo"/>
    <button v-if="active < allNum" @click="clear">清除</button>
    <ul v-if="todos.length">
      <li v-for="(item, k) in todos" :key="k">
        <input type="checkbox" v-model="item.done"/>
        <span class="">{{item.title}}</span>
      </li>
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
    <!-- <button @click="boxAdd">增加</button> -->
  </div>
</template>

<script setup>
  import {ref} from "vue"
  import {useTodos, useMouse} from "../utils/useUtils"
  import {Rate} from "../components"
  let {title, todos, allDone, active, allNum, addTodo} = useTodos();
  let {x, y} = useMouse();
  let rateNum = ref(3.5);
  let boxWidth = ref(30);
  function clear () {
    todos.value = todos.value.filter((item) => {
      return !item.done;
    });
  }
  
  /**
   * 添加宽度
   */
  function boxAdd () {
    boxWidth.value += 100;
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
</style>