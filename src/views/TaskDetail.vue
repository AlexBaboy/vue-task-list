<template>
  <div class="row">
    <div  v-if="task" class="col s6 offset-s3">
      <h1>{{task.title}}</h1>
      <form @submit.prevent="submitHandler">

        <div class="input-field">
          <div class="chips chips-autocomplete chips-placeholder"></div>
        </div>

        <div class="input-field">
          <textarea :disabled="task.status === 'completed'" v-model="description" id="description" class="materialize-textarea" data-length="2048" maxlength="2048"></textarea>
          <label for="description">Description</label>
          <span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/2048</span>
        </div>

        <div class="input-field">
          <input type="text" ref="datepicker" class="datepicker" :disabled="task.status === 'completed'">
        </div>

        <div v-if="task.status !== 'completed'">
          <button class="btn update" type="submit">Update task</button>
          <button class="btn blue" type="button" @click="completeTask">Complete task</button>
        </div>

      </form>
    </div>

    <p v-else>Task not found</p>
  </div>
</template>

<script>
import M from "materialize-css";

export default {
  name: "TaskDetail",
  computed: {
    task() {
      return this.$store.getters.taskById(
          Number(this.$route.params.id)
      )
    }
  },
  data: () => ({
    description: '',
    chips: null,
    date: null
  }),
  mounted() {
    M.AutoInit(this.$refs.chips)

    const tags = document.querySelectorAll('.chips');
    this.chips = M.Chips.init(tags, {
      placeholder: 'Task tags',
      data: this.task.tags
    });

    const dates = document.querySelectorAll('.datepicker')
    this.date = M.Datepicker.init(
        dates,
        {
          format: 'dd.mm.yyyy',
          defaultDate: new Date(this.task.date),
          setDefaultDate: true
        }
    );

    this.description = this.task.description

    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  methods: {
    submitHandler() {

      console.log('76 this.date', this.date)
      console.log('77 this.date.date', this.date.date)

      this.$store.dispatch('updateTaskAction', {
        id: this.task.id,
        description: this.description,
        date: this.date[0].date,
        tags: this.chips[0].chipsData,
      })
      this.$router.push('/list')
    },
    completeTask() {
      this.$store.dispatch('completeTaskAction', this.task.id)
      this.$router.push('/list')
    }
  },
  unmounted() {
    if (this.chips && this.chips.destroy) {
      this.chips.destroy()
    }

    if (this.date && this.date.destroy) {
      this.date.destroy()
    }
  }
}
</script>

<style scoped lang="scss">
  textarea {
    min-height: 15rem;
  }
  .update {
    margin-right: 2rem;
  }
</style>
