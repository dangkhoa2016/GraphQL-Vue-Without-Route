<template>

  <div :id="galleryId" class='row' :class='mainClass'>
    <PhotoBlock :key="key" v-for="(image, key) in images" :itemBgClass="getBgClass(key)"
      :showStats="showStats" :image="image" @add-photo-stats="handleAddPhotoStats"
      :wrapperClass="wrapperClass" @show='handleClick' :current-user-id='currentUserId'
      :figureClass="figureClass" :isAdmin="isAdmin" />
  </div>

</template>

<script>
  export default {
    name: 'SimpleGallery',
  };
</script>

<script setup>

  import { onMounted, ref, onUnmounted, } from 'vue';
  import PhotoSwipeLightbox from 'photoswipe/lightbox';
  import PhotoSwipe from 'photoswipe';

  import { getStringWidth, clonePhotoStats, } from '/src/libs/helpers.mjs';

  import PhotoBlock from './PhotoBlock.vue';


  const props = defineProps({
    showStats: {
      type: Boolean,
      default: false,
    },
    galleryId: {
      type: String,
      default: '',
    },
    figureClass: {
      type: String,
      default: '',
    },
    mainClass: {
      type: String,
      default: 'py-3 justify-content-center',
    },
    wrapperClass: {
      type: String,
      default: 'col-xl-3 col-lg-4 col-md-6',
    },
    images: {
      type: Array,
      required: true,
      default: () => [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    currentUserId: {
      type: [String, Number],
      default: null,
    },
  });

  const bootstrapColors = [
    'primary','secondary','success','danger','warning','info','light','dark',
  ];

  let lightbox = null;
  let photoStatsClone = null;

  const PhotoStatsArr = ref([]);


  const getBgClass = (key) => {
    return [props.figureClass, `alert-${bootstrapColors[key % bootstrapColors.length]}`].join(' ');
  };

  const prepareImagesForPhotoswipe = async function (id) {
    // Get the <a> tags from the image gallery
    const imagesList = document.querySelectorAll(`#${id} a`);
    const promisesList = [];
    imagesList.forEach((element) => {
      const promise = new Promise((resolve) => {
        const image = new Image();
        image.src = element.getAttribute('href');
        image.onload = () => {
          // console.log('Image loaded', image.width, image.height);
          element.dataset.pswpWidth = image.width;
          element.dataset.pswpHeight = image.height;
          resolve(); // Resolve the promise only if the image has been loaded
        }
        image.onerror = () => { resolve(); };
      });
      promisesList.push(promise);
    });

    // Wait for all promises to be resolved
    await Promise.all(promisesList);
  };

  const handleAddPhotoStats = (photoStats) => {
    PhotoStatsArr.value.push(photoStats);
  };

  const onInitLightbox = (el, pswp) => {
    pswp.on('change', () => {
      const currSlideElement = pswp.currSlide.data.element;
      let captionHTML = '<div class="temp-photo-stats"></div>';
      if (currSlideElement) {
        const figcaption = currSlideElement.parentElement.querySelector('figcaption');
        if (figcaption) {
          // get caption from element
          captionHTML += figcaption.innerHTML;
        } else {
          // get caption from alt attribute
          captionHTML += currSlideElement.querySelector('img').getAttribute('alt');
        }
      }

      el.innerHTML = captionHTML;
      const description = el.querySelector('p');
      if (description) {
        description.classList.remove('text-muted');
        description.classList.remove('crop-text-2');
        const width = getStringWidth(description.textContent);
        const screenWidth = window.innerWidth - 60;
        if (width > screenWidth)
          el.style.maxWidth = 'none';
        else
          el.style.removeProperty('max-width');
      }

      if (!el.classList.contains('translate-middle-x')) {
        const cssClasses = 'text-white rounded-2 position-absolute start-50 translate-middle-x'.split(' ');
        for (const className of cssClasses)
          el.classList.add(className);
      }

      if (PhotoStatsArr.value.length > pswp.currIndex)
        photoStatsClone = clonePhotoStats(el, PhotoStatsArr.value[pswp.currIndex]);
    });
  }

  const handleClick = (event) => {
    if (!lightbox)
      event.preventDefault();
  };

  function handleUnmount() {
    if (photoStatsClone) {
      photoStatsClone.unmount();
      photoStatsClone = null;
    }
  };

  onMounted(async () => {
    await prepareImagesForPhotoswipe(props.galleryId);

    lightbox = new PhotoSwipeLightbox({
      gallery: `#${props.galleryId}`,
      children: 'a',
      pswpModule: PhotoSwipe,
    });

    lightbox.on('uiRegister', () => {
      lightbox.pswp.ui.registerElement({
        name: 'custom-caption',
        order: 9,
        isButton: false,
        appendTo: 'root',
        html: 'Caption text',
        onInit: onInitLightbox,
      });
    });

    lightbox.on('contentDeactivate', handleUnmount);

    lightbox.on('close', handleUnmount);

    lightbox.init();
  });

  onUnmounted(() => {
    if (lightbox) {
      lightbox.destroy();
      lightbox = null;
    }
  });

</script>
