<template>
    <div v-if="comments.length">
        <v-card
            v-for="comment in comments"
            :key="comment.id"
            class="mb-3"
            variant="tonal"
        >
            <v-card-text>
                <template v-if="editingId === comment.id">
                    <v-textarea v-model="editingText" label="Комментарий" :rules="[required]"/>
                    <v-btn size="small" color="primary" @click="saveEdit(comment.id)">
                        Сохранить
                    </v-btn>

                    <v-btn size="small" variant="text" @click="cancelEdit()">
                        Отмена
                    </v-btn>
                </template>

                <template v-else>
                    <div class="comment-text">
                        {{ comment.text }}
                    </div>
                    
                    <div class="d-flex align-center justify-space-between mt-2">
                        <div class="text-caption text-medium-emphasis">
                            {{ formatDate(comment.createdAt) }}
                        </div>

                        <div>
                            <v-btn size="small" variant="text" @click="startEdit(comment)">
                                Редактировать
                            </v-btn>

                            <v-btn size="small" color="error" variant="text" @click="emit('delete', comment.id)">
                                Удалить
                            </v-btn>
                        </div>
                    </div>
                </template>
            </v-card-text>
        </v-card>
    </div>
    <div v-else>
        Комментариев пока нет
    </div>

</template>

<script setup>

import { ref } from 'vue';

const props = defineProps({
    comments: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['edit', 'delete']);

const editingId = ref(null);
const editingText = ref('');

const startEdit = (comment) => {
    editingId.value = comment.id;
    editingText.value = comment.text;
};

const cancelEdit = () => {
    editingId.value = null;
    editingText.value = '';
};

const saveEdit = (commentId) => {
    if (!editingText.value.trim()) {
        return;
    }

    emit('edit', {
        commentId, 
        text: editingText.value.trim()
    })

    cancelEdit();
}

const formatDate = (date) => {
    return new Date(date).toLocaleString();
}

const required = (value) => {
    return Boolean(value?.trim()) || 'Введите текст комментария';
};

</script>

<style scoped>
.comment-text {
    font-size: 18px;
    white-space: pre-wrap;
}
</style>