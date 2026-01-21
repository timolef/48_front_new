import { ref, computed } from 'vue';
import { api } from '../api/client';
import { useRouter } from 'vue-router';

const user = ref(null);
const token = ref(localStorage.getItem('token'));
const isAuthenticated = computed(() => !!token.value);

// Initialize user from localStorage if available
if (token.value) {
    user.value = {
        id: localStorage.getItem('userId'),
        username: localStorage.getItem('username'),
        firstname: localStorage.getItem('firstname'),
        lastname: localStorage.getItem('lastname'),
        email: localStorage.getItem('email'),
        birthdate: localStorage.getItem('birthdate'),
        gender: localStorage.getItem('gender'),
        isAdmin: localStorage.getItem('isAdmin') === '1' || localStorage.getItem('isAdmin') === 'true',
    };
}

export function useAuth() {
    const router = useRouter();

    const login = async (email, password) => {
        try {
            const response = await api.post('/login', { email, password });

            // Save to state
            token.value = response.token;
            user.value = {
                id: response.userId,
                username: response.username,
                firstname: response.firstname,
                lastname: response.name,
                email: response.email,
                birthdate: response.birthdate,
                gender: response.gender,
                isAdmin: response.isAdmin,
            };

            // Save to localStorage
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.userId);
            localStorage.setItem('username', response.username);
            localStorage.setItem('firstname', response.firstname);
            localStorage.setItem('lastname', response.name);
            localStorage.setItem('email', response.email);
            localStorage.setItem('birthdate', response.birthdate);
            localStorage.setItem('gender', response.gender);
            localStorage.setItem('isAdmin', response.isAdmin);

            return true;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            await api.post('/register', userData);
            return true;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    }

    const logout = () => {
        token.value = null;
        user.value = null;

        localStorage.clear();

        if (router) {
            router.push('/login');
        }
    };

    return {
        user,
        token,
        isAuthenticated,
        isAdmin: computed(() => user.value?.isAdmin),
        login,
        logout,
        register
    };
}
