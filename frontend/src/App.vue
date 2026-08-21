<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        Articles Test Case App
      </v-app-bar-title>

      <v-btn to="/articles">
        Статьи
      </v-btn>

      <v-btn to="/analytics">
        Аналитика
      </v-btn>
    </v-app-bar>
    
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
