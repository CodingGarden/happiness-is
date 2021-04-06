<template>
  <div class="messages">
    <div class="message" v-for="(message, i) in state.messages" :key="message.id">
      <div class="quote" :style="{ backgroundImage: `url(${frames[i % frames.length].src})`, ...frames[i % frames.length].style }">
        <h3 :style="{ fontFamily: randomFont() }">{{message.content}}</h3>
        <small class="author">{{message.display_name}}</small>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';

import image01 from './assets/frames/01.png';
import image02 from './assets/frames/02.png';
import image03 from './assets/frames/03.png';
import image04 from './assets/frames/04.png';
import image05 from './assets/frames/05.png';

const frames = [
  {
    src: image01,
    style: {
      paddingLeft: '25vmin',
      paddingRight: '25vmin'
    }
  },
  {
    src: image02,
    style: {},
  },
  {
    src: image03,
    style: {},
  },
  {
    src: image04,
    style: {},
  },
  {
    src: image05,
    style: {},
  },
];

const fonts = [
    'Caveat Brush',
    'Charmonman',
    'EB Garamond',
    'Gloria Hallelujah',
    'Hachi Maru Pop',
    'Julius Sans One',
    'Liu Jian Mao Cao',
    'Nixie One',
    'Poppins',
    'Special Elite',
    'Staatliches',
    'Wellfleet',
];

const API_URL = 'http://localhost:4455/api/v1/messages';

export default {
  name: 'App',
  setup() {
    const state = reactive({
      messages: [],
    });

    async function getMessages() {
      const response = await fetch(API_URL);
      const messages = await response.json();
      state.messages = messages;
    }

    getMessages();

    function randomFont() {
      return fonts[Math.floor(Math.random() * fonts.length)];
    }

    return {
      frames,
      state,
      randomFont,
    };
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
}

.messages {
  display: flex;
  overflow-x: scroll;
  width: 100vw;
  height: 100vh;
  gap: 5vw;
}
.message {
  position: relative;
  min-width: 80vmin;
  min-height: 80vmin;
  .quote {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    font-size: 3vmin;
    padding-left: 4vmin;
    padding-right: 4vmin;
  }
  .author {
    font-family: 'EB Garamond', serif;
  }
}
</style>
