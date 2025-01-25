<!-- filepath: src/views/Dashboard.vue -->
<template>
  <div class="dashboard">
    <PlayerCard :player="player" />
    <div class="dashboard-content">
      <div class="header">
        <h1>Welcome to the Gaming Dashboard</h1>
        <div class="user-controls">
          <button class="logout-btn" @click="logout">Logout</button>
        </div>
      </div>
      <div class="games-grid">
        <div class="game-card" v-for="game in games" :key="game.id">
          <h2>{{ game.name }}</h2>
          <p>{{ game.description }}</p>
          <button class="join-btn">Join Game</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlayerCard from '@/components/PlayerCard.vue';

export default {
  components: {
    PlayerCard,
  },
  data() {
    return {
      player: {
        name: 'Player Name',
        details: 'Player details here...',
      },
      games: [
        { id: 1, name: 'Game 1', description: 'Description for Game 1' },
        { id: 2, name: 'Game 2', description: 'Description for Game 2' },
        // Add more games as needed
      ],
    };
  },
  methods: {
    logout() {
      // Implement logout functionality
    },
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.user-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.dashboard-content {
  padding: 2rem;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.game-card {
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.join-btn {
  width: 100%;
  padding: 0.8rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.join-btn:hover {
  background: #45a049;
}
</style>