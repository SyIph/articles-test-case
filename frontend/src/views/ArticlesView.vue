<template>
    <v-container>
        <v-card>
            <v-card-title>Статьи</v-card-title>

            <v-data-table :headers="headers" :items="articles"/>
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
    }
];

const articles = computed(() => store.state.articles);

onMounted(() => {
    store.dispatch('fetchArticles');
});

</script>