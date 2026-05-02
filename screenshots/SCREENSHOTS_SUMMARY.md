# Screenshots Summary

> 🌐 Language / Ngôn ngữ: **English** | [Tiếng Việt](SCREENSHOTS_SUMMARY.vi.md)

This document lists the screenshots in the `screenshots` folder of the **GraphQL-Vue-Without-Route** project. Each entry includes: filename (link to image), short description, and related views/components for easy reference when writing documentation or testing UI.

---

## Screenshots List (Detailed)

- **[screenshots/app-loading.png](screenshots/app-loading.png)**
  - Description: App startup/loader screen (title "GraphQL Vue js 3 Without vue-router" with icon/animation in the center, text "App is loading...").
  - Related Components: [src/components/App.vue](../src/components/App.vue), [src/components/LoadingComponent.vue](../src/components/LoadingComponent.vue).
  - Note: Used for splash/loading state when app initializes.

- **[screenshots/cat-detail-page.png](screenshots/cat-detail-page.png)**
  - Description: Cat detail page — cat image on the left, info table (Age/Breed/Owner), "About" section and photo gallery.
  - Related Components: [src/views/CatDetail.vue](../src/views/CatDetail.vue), [src/components/PhotosBlock.vue](../src/components/PhotosBlock.vue), [src/components/PhotoBlock.vue](../src/components/PhotoBlock.vue), [src/components/Modal.vue](../src/components/Modal.vue).
  - Note: Shows main layout of `CatDetail` page and cat photo list/gallery.

- **[screenshots/cat-detail-page-open-gallery.png](screenshots/cat-detail-page-open-gallery.png)**
  - Description: Cat detail page with gallery/preview opened (lightbox/modal) with navigation arrows (left/right).
  - Related Components: [src/components/SimpleGallery.vue](../src/components/SimpleGallery.vue), [src/components/Modal.vue](../src/components/Modal.vue), [src/components/PhotoBlock.vue](../src/components/PhotoBlock.vue).
  - Note: Check photo switching behavior, captions and modal closing.

- **[screenshots/cats-page.png](screenshots/cats-page.png)**
  - Description: Cat list page showing card grid; header/intro on top, pagination at bottom.
  - Related Components: [src/views/CatsList.vue](../src/views/CatsList.vue), [src/components/CatBlock.vue](../src/components/CatBlock.vue), [src/components/CatsBlock.vue](../src/components/CatsBlock.vue), [src/components/Pagination.vue](../src/components/Pagination.vue).
  - Note: Test filter/pagination and each card state (Like/View/Disable). Requires login to view.

- **[screenshots/contact-page.png](screenshots/contact-page.png)**
  - Description: Contact page with form (left) and contact information (right).
  - Related Components: [src/views/Contact.vue](../src/views/Contact.vue).
  - Note: Test form validation and demo notice messages.

- **[screenshots/failed-to-load-top-users.png](screenshots/failed-to-load-top-users.png)**
  - Description: Features/gallery page with error notification "Error while loading users" and Reload button.
  - Related Components: [src/components/TopUsers.vue](../src/components/TopUsers.vue), [src/components/ErrorLoadUsers.vue](../src/components/ErrorLoadUsers.vue), view: [src/views/MainPage.vue](../src/views/MainPage.vue).
  - Note: Used to simulate network error state / fallback UI.

- **[screenshots/feature-page.png](screenshots/feature-page.png)**
  - Description: Features page with sections "Diverse Cat Breeds", "Heartwarming Stories", small gallery and About section.
  - Related Components: [src/views/Features.vue](../src/views/Features.vue).
  - Note: Good for feature documentation (marketing) or page content description.

- **[screenshots/home-page-open-gallery.png](screenshots/home-page-open-gallery.png)**
  - Description: Home page (Main) with gallery opened in lightbox/modal format.
  - Related Components: [src/views/MainPage.vue](../src/views/MainPage.vue), [src/components/SimpleGallery.vue](../src/components/SimpleGallery.vue).
  - Note: Test photoswipe lightbox integration.

- **[screenshots/home-page-open-preview.png](screenshots/home-page-open-preview.png)**
  - Description: Home page with preview modal (e.g., user or photo preview) showing summary content.
  - Related Components: [src/views/MainPage.vue](../src/views/MainPage.vue), [src/components/ModalUserSummary.vue](../src/components/ModalUserSummary.vue), [src/components/Modal.vue](../src/components/Modal.vue).
  - Note: Shows interactive preview before viewing full details.

- **[screenshots/loading-user-modal-loading-skeleton.png](screenshots/loading-user-modal-loading-skeleton.png)**
  - Description: User modal in loading state (skeleton placeholders for avatar and text lines).
  - Related Components: [src/components/ModalUserSummary.vue](../src/components/ModalUserSummary.vue), [src/components/LoadingComponent.vue](../src/components/LoadingComponent.vue).
  - Note: Test UX when waiting for user data.

- **[screenshots/require-login-to-follow-user.png](screenshots/require-login-to-follow-user.png)**
  - Description: Toast notification requiring login to follow a user.
  - Related Components: [src/components/ToggleFollowUser.vue](../src/components/ToggleFollowUser.vue), [src/components/Toast.vue](../src/components/Toast.vue), view: [src/views/ViewUser.vue](../src/views/ViewUser.vue).
  - Note: Authentication check before allowing follow action.

- **[screenshots/require-login-to-view-user-cats.png](screenshots/require-login-to-view-user-cats.png)**
  - Description: Toast notification requiring login to view user's cats (in Cats tab).
  - Related Components: [src/views/ViewUser.vue](../src/views/ViewUser.vue), [src/components/Toast.vue](../src/components/Toast.vue), [src/components/CatsByUser.vue](../src/components/CatsByUser.vue).
  - Note: Protected content - requires user authentication.

- **[screenshots/require-login-to-view-user-photos.png](screenshots/require-login-to-view-user-photos.png)**
  - Description: Toast notification requiring login to view user's photos (in Photos tab).
  - Related Components: [src/views/ViewUser.vue](../src/views/ViewUser.vue), [src/components/PhotosByUser.vue](../src/components/PhotosByUser.vue).
  - Note: Protected user photos - reminder toast for unauthenticated users.

- **[screenshots/require-login-when-access-cats-page.png](screenshots/require-login-when-access-cats-page.png)**
  - Description: Cats page requiring login — shows sign-in form (page-level login interface).
  - Related Components: [src/views/Login.vue](../src/views/Login.vue), component switcher logic (App.vue).
  - Note: DynamicComponent switches to Login component when not authenticated.

- **[screenshots/user-detail-page-tab-about.png](screenshots/user-detail-page-tab-about.png)**
  - Description: User detail page — "About" tab showing bio, statistics (followers, likes received, etc.).
  - Related Components: [src/views/ViewUser.vue](../src/views/ViewUser.vue), [src/components/UserDetail.vue](../src/components/UserDetail.vue), [src/components/SimpleTabs.vue](../src/components/SimpleTabs.vue).
  - Note: Default or first tab showing overview information.

- **[screenshots/user-detail-page-tab-cats.png](screenshots/user-detail-page-tab-cats.png)**
  - Description: User page — "Cats" tab showing list of user's cat cards.
  - Related Components: [src/views/ViewUser.vue](../src/views/ViewUser.vue), [src/components/CatsByUser.vue](../src/components/CatsByUser.vue), [src/components/CatBlock.vue](../src/components/CatBlock.vue).
  - Note: Can be empty or require login if user not authenticated.

- **[screenshots/user-detail-page-tab-photos.png](screenshots/user-detail-page-tab-photos.png)**
  - Description: User page — "Photos" tab (gallery thumbnails) and placeholder/empty illustration.
  - Related Components: [src/views/ViewUser.vue](../src/views/ViewUser.vue), [src/components/PhotosByUser.vue](../src/components/PhotosByUser.vue), [src/components/SimpleGallery.vue](../src/components/SimpleGallery.vue).
  - Note: Protected content - checks authentication before loading.

- **[screenshots/user-page-open-gallery.png](screenshots/user-page-open-gallery.png)**
  - Description: User page with gallery opened as modal/lightbox for user photos.
  - Related Components: [src/components/SimpleGallery.vue](../src/components/SimpleGallery.vue), [src/components/Modal.vue](../src/components/Modal.vue), [src/components/PhotosByUser.vue](../src/components/PhotosByUser.vue).
  - Note: Test photo gallery interaction.

- **[screenshots/users-page.png](screenshots/users-page.png)**
  - Description: User list page (grid cards) with avatar, name, follow/preview buttons, pagination.
  - Related Components: [src/views/UsersList.vue](../src/views/UsersList.vue), [src/components/UserBlock2.vue](../src/components/UserBlock2.vue), [src/components/UsersBlock.vue](../src/components/UsersBlock.vue), [src/components/Pagination.vue](../src/components/Pagination.vue).
  - Note: Shows follow button and user preview modal action.

- **[screenshots/users-page-open-preview.png](screenshots/users-page-open-preview.png)**
  - Description: Users page with preview modal open showing summary information of a user.
  - Related Components: [src/views/UsersList.vue](../src/views/UsersList.vue), [src/components/ModalUserSummary.vue](../src/components/ModalUserSummary.vue), [src/components/UserSummary.vue](../src/components/UserSummary.vue).
  - Note: Quick preview before accessing full user detail page.

---

## General Notes & Usage Tips

### Grouping by Type
- **Main Pages**: cats-page, users-page, feature-page, contact-page, home-page-open-*
- **Modals/Galleries/Previews**: *open-gallery, *open-preview, loading-user-modal-loading-skeleton
- **States**: app-loading, failed-to-load-top-users, require-login-*
- **Page Details**: cat-detail-page*, user-detail-page-tab-*

### Use This Document When
- Writing README pages or feature documentation (screenshots illustrating main pages)
- Creating UI regression tests/captures
- Checking error/loading states, modal/gallery behavior and authentication flow
- Guiding contributors or testers about main screens

### Project Characteristics
- **No Vue Router**: Uses `DynamicComponent.vue` to switch between views
- **No Build Tools**: Loads components directly in browser with vue3-sfc-loader
- **Mock API**: Uses axios-mock-adapter to mock GraphQL queries with sample data
- **Authentication**: JWT token stored in LocalStorage, auth state in reactive store
