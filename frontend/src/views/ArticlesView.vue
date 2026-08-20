<template>
    <v-container>
        <v-card>
            <v-card-title>Статьи</v-card-title>

            <v-card-actions>
                <v-btn color="primary" to="/articles/new">
                    Добавить статью
                </v-btn>
            </v-card-actions>

            <v-data-table :headers="headers" :items="articles">
                <template #item.actions="{ item }">
                    <v-btn size="small" :to="`/articles/${item.id}/edit`">
                        Редактировать
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script setup>
import {computed, onMounted} from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const headers = [
    {
        title: 'ID',
        key: 'id'
    },
    {
        title: 'Название',
        key: 'title'
    },
    {
        title: 'Дата создания',
        key: 'createdAt'
    },
    {
        title: 'Действия',
        key: 'actions',
        sortable: false
    }
];

const articles = computed(() => store.state.articles);

onMounted(() => {
    store.dispatch('fetchArticles');
});

</script>