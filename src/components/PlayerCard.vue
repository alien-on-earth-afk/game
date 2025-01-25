<template>
  <div class="player-card">
    <div class="profile-header">
      <div class="profile-picture-container">
        <img 
          :src="profilePicture || defaultAvatar" 
          :alt="username"
          class="profile-picture"
        />
        <button @click="triggerFileInput" class="change-photo-btn">
          <i class="fas fa-camera"></i>
        </button>
        <input 
          type="file" 
          ref="fileInput" 
          @change="handleImageUpload" 
          accept="image/*"
          class="hidden"
        />
      </div>
      <h2 class="username">{{ username }}</h2>
    </div>

    <div class="stats-grid">
      <div class="stat-item">
        <span class="stat-value">{{ gamesPlayed }}</span>
        <span class="stat-label">Games Played</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ winRate }}%</span>
        <span class="stat-label">Win Rate</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ rank }}</span>
        <span class="stat-label">Rank</span>
      </div>
    </div>

    <div class="achievements">
      <h3>Achievements</h3>
      <div class="achievement-grid">
        <div 
          v-for="achievement in achievements" 
          :key="achievement.id"
          class="achievement-item"
          :class="{ 'locked': !achievement.unlocked }"
        >
          <img :src="achievement.icon" :alt="achievement.name" />
          <span class="achievement-name">{{ achievement.name }}</span>
        </div>
      </div>
    </div>
    <h2>{{ player.name }}</h2>
    <p>{{ player.details }}</p>
  </div>
</template>

<script>
export default {
  name: 'PlayerCard',
  data() {
    return {
      defaultAvatar: '/default-avatar.png',
      profilePicture: null,
      gamesPlayed: 0,
      winRate: 0,
      rank: 'Rookie',
      achievements: [
        {
          id: 1,
          name: 'First Win',
          icon: '/achievements/first-win.png',
          unlocked: true
        },
        {
          id: 2,
          name: 'Win Streak',
          icon: '/achievements/win-streak.png',
          unlocked: false
        },
        // Add more achievements
      ]
    }
  },
  props: {
    username: {
      type: String,
      required: true
    },
    player: {
      type: Object,
      required: true,
    },
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      try {
        // TODO: Implement image upload to server
        const formData = new FormData();
        formData.append('image', file);
        
        // Placeholder for API call
        // const response = await this.uploadProfilePicture(formData);
        // this.profilePicture = response.data.url;
        
        // For now, create a local URL
        this.profilePicture = URL.createObjectURL(file);
      } catch (error) {
        console.error('Failed to upload image:', error);
      }
    }
  }
}
</script>

<style scoped>
.player-card {
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 2rem auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.profile-header {
  text-align: center;
  margin-bottom: 2rem;
}

.profile-picture-container {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto 1rem;
}

.profile-picture {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #4F46E5;
}

.change-photo-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #4F46E5;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
  cursor: pointer;
  transition: transform 0.2s;
}

.change-photo-btn:hover {
  transform: scale(1.1);
}

.username {
  font-size: 1.8rem;
  color: var(--text-primary);
  margin: 1rem 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: var(--bg-primary);
  border-radius: 12px;
  transition: transform 0.2s;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: #4F46E5;
}

.stat-label {
  display: block;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
}

.achievements {
  margin-top: 2rem;
}

.achievements h3 {
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.achievement-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
}

.achievement-item {
  text-align: center;
  padding: 1rem;
  background: var(--bg-primary);
  border-radius: 12px;
  transition: all 0.2s;
}

.achievement-item img {
  width: 48px;
  height: 48px;
  margin-bottom: 0.5rem;
}

.achievement-item.locked {
  opacity: 0.5;
  filter: grayscale(1);
}

.achievement-name {
  display: block;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.hidden {
  display: none;
}

@media (max-width: 480px) {
  .player-card {
    padding: 1rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}

.player-card h2 {
  margin: 0;
  font-size: 1.5rem;
}

.player-card p {
  margin: 0;
  font-size: 1rem;
}
</style>