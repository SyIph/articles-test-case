import { createStore } from "vuex";
import api from "@/api/client";

const store = createStore({
    state() {
        return {
            articles: [],
            comments: []
        };
    },

    mutations: {
        setArticles(state, articles) {
            state.articles = articles;
        },

        setComments(state, comments) {
            state.comments = comments;
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
        },

        async deleteArticle(_, id) {
            await api.delete(`/article/${id}/`);
        },

        async fetchComments({ commit }, articleId) {
            const responce = await api.get(`/article/${articleId}/comments`);
            commit('setComments', responce.data);
        },

        async createComment(_, { articleId, text }) {
            const response = await api.post(
                `/article/${articleId}/comment/`,
                { text }
            );

            return response.data;
        },

        async updateComment(_, { articleId, commentId, text }) {
            const responce = await api.patch(
                `/article/${articleId}/comment/${commentId}`, 
                { text }
            );

            return responce.data;
        },

        async deleteComment(_, { articleId, commentId }) {
            await api.delete(`/article/${articleId}/comment/${commentId}/`);
        },

    }
});

export default store;