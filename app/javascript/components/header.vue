<template>
  <v-app-bar
    absolute
    color="#6A76AB"
    dark
    dense
    fixed
    height="48"
    shrink-on-scrol
    prominent
    src="https://picsum.photos/1920/1080?random"
    fade-img-on-scroll
    scroll-target="#scrolling-techniques-3"
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
      ></v-img>
    </template>

    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-app-bar-title>evenTown</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-text-field
      hide-details
      prepend-icon="mdi-magnify"
      single-line
    ></v-text-field>

    <v-btn
      text
      height="48"
    >
      Черноморск
    </v-btn>
    <v-btn
      text
      height="48"
    >
      <v-icon>mdi-account</v-icon>
      Войти
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {

}
</script>
