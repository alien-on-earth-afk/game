<template>
  <div class="signup-container">
    <ThemeToggle />
    <div class="signup-box">
      <h2>Create Account</h2>
      
      <div v-if="message" :class="['message', message.type]">
        {{ message.text }}
      </div>

      <form @submit.prevent="handleSignup" autocomplete="off">
        <!-- Username field -->
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            id="username"
            type="text" 
            v-model="username" 
            placeholder="Choose a username"
            @input="validateUsername"
            autocomplete="off"
            required
          />
          <div class="validation-rules">
            <div class="rule" :class="{ valid: rules.alphanumeric, invalid: !rules.alphanumeric }">
              <span class="icon">{{ rules.alphanumeric ? '✓' : '✗' }}</span>
              Only letters, numbers, and underscore
            </div>
            <div class="rule" :class="{ valid: rules.length, invalid: !rules.length }">
              <span class="icon">{{ rules.length ? '✓' : '✗' }}</span>
              At least 6 characters long
            </div>
            <div class="rule" :class="{ valid: rules.available, invalid: rules.available === false }">
              <span class="icon">{{ rules.available === null ? '?' : rules.available ? '✓' : '✗' }}</span>
              Username is available
            </div>
          </div>
        </div>

        <!-- Email field -->
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

        <!-- Password field -->
        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-input">
            <input 
              id="password"
              :type="showPassword ? 'text' : 'password'" 
              v-model="password" 
              placeholder="Create a strong password"
              autocomplete="new-password"
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

        <!-- OTP Section -->
        <div v-if="showOTP" class="form-group">
          <label for="otp">Verification Code</label>
          <input 
            id="otp"
            ref="otpInput"
            type="text" 
            v-model="otp" 
            placeholder="Enter 6-digit code"
            maxlength="6"
            pattern="\d{6}"
            required
          />
          <div class="otp-controls">
            <button 
              type="button"
              class="resend-otp-btn"
              @click="resendOTP"
              :disabled="cooldown > 0"
            >
              Resend OTP {{ cooldown > 0 ? `(${cooldown}s)` : '' }}
            </button>
          </div>
        </div>

        <!-- Action Buttons -->
        <button 
          v-if="!showOTP" 
          type="button" 
          @click="requestOTP" 
          :disabled="!isFormValid || isLoading"
          class="primary-button"
        >
          <loading-spinner v-if="isLoading"/>
          <span v-else>Send Verification Code</span>
        </button>

        <button 
          v-else
          type="submit" 
          :disabled="!otp || isLoading"
          class="primary-button"
        >
          <loading-spinner v-if="isLoading"/>
          <span v-else>Create Account</span>
        </button>

        <p class="login-link">
          Already have an account? 
          <router-link to="/login">Log In</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';

export default {
  name: 'SignupPage',
  components: {
    LoadingSpinner,
    ThemeToggle
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      otp: '',
      showOTP: false,
      showPassword: false,
      isLoading: false,
      cooldown: 0,
      message: null,
      rules: {
        alphanumeric: false,
        length: false,
        available: null
      }
    }
  },
  computed: {
    isFormValid() {
      return this.username && 
             this.email && 
             this.password &&
             this.rules.alphanumeric &&
             this.rules.length &&
             this.rules.available;
    }
  },
  methods: {
    ...mapActions({
      signup: 'auth/signup',
      verifySignupOTP: 'auth/verifySignupOTP',
      checkUsername: 'auth/checkUsername'
    }),

    async validateUsername() {
      this.rules.available = null;
      
      this.rules.alphanumeric = /^[a-zA-Z0-9_]+$/.test(this.username);
      this.rules.length = this.username.length >= 6;

      if (this.rules.alphanumeric && this.rules.length) {
        try {
          const response = await this.checkUsername(this.username);
          this.rules.available = response.available;
        } catch (error) {
          console.error('Username check error:', error);
          this.rules.available = false;
        }
      }
    },

    startCooldown() {
      this.cooldown = 60;
      const timer = setInterval(() => {
        this.cooldown--;
        if (this.cooldown <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    },

    async requestOTP() {
      if (!this.isFormValid) return;
      
      this.isLoading = true;
      try {
        await this.signup({
          username: this.username,
          email: this.email,
          password: this.password
        });
        this.showOTP = true;
        this.startCooldown();
        this.$nextTick(() => {
          this.$refs.otpInput?.focus();
        });
      } catch (error) {
        this.message = {
          type: 'error',
          text: error.message || 'Failed to send verification code'
        };
      } finally {
        this.isLoading = false;
      }
    },

    async resendOTP() {
      if (this.cooldown > 0) return;
      
      this.isLoading = true;
      try {
        await this.signup({
          username: this.username,
          email: this.email,
          password: this.password
        });
        this.startCooldown();
        this.message = {
          type: 'success',
          text: 'New verification code sent'
        };
      } catch (error) {
        this.message = {
          type: 'error',
          text: error.message || 'Failed to resend verification code'
        };
      } finally {
        this.isLoading = false;
      }
    },

    async handleSignup() {
      if (!this.otp) return;
      
      this.isLoading = true;
      try {
        await this.verifySignupOTP({
          email: this.email,
          otp: this.otp
        });
        this.$router.push('/login');
      } catch (error) {
        this.message = {
          type: 'error',
          text: error.message || 'Invalid verification code'
        };
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
.signup-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  padding: 1rem;
}

.signup-box {
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
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--input-bg);
  color: var(--text-primary);
  font-size: 1rem;
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

.validation-rules {
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.rule {
  display: flex;
  align-items: center;
  margin: 0.3rem 0;
  color: var(--text-secondary);
}

.icon {
  margin-right: 0.5rem;
  font-weight: bold;
}

.valid {
  color: #4CAF50;
}

.invalid {
  color: #f44336;
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
}

.primary-button:disabled {
  background: #9CA3AF;
  cursor: not-allowed;
}

.primary-button:hover:not(:disabled) {
  background: #4338CA;
}

.otp-controls {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.resend-otp-btn {
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  color: #4F46E5;
  cursor: pointer;
  font-size: 0.9rem;
}

.resend-otp-btn:disabled {
  color: #9CA3AF;
  cursor: not-allowed;
}

.message {
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
}

.message.error {
  background: #FEE2E2;
  color: #991B1B;
  border: 1px solid #F87171;
}

.message.success {
  background: #D1FAE5;
  color: #065F46;
  border: 1px solid #34D399;
}

.login-link {
  text-align: center;
  margin-top: 1rem;
  color: var(--text-secondary);
}

.login-link a {
  color: #4F46E5;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
