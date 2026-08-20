<template>
    <v-container>
        <v-card>
            <v-card-title>
                {{ isEdit ? 'Редактирование статьи' : 'Новая статья' }}
            </v-card-title>

            <v-card-text>
                <v-form ref="form">
                    <v-text-field 
                        v-model="title" 
                        label="Название"
                        :rules="[required]"
                    />

                    <v-textarea 
                        v-model="text" 
                        label="Текст статьи" 
                        :rules="[required]"
                    />
                </v-form>
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

const form = ref(null);

const required = (value) => {
    return Boolean(value?.trim()) || 'Поле обязательно';
};

const save = async () => {

    const { valid } = await form.value.validate();

    if (!valid) {
        return;
    }

    const article = {
        title: title.value,
        text: text.value
    };

    let savedArticle;

    if (isEdit.value) {
        savedArticle = await store.dispatch('updateArticle', {
            id: route.params.id,
            article
        });
    } else {
        savedArticle = await store.dispatch('createArticle', article);
    }

    router.push(`/articles/${savedArticle.id}`);
};

const cancel = () => {
    if (isEdit.value) {
        router.push(`/articles/${route.params.id}`);
    } else {
        router.push('/articles');
    }
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