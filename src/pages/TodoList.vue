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
  </div>
</template>

<script setup>
  import {ref} from "vue"
  import {useTodos, useMouse} from "../utils/useUtils"
  import {Rate} from "../components"
  let {title, todos, allDone, active, allNum, addTodo} = useTodos();
  let {x, y} = useMouse();
  let rateNum = ref(3.5);
  function clear () {
    todos.value = todos.value.filter((item) => {
      return !item.done;
    });
  }
</script>

<style scoped>
  .todo-list {
    color: red;
  }

  
</style>