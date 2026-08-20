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
        },

        async createArticle(_, article) {
            const responce = await api.post('/article/', article);

            return responce.data;
        },

        async updateArticle(_, { id, article }) {
            const responce = await api.patch(`/article/${id}`, article);

            return responce.data;
        },

        async fetchArticle(_, id) {
            const responce = await api.get(`/article/${id}/`);
            
            return responce.data;
        }
    }
});

export default store;