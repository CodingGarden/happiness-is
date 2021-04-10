<template>
  <div class="messages">
    <div class="background">
      <div class="message" v-for="message in state.messages" :key="message.id">
        <div class="quote" :style="{ backgroundImage: `url(${message.frame.src})`, ...message.frame.style }">
          <h3 :style="{ fontFamily: randomFont() }">{{message.displayContent}}</h3>
          <small class="author">— {{message.display_name}}</small>
        </div>
        <div class="message-background">
          <div class="img-container" :style="{ backgroundImage: `url('${getRandomImage().image}')`, ...message.frame.backgroundStyle }">
            <div class="darkness-overlay"></div>
          </div>
        </div>
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
      paddingRight: '25vmin',
    },
    backgroundStyle: {
      width: '60vmin',
      height: '70vmin',
    },
  },
  {
    src: image02,
    style: {
      paddingLeft: '13vmin',
      paddingRight: '13vmin',
    },
    backgroundStyle: {
      width: '60vmin',
      height: '50vmin',
    },
  },
  {
    src: image03,
    style: {
      paddingLeft: '16vmin',
      paddingRight: '16vmin',
    },
    backgroundStyle: {
      width: '60vmin',
      height: '35vmin',
    },
  },
  {
    src: image04,
    style: {
      paddingLeft: '20vmin',
      paddingRight: '20vmin',
    },
    backgroundStyle: {
      width: '60vmin',
      height: '40vmin',
    },
  },
  {
    src: image05,
    style: {
      paddingLeft: '13vmin',
      paddingRight: '13vmin',
    },
    backgroundStyle: {
      width: '60vmin',
      height: '40vmin',
    },
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

// const API_URL = 'http://localhost:4455/api/v1/messages';
const API_URL = 'https://twitch-happiness-is.herokuapp.com/api/v1/messages';

function inPlaceShuffle(array) {
  for (let i = 0; i < array.length; i += 1) {
    const randomIndex = Math.floor(Math.random() * array.length);
    //    exchange a[i] and a[j]
    // eslint-disable-next-line no-param-reassign
    [array[randomIndex], array[i]] = [array[i], array[randomIndex]];
  }
  return array;
}

export default {
  name: 'App',
  setup() {
    const state = reactive({
      messages: [],
    });

    let currentFrames = [];
    function getNextFrame() {
      if (currentFrames.length === 0) {
        currentFrames = inPlaceShuffle(frames.slice());
      }
      return currentFrames.pop();
    }

    let randomImages = [];
    let images = [];
    async function getImages() {
      const response = await fetch('https://nature-image-api.vercel.app/search?q=garden');
      ({ images } = await response.json());
      console.log(images);
      randomImages = images.slice();
      inPlaceShuffle(randomImages);
    }

    function getRandomImage() {
      if (randomImages.length === 0) {
        randomImages = images.slice();
        inPlaceShuffle(randomImages);
      }
      return randomImages.pop() || { image: '' };
    }

    async function getMessages() {
      await getImages();
      const response = await fetch(API_URL);
      const messages = await response.json();
      state.messages = messages.map((message) => {
        // eslint-disable-next-line no-param-reassign
        message.frame = getNextFrame();
        if (message.content.length > 106) {
          message.displayContent = `${message.content.slice(0, 103)}...`;
        } else {
          message.displayContent = message.content;
        }
        return message;
      });
    }

    getMessages();

    function randomFont() {
      return fonts[Math.floor(Math.random() * fonts.length)];
    }

    return {
      frames,
      state,
      randomFont,
      getRandomImage,
    };
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  overflow-y: hidden;
}

.messages {
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  width: 100vw;
  height: 100vh;
}

.background {
  height: 100%;
  gap: 10vmin;
  display: flex;
  position: absolute;
  overflow: hidden;
  background-image: url('./assets/grey-bg.jpg');
  background-attachment: scroll;
}

.message {
  position: relative;
  min-width: 80vmin;
  min-height: 80vmin;
  overflow: hidden;
  .quote {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    font-size: 2.75vmin;
    text-align: center;
    color: white;
    word-break: break-word;
    overflow: hidden;
    z-index: 2;
    position: relative;
    filter: drop-shadow(10px 10px 10px rgba(0,0,0,0.9));
  }
  .message-background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    .img-container {
      overflow: hidden;
      position: relative;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      filter: blur(1px);
      .darkness-overlay {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
      }
    }
  }
  .author {
    font-family: 'EB Garamond', serif;
  }
}
</style>
