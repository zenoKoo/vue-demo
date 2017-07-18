
const state = {
    className: '',
    students: [{
        name: 'Jack',
        grade: '一年级',
        gender: '男',
        age: 12,
        score: 80
    }, {
        name: 'Nick',
        grade: '二年级',
        gender: '男',
        age: 13,
        score: 98
    },{
        name: 'Rose',
        grade: '二年级',
        gender: '女',
        age: 13,
        score: 88
    }]
}

const mutations = {
    addScore(state){
        for(let stu of state.students){
            let num = Math.ceil(Math.random()*10);
            stu.score += num * (stu.score < 90? 1: -1);
        }
    },
    addClassName(state){
        state.className = 'active';
    },
    removeClassName(state){
        state.className = '';
    }
}

const actions = {
    addScore({commit}){
        commit('addScore')
    },
    addClass({commit}){
        commit('addClassName')
    },
    removeClass({commit}){
        commit('removeClassName')
    }
}

const getters = {
    students: state.students,
    className: state.className
}

export default {
    state,
    mutations,
    getters,
    actions
}