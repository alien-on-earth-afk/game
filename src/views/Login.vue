<template>
  <div class="login-container">
    <ThemeToggle />
    <div class="login-box">
      <h2>Welcome Back</h2>
      
      <div v-if="message" :class="['message', message.type]">
        {{ message.text }}
      </div>

      <form @submit.prevent="handleLogin" autocomplete="off">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            id="email"
            type="email" 
            v-model="email" 
            placeholder="Enter your email"
            autocomplete="off"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-input">
            <input 
              id="password"
              :type="showPassword ? 'text' : 'password'" 
              v-model="password" 
              placeholder="Enter your password"
              autocomplete="off"
              required
            />
            <button 
              type="button" 
              class="toggle-password"
              @click="showPassword = !showPassword"
              aria-label="Toggle password visibility"
            >
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          :disabled="isLoading || !isFormValid"
          class="primary-button"
        >
          <loading-spinner v-if="isLoading"/>
          <span v-else>Log In</span>
        </button>

        <div class="support-section">
          <a 
            href="mailto:hp.krishna.0707@gmail.com" 
            class="support-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="support-icon">💌</span>
            Contact Support
          </a>
        </div>

        <p class="signup-link">
          Don't have an account? 
          <router-link to="/signup">Sign Up</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

export default {
  name: "LoginPage",
  components: {
    LoadingSpinner,
    ThemeToggle
  },
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      isLoading: false,
      message: null
    }
  },
  computed: {
    isFormValid() {
      return this.email && this.password;
    }
  },
  methods: {
    ...mapActions(['login']),
    
    async handleLogin() {
      if (!this.isFormValid) return;
      
      this.isLoading = true;
      this.message = null;
      
      try {
        await this.login({
          email: this.email,
          password: this.password
        });
        this.$router.push('/dashboard');
      } catch (error) {
        this.message = {
          type: 'error',
          text: error.message || 'Invalid email or password'
        };
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.login-box {
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 6px;
  color: var(--text-primary);
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.75rem;
  background: var(--input-bg);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #4F46E5;
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
}

.primary-button {
  width: 100%;
  padding: 0.75rem;
  background: #4F46E5;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 42px;
}

.primary-button:hover:not(:disabled) {
  background: #4338CA;
}

.primary-button:disabled {
  background: #9CA3AF;
  cursor: not-allowed;
}

.message {
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
}

.message.success {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #34d399;
}

.message.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #f87171;
}

.support-section {
  margin-top: 1.5rem;
  text-align: center;
}

.support-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.8rem 1.5rem;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.support-button:hover {
  background: #1976D2;
  transform: scale(1.05);
}

.support-icon {
  display: inline-block;
  animation: bounce 1s infinite;
}

.signup-link {
  text-align: center;
  margin-top: 1rem;
  color: var(--text-secondary);
}

.signup-link a {
  color: #4F46E5;
  text-decoration: none;
}

.signup-link a:hover {
  text-decoration: underline;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .login-box {
    background: #1f2937;
    color: #f3f4f6;
  }
  
  input {
    background: #374151;
    color: #f3f4f6;
    border-color: #4b5563;
  }

  h2 {
    color: #f3f4f6;
  }

  label {
    color: #e5e7eb;
  }
}

/* Accessibility - Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>