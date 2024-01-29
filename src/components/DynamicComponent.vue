<template>

  <div class=''>
    <LoadingComponent v-if="isLoading" :component-path="componentPath" />
    <ErrorLoadComponent v-else-if="isError" :component-path="componentPath" />
    <div id='dynamic-component' class=''>
      <transition :name="transitionName" mode="out-in"
        @before-leave="onBefore"
        @before-enter="onBeforeEnter"
        @after-enter="onAfter">
        <component v-if='!isLoading && !isError' :is="resolvedComponent" />
      </transition>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'DynamicComponent',
  }
</script>

<script setup>

  import { ref, shallowRef, watch, inject } from 'vue';

  import { createAbortablePromise } from '/src/libs/abortablePromise.mjs';
  import { getFile, getComponentPath, scrollToTop } from '/src/libs/helpers.mjs';

  import LoadingComponent from './LoadingComponent.vue';
  import ErrorLoadComponent from './ErrorLoadComponent.vue';


  const props = defineProps({
    componentName: {
      type: String,
      required: false,
      default: ''
    },
    transitionName: {
      type: String,
      required: false,
      default: ''
    },
  });

  const isComponentLoaded = inject('isComponentLoaded');

  const isError = ref(false);
  const isLoading = ref(false);
  const resolvedComponent = shallowRef(null);
  const componentPath = ref('');
  let cancelablePromise = null;

  const onBefore = () => {
    document.body.classList.add('overflow-hidden');
  };

  const onAfter = () => {
    document.body.classList.remove('overflow-hidden');
  };

  const onBeforeEnter = () => {
    // scroll to top
    scrollToTop();
  };

  const fetchModule = () => {
    return createAbortablePromise((abortSignal) => {
      return new Promise((resolve, reject) => {
        // Handle abort signal
        abortSignal.addEventListener('abort', () => {
          return reject(
            new Error(`Promise aborted ${componentPath.value}`)
          );
        });

        // Define an async function inside the executor to handle the asynchronous logic
        const fetchAsync = async () => {
          try {
            await getFile(componentPath.value, true);

            if (abortSignal.aborted) {
              return reject(
                new Error(`Cancelled import: ${componentPath.value}`)
              );
            }

            // Assuming `import` is the async operation you want to wait for
            const module = await import(componentPath.value);
            return resolve(module);
          } catch (error) {
            console.log(`Cannot load ${componentPath.value}`, error);
            return resolve(null); // Resolve with null in case of error
          }
        };

        // Call the async function
        fetchAsync().catch(reject); // Ensure that any errors are properly propagated
      });
    }, 22000);
  };

  const loadComponent = async (name) => {
    if (!name)
      return;

    isError.value = false;
    componentPath.value = getComponentPath(name, true);

    if (isComponentLoaded(componentPath.value)) {
      // console.log('Component already loaded', componentPath.value);
      isLoading.value = false;
      document.getElementById('dynamic-component').classList.remove('d-none');
      resolvedComponent.value = await import(componentPath.value);
      return;
    }

    document.getElementById('dynamic-component').classList.add('d-none');

    isLoading.value = true;

    cancelablePromise = fetchModule();

    cancelablePromise.then(module => {

      if (module) {
        resolvedComponent.value = module;
        // console.log('Component loaded', componentPath.value);
        document.getElementById('dynamic-component').classList.remove('d-none');
      }
      else
        isError.value = true;

      isLoading.value = false;
    }).catch((/*error*/) => {
      // console.log(`Cannot load ${name}`, error);
      resolvedComponent.value = null;
      document.body.classList.remove('overflow-hidden');
    });
  };


  watch(() => props.componentName, (newVal/*, oldVal*/) => {
    // console.log('componentName changed', `from: ${oldVal || 'none'} to ${newVal || 'none'}`, cancelablePromise);

    if (cancelablePromise) {
      // console.log('cancel component', oldVal || 'none');
      cancelablePromise.cancel();
      cancelablePromise = null;
    }

    resolvedComponent.value = null;
    loadComponent(newVal);
  });

</script>
