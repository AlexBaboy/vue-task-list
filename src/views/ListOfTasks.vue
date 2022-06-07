<template>
  <div>
    <h1>List</h1>

    <div class="row">
      <div class="s6 col">
        <select class="filter" v-model="filter">
          <option value="" disabled selected>Choose status</option>
          <option value="active">Active</option>
          <option value="outdated">Outdated</option>
          <option value="completed">Completed</option>
        </select>
        <label>Status filter</label>
      </div>
    </div>

    <button v-if="filter"
            class="btn btn-small"
            @click="filter = null"
    >Clear filter</button>

    <hr/>

    <table v-if="tasks.length">
      <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Date</th>
          <th>Description</th>
          <th>Status</th>
          <th>Open</th>
        </tr>
      </thead>
      <tbody>
        <tr
            v-for="(task, index) of displayTasks"
            :key="task.id"
        >
          <td>{{index + 1}}</td>
          <td>{{task.title}}</td>
          <td>{{ new Date(task.date).toLocaleDateString() }}</td>
          <td class="td-description">
            <div class="description">{{task.description}}</div>
          </td>
          <td>{{task.status}}</td>
          <td>
            <router-link class="btn btn-small"
                         :to="`/task/${task.id}`">
              Open
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No tasks</p>

  </div>
</template>

<script>
import M from "materialize-css";

export default {
  name: "ListOfTasks",
  data() {
    return {
      filter: null
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks
    },
    displayTasks() {
      return this.tasks.filter(t => {
        if (!this.filter) {
          return true
        }
        return t.status === this.filter
      })
    }
  },
  mounted() {

    M.AutoInit(this.$refs.chips)

    const elems = document.querySelectorAll('.filter');
    const instances = M.FormSelect.init(elems);

    console.log('instances', instances)
  }
}
</script>

<style scoped lang="scss">
  .td-description {
    max-width: 30rem;
  }
  .description {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
