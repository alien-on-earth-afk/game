import axios from 'axios';

export default {
  namespaced: true,
  
  state: {
    user: null,
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuthenticated: false
  },
  
  mutations: {
    SET_AUTH(state, { user, accessToken, refreshToken }) {
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      
      // Store tokens in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    },
    
    CLEAR_AUTH(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      
      // Clear localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },
  
  actions: {
    async refreshToken({ commit, state }) {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/refresh-token', {
          refreshToken: state.refreshToken
        });
        
        commit('SET_AUTH', response.data);
        return response.data.accessToken;
      } catch (error) {
        commit('CLEAR_AUTH');
        throw error;
      }
    },
    
    // Update login action
    async login({ commit }, credentials) {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      commit('SET_AUTH', response.data);
      return response.data;
    }
  }
};