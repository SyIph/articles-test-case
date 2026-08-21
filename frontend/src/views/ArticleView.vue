<template>
    <v-container>
        <v-card v-if="article">
            <v-card-title>{{ article.title }}</v-card-title>

            <v-card-text>
                <p class="article-text">{{ article.text }}</p>

                <div class="mt-4">
                    Дата создания: {{ formatDate(article.createdAt) }}
                </div>

                <div>
                    Последнее изменение: {{ formatDate(article.updatedAt) }}
                </div>
            </v-card-text>

            <v-card-actions>
                <v-btn color="primary" :to="{
                    name: 'article-edit',
                    params: { id: article.id }
                }">
                    Редактировать
                </v-btn>

                <v-btn color="error" @click="remove">
                    Удалить
                </v-btn>

                <v-btn variant="text" to="/articles">
                    Назад
                </v-btn>
            </v-card-actions>
        </v-card>

        <v-card v-if="article" class="mt-4">
            <v-card-title>
                Комментарии
            </v-card-title>
            <v-card-text>
                <div class="comments-list">
                    <comment-list :comments="comments" />
                </div>
                <comment-form class="mt-4" @submit="addComment"/>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import CommentList from '../components/CommentList.vue';
import CommentForm from '../components/CommentForm.vue';

const route = useRoute();
const router = useRouter();
const store = useStore();
const comments = computed(() => store.state.comments);

const article = ref(null);

onMounted(async () => {
    article.value = await store.dispatch(
        'fetchArticle',
        route.params.id
    );

    await store.dispatch(
        'fetchComments',
        route.params.id
    );
});

const remove = async () => {
    await store.dispatch(
        'deleteArticle',
        route.params.id
    );

    router.push('/articles');
};

const formatDate = (date) => {
    return new Date(date).toLocaleString();
}

const addComment = async (text) => {
    await store.dispatch('createComment', {
        articleId: route.params.id,
        text
    });

    await store.dispatch('fetchComments', route.params.id);
};

</script>

<style scoped>
.article-text {
    white-space: pre-wrap;
}

.comments-list {
    max-height: 500px;
    overflow-y: auto;
}
</style>