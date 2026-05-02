<template>

  <div class="container">
    <div class="row mb-5">
      <div class="col-12">
        <h1 class="display-5 fw-bold mb-4 border-bottom pb-3">Contact Us</h1>
        <p class="lead text-muted">We'd love to hear from you! Please fill out the form below and we'll get back to you as soon as possible.</p>
      </div>
    </div>

    <!-- Two column layout: Form on left, Contact info on right -->
    <div class="row g-4 mb-5">
      <!-- Contact Form Column -->
      <div class="col-lg-6">
        <!-- Demo Warning Alert -->
        <div class="alert alert-warning alert-dismissible fade show mb-4" role="alert">
          <strong>Demo Notice:</strong> This is a demonstration form. It will not actually send your message to anyone.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

        <form @submit.prevent="handleSubmit">
          <!-- Name field -->
          <div class="mb-3">
            <label for="name" class="form-label fw-semibold">Full Name</label>
            <input 
              v-model="formData.name" 
              type="text" 
              class="form-control form-control-lg" 
              id="name" 
              placeholder="Your full name"
              :disabled="isSubmitting"
              required
            >
          </div>

          <!-- Email field -->
          <div class="mb-3">
            <label for="email" class="form-label fw-semibold">Email Address</label>
            <input 
              v-model="formData.email" 
              type="email" 
              class="form-control form-control-lg" 
              id="email" 
              placeholder="your.email@example.com"
              :disabled="isSubmitting"
              required
            >
          </div>

          <!-- Phone field -->
          <div class="mb-3">
            <label for="phone" class="form-label fw-semibold">Phone Number</label>
            <input 
              v-model="formData.phone" 
              type="tel" 
              class="form-control form-control-lg" 
              id="phone" 
              placeholder="+1 (555) 000-0000"
              :disabled="isSubmitting"
            >
          </div>

          <!-- Subject field -->
          <div class="mb-3">
            <label for="subject" class="form-label fw-semibold">Subject</label>
            <select 
              v-model="formData.subject" 
              class="form-select form-select-lg" 
              id="subject"
              :disabled="isSubmitting"
              required
            >
              <option value="">-- Select a subject --</option>
              <option value="general">General Inquiry</option>
              <option value="support">Technical Support</option>
              <option value="feedback">Feedback</option>
              <option value="collaboration">Collaboration</option>
              <option value="other">Other</option>
            </select>
          </div>

          <!-- Message field -->
          <div class="mb-4">
            <label for="message" class="form-label fw-semibold">Message</label>
            <textarea 
              v-model="formData.message" 
              class="form-control" 
              id="message" 
              rows="6" 
              placeholder="Please enter your message here..."
              :disabled="isSubmitting"
              required
            ></textarea>
          </div>

          <!-- Submit button -->
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-start mb-3">
            <button type="submit" class="btn btn-primary btn-lg px-5" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else>
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Sending...
              </span>
            </button>
            <button type="reset" class="btn btn-outline-secondary btn-lg px-5" :disabled="isSubmitting">Clear</button>
          </div>

          <!-- Success message -->
          <div v-if="submitMessage" class="alert alert-success alert-dismissible fade show" role="alert">
            {{ submitMessage }}
            <button type="button" class="btn-close" @click="submitMessage = ''" aria-label="Close"></button>
          </div>

          <!-- Error message -->
          <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
            {{ errorMessage }}
            <button type="button" class="btn-close" @click="errorMessage = ''" aria-label="Close"></button>
          </div>
        </form>
      </div>

      <!-- Contact Information Column -->
      <div class="col-lg-6">
        <div class="bg-light rounded-3 p-4 h-100">
          <h2 class="fw-bold mb-4">Get In Touch</h2>
          <div class="row g-4">
            <div class="col-12">
              <div class="d-flex">
                <div class="flex-shrink-0">
                  <svg class="bi text-primary me-3" width="1.5em" height="1.5em"><use xlink:href="#geo-alt-fill"></use></svg>
                </div>
                <div>
                  <h5 class="fw-semibold mb-2">Address</h5>
                  <p class="text-muted mb-0">123 Cat Street<br>Feline City, FC 12345<br>United States</p>
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="d-flex">
                <div class="flex-shrink-0">
                  <svg class="bi text-primary me-3" width="1.5em" height="1.5em"><use xlink:href="#telephone-fill"></use></svg>
                </div>
                <div>
                  <h5 class="fw-semibold mb-2">Phone</h5>
                  <p class="text-muted mb-0"><a href="tel:+15550000000" class="text-decoration-none">+1 (555) 000-0000</a></p>
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="d-flex">
                <div class="flex-shrink-0">
                  <svg class="bi text-primary me-3" width="1.5em" height="1.5em"><use xlink:href="#envelope-fill"></use></svg>
                </div>
                <div>
                  <h5 class="fw-semibold mb-2">Email</h5>
                  <p class="text-muted mb-0"><a href="mailto:info@example.com" class="text-decoration-none">info@example.com</a></p>
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="d-flex">
                <div class="flex-shrink-0">
                  <svg class="bi text-primary me-3" width="1.5em" height="1.5em"><use xlink:href="#clock-fill"></use></svg>
                </div>
                <div>
                  <h5 class="fw-semibold mb-2">Business Hours</h5>
                  <p class="text-muted mb-0">Mon - Fri: 9:00 AM - 6:00 PM<br>Sat - Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Contact'
  }
</script>

<script setup>
  import { ref } from 'vue';

  const formData = ref({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const isSubmitting = ref(false);
  const submitMessage = ref('');
  const errorMessage = ref('');

  const handleSubmit = async () => {
    isSubmitting.value = true;
    errorMessage.value = '';
    submitMessage.value = '';

    try {
      // Here you would typically send the form data to your backend API
      // For now, we'll simulate a successful submission
      // eslint-disable-next-line no-console
      console.log('Form submitted:', formData.value); // skipcq: JS-0002
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      formData.value = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      };
      
      submitMessage.value = 'Thank you! Your message has been received. We\'ll get back to you soon!';
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        submitMessage.value = '';
      }, 10000);
    } catch (error) {
      errorMessage.value = 'An error occurred while sending your message. Please try again.';
      console.error('Form submission error:', error);
    } finally {
      isSubmitting.value = false;
    }
  };
</script>
