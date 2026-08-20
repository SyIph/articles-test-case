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

                <v-btn variant="text" @click="cancel">
                    Отмена
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script setup>

import { computed, onMounted, ref } from 'vue';
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

const cancel = () => {
    router.push('/articles');
};

onMounted(async () => {
    if (!isEdit.value) {
        return;
    }

    const article = await store.dispatch(
        'fetchArticle',
        route.params.id
    );

    title.value = article.title;
    text.value = article.text;
});

</script>