<template>
    <v-container>
        <v-card>
            <v-card-title>
                {{ isEdit ? 'Редактирование статьи' : 'Новая статья' }}
            </v-card-title>

            <v-card-text>
                <v-text-field v-model="title" label="Название" />

                <v-textarea v-model="text" label="Текст статьи" />
            </v-card-text>

            <v-card-actions>
                <v-btn color="primary" @click="save">
                    Сохранить
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script setup>

import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore();

const title = ref('');
const text = ref('');

const isEdit = computed(() => Boolean(route.params.id));

const save = async () => {
    const article = {
        title: title.value,
        text: text.value
    };

    if (isEdit.value) {
        await store.dispatch('updateArticle', {
            id: route.params.id,
            article
        });
    } else {
        await store.dispatch('createArticle', article);
    }

    router.push('/articles');
};

</script>