<template>
    <v-list>
        <v-list-item
            v-for="comment in comments"
            :key="comment.id"
        >
            <v-list-item-title class="comment-text">
                {{ comment.text }}
            </v-list-item-title>

            <v-list-item-subtitle>
                {{ formatDate(comment.createdAt) }}
            </v-list-item-subtitle>
        </v-list-item>

        <v-list-item v-if="comments.length === 0">
            Комментариев пока нет
        </v-list-item>
    </v-list>
</template>

<script setup>

defineProps({
    comments: {
        type: Array,
        required: true
    }
});

const formatDate = (date) => {
    return new Date(date).toLocaleString();
}

</script>

<style scoped>
.comment-text {
    white-space: pre-wrap;
}
</style>