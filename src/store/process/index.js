const runningProcess = {
    namespace: true,
    state: {
        running: [],
    },
    getters: {
        GET_PROCESS(state) {
            return state.running
        },
    },
    mutations: {
        ADD_PROCESS(state, data){
            state.running.push(data);
        },
        REMOVE_PROCESS(state, data) {
            state.running = data;
        },
    },
    actions: {
    },
}

export default runningProcess
    

