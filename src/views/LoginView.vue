<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <h1 class="text-center">✅ Library Login</h1>
          <p class="text-center">
            Please enter your credentials to access the library system.
          </p>
          <form @submit.prevent="submitForm">
            <div class="row mb-3">
              <div class="col-md-6 col-sm-6">
                <label for="username" class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  v-model="formData.username"
                />
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-6 col-sm-6">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="formData.password"
                />
              </div>
            </div>
            <div v-if="error" class="text-danger mb-3">{{ error }}</div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary me-2">Login</button>
              <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const formData = ref({
    username: '',
    password: ''
  })
  
  const error = ref(null)
  
  // Hardcoded credentials
  const VALID_USERNAME = 'admin'
  const VALID_PASSWORD = 'password123'
  
  const submitForm = () => {
    if (formData.value.username === VALID_USERNAME && formData.value.password === VALID_PASSWORD) {
      // Successful login
      console.log('Login successful')
      
      router.push('/about')
    } else {
      // Failed login
      error.value = 'Invalid username or password'
    }
  }
  
  const clearForm = () => {
    formData.value = {
      username: '',
      password: ''
    }
    error.value = null
  }
  </script>
  
  <style scoped>
  .container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 80vw;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
  }
  
  .form {
    text-align: center;
    margin-top: 50px;
  }
  
  #username:focus,
  #password:focus {
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>