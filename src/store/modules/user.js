export default {
    namespaced: true,
    state() {
        return {
            // 用户信息
            profile: {
                id: "",
                nickname: "",
                avatar: "",
                mobile: "",
                account: "",
                token: "",
            },
        };
    },
    mutations: {
        setUser(state, payload) {
            state.profile = payload;
        },
    },
};
