import {ref, computed, onMounted, onUnmounted, watchEffect} from "vue";

function useTodos() {
  let title = ref('');
  let isShowWarning = ref(false);
  // let todos = ref([{title: '学习vue', done: false}]);
  let todos = ref(JSON.parse(localStorage.getItem('todos') || '[]'));

  let allDone = ref(false);
  function addTodo () {
    if (title.value === '') {
      isShowWarning.value = true;
      return false;
    }
    todos.value.push({
      title: title.value,
      done: false
    })
    title.value = '';
  };
  let active = computed(() => {
    return todos.value.filter((item) => {
      return !item.done;
    }).length;
  });

  let allNum = computed(() => {
    return todos.value.length;
  }); 

  allDone = computed({
    get: function () {
      return active.value === 0;
    },

    set: function (value) {
      todos.value.forEach((item) => {
        item.done = value;
      })
    }
  });

  watchEffect(() => {
    console.log(title.value, todos.value, '8888');
  })

  return {title, todos, allDone, addTodo, active, allNum, isShowWarning}
}

/**
 * 鼠标滑动
 */
function useMouse () {
  const x = ref(0), y = ref(0);
  function update (e) {
    x.value = e.pageX;
    y.value = e.pageY;
  };
  onMounted(() => {
    window.addEventListener('mousemove', update);
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', update);
  });
  return {x, y};
}

export {
  useTodos,
  useMouse
}