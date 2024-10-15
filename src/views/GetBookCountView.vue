<template>
    <div id="app">
      <h1>Book Counter</h1>
      <button @click="getBookCount">Get Book Count</button>
      <p v-if="count !== null">Total number of books: {{ count }}</p>
      <p v-if="error">{{ error }}</p>
      
      <!-- Form to add new book -->
      <div>
        <h2>Add Book</h2>
        <input v-model="newBook.title" placeholder="Title">
        <input v-model="newBook.author" placeholder="Author">
        <button @click="addBook">Add Book</button>
        <p v-if="addBookMessage">{{ addBookMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        count: null,
        error: null,
        newBook: {
          title: '',
          author: ''
        },
        addBookMessage: null
      };
    },
    methods: {
      async getBookCount() {
        try {
          const response = await axios.get('https://countbooks-bczzniq4ma-uc.a.run.app');
          this.count = response.data.count;
          this.error = null;
        } catch (error) {
          console.error('Error fetching book count:', error);
          this.error = error;
          this.count = null;
        }
      },
      async addBook() {
        try {
          const response = await axios.post('https://addbook-bczzniq4ma-uc.a.run.app', this.newBook);
          this.addBookMessage = 'Book added: ' + response.data.bookId;
          this.newBook = { title: '', author: '' }; // Reset form
          this.getBookCount(); // Refresh the book count
        } catch (error) {
          console.error('Error adding book:', error);
          this.addBookMessage = 'Failed to add book';
        }
      }
    }
  }
  </script>