<template>
    <div>
      <h1>Add Book</h1>
      <form @submit.prevent="addBook">
        <div>
          <label for="isbn">ISBN:</label>
          <input type="text" v-model="isbn" id="isbn" required placeholder="Enter ISBN">
        </div>
        <div>
          <label for="name">Name:</label>
          <input type="text" v-model="name" id="name" required placeholder="Enter Book Name">
        </div>
        <button type="submit" :disabled="loading">{{ loading ? 'Adding...' : 'Add Book' }}</button>
      </form>
      <BookList />
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import db from '../firebase/init.js';
  import { collection, addDoc } from 'firebase/firestore';
  import BookList from '../components/BookList.vue';
  
  export default {
    setup() {
      const isbn = ref('');
      const name = ref('');
      const loading = ref(false);
  
      const addBook = async () => {
        try {
          loading.value = true;
          const isbnNumber = Number(isbn.value);
          if (isNaN(isbnNumber)) {
            alert('Please enter a valid ISBN number');
            return;
          }
  
          await addDoc(collection(db, 'books'), {
            isbn: isbnNumber,
            name: name.value.trim()
          });
  
          isbn.value = '';
          name.value = '';
          alert('Book added successfully!');
        } catch (error) {
          console.error('Error adding book: ', error);
        } finally {
          loading.value = false;
        }
      };
  
      return {
        isbn,
        name,
        addBook,
        loading
      };
    },
    components: {
      BookList
    }
  };
  </script>