<template>
  
  <div class="main-container">
    <header>
      <BHeader :isAuthenticated="isAuthenticated" @logout="logout" />
    </header>

    <main class="main-box">
      <!-- <LibraryRegistrationForm /> -->
      <!-- <JSONLab /> -->
      <router-view></router-view>
  </main>
  </div> 
  
</template>


<script setup>
// import JSONLab from './components/JSONLab.vue'
import BHeader from './components/BHeader.vue'
// import LibraryRegistrationForm from './views/HomeView.vue'
import { ref, provide } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAuthenticated = ref(false)

provide('isAuthenticated', isAuthenticated)

const login = () => {
  isAuthenticated.value = true
}

const logout = () => {
  isAuthenticated.value = false
  router.push('/login')
}

provide('login', login)
provide('logout', logout)
</script>



<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} 
</style>