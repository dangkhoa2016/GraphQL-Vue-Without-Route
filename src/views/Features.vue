<template>

  <div class="container">
    <h2 class="pb-2 border-bottom">🐾 Explore the Purr-fect World of Cats 🐾</h2>
    <p>Welcome to our Cats Haven!</p>

    <p>Embark on a whimsical journey into the enchanting realm of feline wonder with our Cats website!
      Whether you're a devoted cat enthusiast or a curious newcomer, our platform is dedicated to celebrating the
      captivating charm and unique personalities of our beloved feline friends.</p>

    <div class='alert alert-info'>
      🌟 Features That Make Our Cats Website Paw-some 🌟
    </div>

    <div class="row g-5 g-lg-4 py-5 row-cols-1 row-cols-lg-3">
      <div class="col d-flex align-items-start" v-for="(feature, index) in arrFeatures" :key="index">
        <div class="icon-square bg-light text-dark flex-shrink-0 me-3">
          <svg class="bi feature-icon"><use :xlink:href="`#${feature.icon}`"></use></svg>
        </div>
        <div>
          <h5>{{ feature.title }}</h5>
          <p>{{ feature.description }}</p>
          <a href="#" @click.prevent="emitEvent(feature.buttonClickEvent)" :class="feature.buttonClass">
            {{ feature.buttonText }}
          </a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Features'
  }
</script>

<script setup>

  import { inject, } from 'vue';


  const emitter = inject('emitter');

  const arrFeatures = [
    {
      title: "Cat Breeds Encyclopedia",
      description: "Dive deep into the diverse world of cat breeds! From majestic Maine Coons to playful Siamese, our comprehensive cat breeds encyclopedia provides a wealth of information, stunning visuals, and fun facts about each unique feline companion.",
      buttonText: "Pricing",
      buttonClickEvent: "Pricing",
      buttonClass: "btn btn-primary",
      icon: "toggles2"
    },
    {
      title: "Adorable Cat Videos",
      description: "Get ready to smile, laugh, and maybe even shed a tear of joy as you indulge in a curated collection of heartwarming and amusing cat videos. Whether they're showcasing acrobatic feats or adorable kitten antics, our videos capture the essence of what makes cats truly special.",
      buttonText: "FAQs",
      buttonClickEvent: "FAQs",
      buttonClass: "btn btn-info",
      icon: "cpu-fill"
    },
    {
      title: "Expert Cat Care Tips",
      description: "Ensure your furball's well-being with our expert tips on cat care. From nutrition and grooming to health advice and behavior tips, we've got you covered. Learn how to create a purr-fect environment for your feline friend and foster a strong, loving bond.",
      buttonText: "Contact",
      buttonClickEvent: "Contact",
      buttonClass: "btn btn-warning",
      icon: "tools"
    }
  ];


  const emitEvent = (name) => {
    if (!name)
      return;

    emitter.emit('route-transition', 'bounce');
    emitter.emit('show-page', name);
  };

</script>
