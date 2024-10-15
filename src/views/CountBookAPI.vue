<template>
    <pre>{{ jsondata }}</pre>
</template>

<script>
import axios from 'axios';

export default {
    name: 'CountBookAPI',
    data() {
        return {
            jsondata: null,
            error: null
        };
    },
    methods: {
        async getBookCountAPI() {
            try {
                const response = await axios.get('https://countbooks-bczzniq4ma-uc.a.run.app');
                this.jsondata = response.data;
                this.error = null;
            } catch (error) {
                console.error('Error fetching book count:', error);
                this.error = error;
                this.jsondata = null;
            }
        }
    },
    mounted() {
        this.getBookCountAPI();
    }
};
</script>

<style scoped>
pre {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 4px;
    white-space: pre-wrap;
    word-wrap: break-word;
}
</style>