<template>
  <button 
    @click="toggleTheme" 
    class="theme-toggle"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <span v-if="isDark">🌞</span>
    <span v-else>🌙</span>
  </button>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'ThemeToggle',
  computed: {
    ...mapState({
      isDark: state => state.theme.isDark
    })
  },
  methods: {
    ...mapMutations(['toggleTheme'])
  }
}
</script>

<style scoped>
.theme-toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem;
  border-radius: 50%;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  cursor: pointer;
  font-size: 1.2rem;
  transition: transform 0.3s ease;
  z-index: 1000;
}

.theme-toggle:hover {
  transform: scale(1.1);
}
</style> 