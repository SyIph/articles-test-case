<template>
    <v-form ref="form">
        <v-textarea 
            v-model="text" 
            label="Новый комментарий" 
            :rules="[required]"
        />

        <v-btn color="primary" @click="submit">
            Добавить комментарий
        </v-btn>
    </v-form>
</template>

<script setup>

import { ref } from 'vue';

const emit = defineEmits(['submit']);

const form = ref(null);
const text = ref('');

const required = (value) => {
    return Boolean(value?.trim()) || 'Введите текст комментария';
};

const submit = async () => {
    const { valid } = await form.value.validate();

    if (!valid) {
        return;
    }

    emit('submit', text.value.trim());

    text.value = '';
    form.value.resetValidation();
};

</script>