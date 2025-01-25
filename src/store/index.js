import { createStore } from 'vuex';
import axios from 'axios';
import auth from './modules/auth';
import theme from './modules/theme';

// Auth module
const authModule = {
  namespaced: true,
  state: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  actions: {
    async signup({ commit }, credentials) {
      commit('SET_LOADING', true);
      try {
        const response = await axios.post('http://localhost:5000/api/auth/signup', credentials);
        commit('SET_ERROR', null);
        return response.data;
      } catch (error) {
        const message = error.response?.data?.message || 'Signup failed';
        commit('SET_ERROR', message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async verifySignupOTP({ commit }, data) {
      commit('SET_LOADING', true);
      try {
        const response = await axios.post('http://localhost:5000/api/auth/verify-signup', data);
        commit('SET_ERROR', null);
        return response.data;
      } catch (error) {
        const message = error.response?.data?.message || 'Verification failed';
        commit('SET_ERROR', message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async checkUsername({ commit }, username) {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/check-username', { username });
        return response.data;
      } catch (error) {
        console.error('Username check error:', error);
        throw error;
      }
    },

    async login({ commit }, credentials) {
      commit('SET_LOADING', true);
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
        commit('SET_USER', response.data.user);
        commit('SET_ERROR', null);
        return response.data;
      } catch (error) {
        const message = error.response?.data?.message || 'Login failed';
        commit('SET_ERROR', message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    logout({ commit }) {
      commit('SET_USER', null);
      commit('SET_ERROR', null);
    }
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user,
    loading: state => state.loading,
    error: state => state.error
  }
};

// Create store
export default createStore({
  modules: {
    auth: authModule,
    theme
  }
});