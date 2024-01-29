<template>

  <div id='main-page' class='w-100'>
    <div class="bg-white py-5">
      <div class="container">
        <h2 class="display-4 border-bottom">Our Features</h2>
        <div class="row align-items-center mb-5">
          <div class="col-lg-6 order-2 order-lg-1">
            <div class="col d-flex align-items-start">
              <div class="fs-4 me-3">
                <svg class="" height="1em" width="1em"><use xlink:href="#toggles2"></use></svg>
              </div>
              <div>
                <h3 class="fs-2 text-body-emphasis">Diverse Cat Breeds</h3>
                <p>Discover an extensive showcase of diverse cat breeds, each highlighted for its unique characteristics, history, and charm.</p>
              </div>
            </div>
            <a href="#" class="btn btn-light px-5 rounded-pill shadow-sm">Learn More</a>
          </div>
          <div class="col-lg-6 px-5 mx-auto order-1 order-lg-2"><img src="https://bootstrapious.com/i/snippets/sn-about/img-1.jpg" alt="" class="img-fluid mb-4 mb-lg-0" /></div>
        </div>
        <div class="row align-items-center">
          <div class="col-lg-6 px-5 mx-auto"><img src="https://bootstrapious.com/i/snippets/sn-about/img-2.jpg" alt="" class="img-fluid mb-4 mb-lg-0" /></div>
          <div class="col-lg-6">
            <div class="col d-flex align-items-start">
              <div class="fs-4 me-3">
                <svg class="" height="1em" width="1em"><use xlink:href="#toggles2"></use></svg>
              </div>
              <div>
                <h3 class="fs-2 text-body-emphasis">Heartwarming Stories</h3>
                <p>Delve into heartwarming stories of extraordinary cats and their human companions. Our platform shares touching narratives that celebrate the deep connections forged between cats and their devoted owners.</p>
              </div>
            </div>
            <a href="#" class="btn btn-light px-5 rounded-pill shadow-sm">Learn More</a>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-light py-5">
      <div class="container">
        <div class="row h-100 align-items-center">
          <div class="col-lg-6">
            <h2 class="display-4 border-bottom">About us</h2>
            <p class="lead text-muted mb-0">We are passionate about celebrating the enchanting world of cats.</p>
            <p class="lead text-muted">
              Dive into the stories, tips, and shared experiences that make us a hub for all things feline.
              Join us in exploring the extraordinary bond between humans and their whiskered companions,
              and become part of a community that cherishes the joy, comfort, and unique charm that cats bring into our lives.
            </p>
          </div>
          <div class="col-lg-6"><img src="https://bootstrapious.com/i/snippets/sn-about/illus.png" alt="" class="img-fluid" /></div>
        </div>
      </div>
    </div>

    <div class='bg-white images py-5'>
      <div class="container">
        <div class="h-100 align-items-center">
          <h2 class="display-4 border-bottom">Our gallery</h2>
          <p>Step into the enchanting world of our gallery, where each image tells a story of feline grace, charm, and individuality.</p>

          <SimpleGallery gallery-id="our-gallery" main-class='py-3 justify-content-center row-gap-4' :images="images" />
        </div>
      </div>
    </div>

    <TopUsers />
  </div>

</template>

<script>
  export default {
    name: 'MainPage',
  }
</script>

<script setup>
  // import { inject, } from 'vue';

  import SimpleGallery from '/src/components/SimpleGallery.vue';
  import TopUsers from '/src/components/TopUsers.vue';


  // const emitter = inject('emitter');
  // const authStore = inject('authStore');
  // const { useAuthStore, } = authStore;
  // const { isAuthenticated, } = useAuthStore();

  const images = [
    {
      largeURL: 'https://www.enwallpaper.com/wp-content/uploads/2023/11/cute-cat-wallpaper.jpg',
      thumbnailURL: 'https://wsrv.nl/?url=https://www.enwallpaper.com/wp-content/uploads/2023/11/cute-cat-wallpaper.jpg&w=300&h=300',
      title: 'Greatest',
      description: 'The greatest cat in the world',
    },
    {
      largeURL:  'https://images2.alphacoders.com/132/1327359.png',
      thumbnailURL: 'https://images2.alphacoders.com/132/thumb-1327359.png',
      title: 'Newest image',
      description: 'The newest cat from our users',
    },
    {
      largeURL: 'https://marketplace.canva.com/EAFhwfMq3ds/1/0/1600w/canva-colorful-cute-cats-illustration-desktop-wallpaper-KBBZLdpjLcM.jpg',
      thumbnailURL: 'https://wsrv.nl/?url=https://marketplace.canva.com/EAFhwfMq3ds/1/0/1600w/canva-colorful-cute-cats-illustration-desktop-wallpaper-KBBZLdpjLcM.jpg&w=300&h=300',
      title: 'Introduction',
      description: 'The picture about our teams',
    },
    {
      largeURL: 'https://images4.alphacoders.com/132/1321960.jpeg',
      thumbnailURL: 'https://images4.alphacoders.com/132/thumb-1321960.jpeg',
      title: 'The group of cats',
      description: 'Pawsome Unity: The Cat Collective',
    },
    {
      largeURL: 'https://www.everwallpaper.co.uk/cdn/shop/products/uk-cat-performer-wallpaper-mural-living-room.jpg?v=1659418653',
      thumbnailURL: 'https://wsrv.nl/?url=https://www.everwallpaper.co.uk/cdn/shop/products/uk-cat-performer-wallpaper-mural-living-room.jpg&w=300&h=300',
      title: 'The drawing cat',
      description: 'a whimsical space where feline artistry comes to life',
    },
    {
      largeURL: 'https://www.everwallpaper.co.uk/cdn/shop/products/cat-art-mural-wallpaper.jpg?v=1643189759',
      thumbnailURL: 'https://wsrv.nl/?url=https://www.everwallpaper.co.uk/cdn/shop/products/cat-art-mural-wallpaper.jpg&w=300&h=300',
      title: 'Lonely cat',
      description: 'Despite the solitude, this resilient feline possesses a heart full of untapped affection and a spirit waiting to be understood',
    },
    {
      largeURL: 'https://ashisheditz.com/wp-content/uploads/2023/11/background-cat-wallpaper.jpg',
      thumbnailURL: 'https://wsrv.nl/?url=https://ashisheditz.com/wp-content/uploads/2023/11/background-cat-wallpaper.jpg&w=300&h=300',
      title: 'Army of cats',
      description: 'The Cat Army: A Force to be Reckoned With',
    },
    {
      largeURL: 'https://www.everwallpaper.co.uk/cdn/shop/products/sleeping-cat-animal-wallpaper-mural-room.jpg?v=1640075162',
      thumbnailURL: 'https://wsrv.nl/?url=https://www.everwallpaper.co.uk/cdn/shop/products/sleeping-cat-animal-wallpaper-mural-room.jpg&w=300&h=300',
      title: 'The cat in the forest',
      description: 'Forest Felines: Where Cats Roam Wild.',
    }
  ];

</script>
