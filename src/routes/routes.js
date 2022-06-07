export const routes = [
    {
        path: '/',
        name:'create',
        component: () => import('/src/views/CreateTask')
    },
    {
        path: '/list',
        name: 'list',
        component: () => import('/src/views/ListOfTasks')
    },
    {
        path: '/task/:id',
        name: 'task',
        component: () => import('/src/views/TaskDetail')
    },
]
