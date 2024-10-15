<template>
    <div>
      <h1>Book with ISBN > 1000</h1>
      <p v-if="status">{{ status }}</p>
      <ul>
        <li v-for="book in books" :key="book.id">
          {{ book.name }} - ISBN: {{ book.isbn }}
          <button @click="deleteBook(book.id)">Delete</button>
          <button @click="promptUpdate(book)">Update</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import db from '../firebase/init.js';
  import { collection, query, where, orderBy, limit, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
  
  export default {
    setup() {
      const books = ref([]);
      const status = ref('');
  
  
      const fetchBooks = async () => {
        try {
          const q = query(
            collection(db, 'books'),
            where('isbn', '>', 1000),
            orderBy('isbn'),
            limit(10)
          );
          const querySnapshot = await getDocs(q);
          books.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          if (books.value.length === 0) {
            status.value = 'No books found.';
          }
        } catch (error) {
          console.error('Error fetching books: ', error);
          status.value = 'Failed to fetch books.';
        }
      };
  
      const deleteBook = async (bookId) => {
        try {
          await deleteDoc(doc(db, 'books', bookId));
          books.value = books.value.filter(book => book.id !== bookId);
          status.value = 'Book deleted successfully.';
        } catch (error) {
          console.error('Error deleting book: ', error);
          status.value = 'Failed to delete book.';
        }
      };
  
      const promptUpdate = (book) => {
        const newName = prompt('Enter new name for the book:', book.name);
        if (newName !== null && newName !== book.name) {
          updateBook(book.id, newName);
        }
      };
  
      const updateBook = async (bookId, newName) => {
        try {
          const bookRef = doc(db, 'books', bookId);
          await updateDoc(bookRef, { name: newName });
          const book = books.value.find(book => book.id === bookId);
          if (book) book.name = newName;
          status.value = 'Book updated successfully.';
        } catch (error) {
          console.error('Error updating book: ', error);
          status.value = 'Failed to update book.';
        }
      };
  
      onMounted(fetchBooks);
  
      return {
        books,
        deleteBook,
        promptUpdate,
        status
      };
    }
  };
  </script>