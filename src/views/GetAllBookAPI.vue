<template>
    <div class="books-container">
        <h2>All Books</h2>
        <div v-if="loading" class="loading">
            Loading books...
        </div>
        <div v-else-if="error" class="error">
            {{ error }}
        </div>
        <pre v-else class="json-display">{{ formattedData }}</pre>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'GetAllBookAPI',
    data() {
        return {
            books: null,
            loading: true,
            error: null
        };
    },
    computed: {
        formattedData() {
            return this.books ? JSON.stringify(this.books, null, 2) : '';
        }
    },
    methods: {
        async getAllBooksAPI() {
            try {
                const response = await axios.get('https://getallbooks-bczzniq4ma-uc.a.run.app');
                this.books = response.data;
                this.error = null;
            } catch (error) {
                console.error('Error fetching books:', error);
                this.error = 'Failed to fetch books. Please try again later.';
            } finally {
                this.loading = false;
            }
        }
    },
    mounted() {
        this.getAllBooksAPI();
    }
};
</script>

<style scoped>
.books-container {
    padding: 20px;
}

.loading {
    color: #666;
    font-style: italic;
}

.error {
    color: #ff4444;
    padding: 10px;
    border: 1px solid #ff4444;
    border-radius: 4px;
    margin: 10px 0;
}

.json-display {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 4px;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: monospace;
}
</style>