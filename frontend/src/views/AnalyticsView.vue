<template>
    <v-container>
        <v-card>
            <v-card-title class="text-h5">
                Аналитика комментариев
            </v-card-title>

            <v-card-text>
                <v-form ref="form">
                    <v-row>
                        <v-col cols="12" md=4>
                            <v-text-field 
                                v-model="dateFrom"
                                label="От"
                                type="datetime-local"
                                :rules="[required]"
                            />
                        </v-col>

                        <v-col cols="12" md=4>
                            <v-text-field 
                                v-model="dateTo"
                                label="До"
                                type="datetime-local"
                                :rules="[required, validRange]"
                            />
                        </v-col>

                        <v-col cols="12" md=4 class="d-flex align-center">
                            <v-btn 
                                color="primary"
                                :loading="loading"
                                :disabled="loading"
                                @click="loadAnalytics"
                            >
                                Показать
                            </v-btn>
                        </v-col>
                    </v-row>

                    <v-divider class="my-4"/>

                    <div v-if="analytics.length">
                        <v-card v-for="article in analytics"
                            :key="article.articleId"
                            class="mb-4"
                            variant="outlined"
                        >
                            <v-card-title>
                                {{ article.title }}
                            </v-card-title>
                            
                            <v-card-text>
                                <v-card
                                    v-for="comment in article.comments"
                                    :key="comment.id"
                                    class="mb-2"
                                    variant="tonal"
                                >
                                    <v-card-text>
                                        <div class="comment-text">
                                            {{ comment.text }}
                                        </div>

                                        <div class="text-caption text-medium-emphasis mt-2">
                                            {{ formatDate(comment.createdAt) }}
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </v-card-text>
                        </v-card>
                    </div>

                    <div v-else class="text-medium-emphasis">
                        Комментарии за выбранный период не найдены
                    </div>

                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>

import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const dateFrom = ref('');
const dateTo = ref('');

const analytics = computed(() => store.state.analytics);

const form = ref(null);
const loading = ref(false);

const required = (value) => {
    return Boolean(value?.trim()) || 'Поле обязательно';
};

const validRange = () => {
    if (!dateFrom.value || !dateTo.value) {
        return true;
    }

    return new Date(dateFrom.value) <= new Date(dateTo.value) || 'Дата ОТ должна быть раньше даты ДО';
};

const loadAnalytics = async () => {
    const { valid } = await form.value.validate();

    if (!valid) {
        return;
    }

    loading.value = true;

    try {
        await store.dispatch('fetchAnalytics', {
            dateFrom: new Date(dateFrom.value).toISOString(),
            dateTo: new Date(dateTo.value).toISOString()
        });
    } finally {
        loading.value = false;
    }
};

const formatDate = (date) => {
    return new Date(date).toLocaleString();
};

</script>

<style scoped>
.comment-text {
    white-space: pre-wrap;
}
</style>