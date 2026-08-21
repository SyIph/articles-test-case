import { createStore } from "vuex";
import api from "@/api/client";

const store = createStore({
    state() {
        return {
            articles: [],
            article: null,
            comments: [],
            analytics: []
        };
    },

    mutations: {
        setArticles(state, articles) {
            state.articles = articles;
        },

        setArticle(state, article) {
            state.article = article;
        },

        setComments(state, comments) {
            state.comments = comments;
        },

        setAnalytics(state, analytics) {
            state.analytics = analytics;
        }
    },

    actions: {
        async fetchArticles({ commit }) {
            const response = await api.get('/articles/');

            commit('setArticles', response.data);
        },

        async createArticle(_, article) {
            const response = await api.post('/article/', article);

            return response.data;
        },

        async updateArticle(_, { id, article }) {
            const response = await api.patch(`/article/${id}`, article);

            return response.data;
        },

        async fetchArticle({ commit }, id) {
            const response = await api.get(`/article/${id}/`);

            commit('setArticle', response.data);
        },

        async deleteArticle(_, id) {
            await api.delete(`/article/${id}/`);
        },

        async fetchComments({ commit }, articleId) {
            const response = await api.get(`/article/${articleId}/comments`);
            commit('setComments', response.data);
        },

        async createComment(_, { articleId, text }) {
            const response = await api.post(
                `/article/${articleId}/comment/`,
                { text }
            );

            return response.data;
        },

        async updateComment(_, { articleId, commentId, text }) {
            const response = await api.patch(
                `/article/${articleId}/comment/${commentId}`, 
                { text }
            );

            return response.data;
        },

        async deleteComment(_, { articleId, commentId }) {
            await api.delete(`/article/${articleId}/comment/${commentId}/`);
        },

        async fetchAnalytics({ commit }, { dateFrom, dateTo }) {
            const response = await api.get('/analytic/comments/', {
                params: {
                    dateFrom,
                    dateTo
                }
            });

            commit('setAnalytics', response.data);
        }

    }
});

export default store;