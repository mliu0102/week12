<template>
    <div>
        <h1>User Profile</h1>
        <p v-if="currentUser">Logged in as: {{ currentUser.email }}</p>
        <p v-if="currentUser">User Role: {{ userRole }}</p>
        <button @click="logout">Log Out</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const auth = getAuth()
const router = useRouter()
const currentUser = ref(null)
const userRole = ref('')

onMounted(() => {
    currentUser.value = auth.currentUser
    if (currentUser.value) {
        userRole.value = currentUser.value.displayName || 'Not set'
        console.log('Current User:', currentUser.value)
        console.log('User Role:', userRole.value)
    }
})

const logout = async () => {
    try {
        await signOut(auth)
        console.log('User signed out successfully')
        router.push('/login')
    } catch (error) {
        console.error('Error signing out:', error)
    }
}
</script>