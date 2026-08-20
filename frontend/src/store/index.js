import { createStore } from "vuex";
import api from "@/api/client";

const store = createStore({
    state() {
        return {
            articles: []
        };
    },

    mutations: {
        setArticles(state, articles) {
            state.articles = articles;
        }
    },

    actions: {
        async fetchArticles({ commit }) {
            const responce = await api.get('/articles/');

            commit('setArticles', responce.data);
        }
    }
});

export default store;