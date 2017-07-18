import * as actions from '../actions/teacherAction'
import * as getters from '../getters/teacherGetter'
import * as mutations from '../mutations/teacherMutation'
const state = {
    teachers: [{
        name: 'Dr. Li',
        gender: '男',
        age: 31,
        course: 'Math'
    }, {
        name: 'Mrs. Chou',
        gender: '女',
        age: 26,
        course: 'English'
    }]
}

export default {
    state,
    mutations,
    getters,
    actions
}
