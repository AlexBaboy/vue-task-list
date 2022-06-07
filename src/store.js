import Vuex from 'vuex'

export default new Vuex.Store({
    state: {
        tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
            .map(task => {
                if (new Date(task.date) < new Date()) {
                    task.status = 'outdated'
                }
                return task
            })
    },
    mutations: {
        createTask(state, task) {
            state.tasks.push(task)
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },
        updateTask(state, task) {

            let taskToUpdate = state.tasks.find(t => t.id === task.id)

            const status = new Date(task.date) > new Date()
                    ? 'active'
                    : 'outdated'

            taskToUpdate.date = task.date
            taskToUpdate.description = task.description
            taskToUpdate.status = status
            taskToUpdate.tags = task.tags

            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },
        completeTask(state, id) {
            let taskToComplete = state.tasks.find(t => t.id === id)
            taskToComplete.status = 'completed'

            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        }
    },
    actions: {
        createTaskAction({commit}, task) {
            commit('createTask', task)
        },
        updateTaskAction({commit}, task) {
            commit('updateTask', task)
        },
        completeTaskAction({commit}, id) {
            commit('completeTask', id)
        }
    },
    getters: {
        tasks: s => s.tasks,
        taskById: s => id => s.tasks.find(t => t.id === id)
    }
})
