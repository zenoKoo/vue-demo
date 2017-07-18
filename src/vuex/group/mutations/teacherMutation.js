export const removeOne = (state) => {
        if(state.teachers.length > 0){
            state.teachers.splice(state.teachers.length-1,1)
        }
 
}