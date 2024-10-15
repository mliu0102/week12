<template>
    <h1>Sign in</h1>
    <p><input type="text" placeholder="Email" v-model="email"/></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="signin">Sign in via Firebase</button></p>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const router = useRouter()
const auth = getAuth()

const signin = async () => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
        const user = userCredential.user

        console.log("Firebase Sign-in Successful!")
        
        // Retrieve and log the user's role
        const userRole = user.displayName
        console.log("Current User:", user)
        console.log("User Role:", userRole)

        router.push("/")
    } catch (error) {
        console.error("Sign-in error:", error.code, error.message)
    }
}
</script>