<template>
  <div class="welcome-container">
    <h1>ようこそ{{ username ? `, ${username}さん！` : '！' }}</h1>
    <p>{{ username ? 'ユーザー登録が完了しました。' : 'アカウントを登録してください。' }}</p>
    <router-link v-if="!username" to="/">登録画面に戻る</router-link>
    <a v-if="username" href="#" @click.prevent="logout">ログアウト</a>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const username = ref('');

onMounted(() => {
  // セッションストレージからユーザーネームを取得
  username.value = sessionStorage.getItem('username') || '';
});

const logout = () => {
  // セッションストレージからユーザーネームを削除
  sessionStorage.removeItem('username');
  // 登録画面にリダイレクト
  window.location.href = '/';
};
</script>

<style scoped>
.welcome-container {
  text-align: center;
  margin-top: 50px;
}
</style> 