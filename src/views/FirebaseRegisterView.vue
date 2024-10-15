<template>
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email"/></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p>
        <select v-model="role">
            <option value="student">Student</option>
            <option value="staff">Staff</option>
        </select>
    </p>
    <p><button @click="register">Save to Firebase</button></p>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const role = ref("student") // Default role
const router = useRouter()
const auth = getAuth()

const register = async () => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
        const user = userCredential.user

        // Update user profile with role
        await updateProfile(user, {
            displayName: role.value // Using displayName to store the role
        })

        console.log("Firebase Register Successful!")
        router.push("/FireLogin")
    } catch (error) {
        console.error("Registration error:", error.code, error.message)
    }
}
</script>