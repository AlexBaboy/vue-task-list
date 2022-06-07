<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1>Create task</h1>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input v-model="title" id="title" type="text" class="validate" required>
          <label for="title">Title</label>
          <span class="helper-text"
                data-error="Title is required"
                />
        </div>

        <div class="input-field">
          <div @change="chipsChangeHandler" class="chips chips-autocomplete chips-placeholder"></div>
        </div>

        <div class="input-field">
          <textarea v-model="description" id="description" class="materialize-textarea" data-length="2048" maxlength="2048"></textarea>
          <label for="description">Description</label>
          <span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/2048</span>
        </div>

        <div class="input-field">
          <input type="text" ref="datepicker" class="datepicker">
        </div>

        <button class="btn" type="submit">Create task</button>

      </form>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css'
export default {
  name: "CreateTask",
  data: () => ({
    description: '',
    title: '',
    chips: null,
    date: null
  }),
  mounted() {
    M.AutoInit(this.$refs.chips)

    const tags = document.querySelectorAll('.chips');
    this.chips = M.Chips.init(tags, {
      placeholder: 'Task tags'
    });

    const dates = document.querySelectorAll('.datepicker')
    this.date = M.Datepicker.init(
        dates,
        {
          format: 'dd.mm.yyyy',
          defaultDate: new Date(),
          setDefaultDate: true
        }
    );
  },
  methods: {
    submitHandler() {

      const task = {
        title: this.title,
        description: this.description,
        id: Date.now(),
        status: 'active',
        tags: this.chips[0].chipsData,
        date: this.date[0].date
      }
      this.$store.dispatch('createTaskAction', task)
      this.$router.push('/list')
    },
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

<style scoped>

</style>
