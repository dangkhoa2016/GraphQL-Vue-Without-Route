# Tóm tắt ảnh chụp màn hình

> 🌐 Language / Ngôn ngữ: [English](SCREENSHOTS_SUMMARY.md) | **Tiếng Việt**

Tài liệu này liệt kê các ảnh chụp màn hình trong thư mục `screenshots` của dự án **GraphQL-Vue-Without-Route**. Mỗi mục có: tên file (link tới ảnh), mô tả ngắn, và các view / component liên quan để dễ tham chiếu khi viết tài liệu hoặc kiểm thử UI.

---

## Danh sách ảnh (chi tiết)

- **[screenshots/app-loading.png](screenshots/app-loading.png)**
  - Mô tả: Màn hình khởi động/app loader (tiêu đề "GraphQL Vue js 3 Without vue-router" và biểu tượng/animation ở giữa, text "App is loading...").
  - Thành phần liên quan: [src/components/App.vue](../src/components/App.vue), [src/components/LoadingComponent.vue](../src/components/LoadingComponent.vue).
  - Ghi chú: Dùng cho splash/loading state khi app khởi tạo.

- **[screenshots/cat-detail-page.png](screenshots/cat-detail-page.png)**
  - Mô tả: Trang chi tiết một con mèo — ảnh đại diện bên trái, bảng thông tin (Age/Breed/Owner), phần "About" và gallery ảnh của mèo.
  - Thành phần liên quan: [src/views/CatDetail.vue](../src/views/CatDetail.vue), [src/components/PhotosBlock.vue](../src/components/PhotosBlock.vue), [src/components/PhotoBlock.vue](../src/components/PhotoBlock.vue), [src/components/Modal.vue](../src/components/Modal.vue).
  - Ghi chú: Thể hiện layout chính của trang `CatDetail` và list/gallery của ảnh mèo.

- **[screenshots/cat-detail-page-open-gallery.png](screenshots/cat-detail-page-open-gallery.png)**
  - Mô tả: Phiên bản mở gallery/preview (lightbox/modal) từ trang chi tiết mèo, kèm navigation (mũi tên trái/phải).
  - Thành phần liên quan: [src/components/SimpleGallery.vue](../src/components/SimpleGallery.vue), [src/components/Modal.vue](../src/components/Modal.vue), [src/components/PhotoBlock.vue](../src/components/PhotoBlock.vue).
  - Ghi chú: Kiểm tra behavior chuyển ảnh, caption và đóng modal.

- **[screenshots/cats-page.png](screenshots/cats-page.png)**
  - Mô tả: Trang danh sách các con mèo hiển thị dạng card grid; header/intro ở trên, pagination dưới cùng.
  - Thành phần liên quan: [src/views/CatsList.vue](../src/views/CatsList.vue), [src/components/CatBlock.vue](../src/components/CatBlock.vue), [src/components/CatsBlock.vue](../src/components/CatsBlock.vue), [src/components/Pagination.vue](../src/components/Pagination.vue).
  - Ghi chú: Dùng để kiểm thử filter/pagination và các trạng thái mỗi card (Like/View/Disable). Yêu cầu đăng nhập để xem.

- **[screenshots/contact-page.png](screenshots/contact-page.png)**
  - Mô tả: Trang liên hệ với form (left) và thông tin liên hệ (right).
  - Thành phần liên quan: [src/views/Contact.vue](../src/views/Contact.vue).
  - Ghi chú: Kiểm thử form validation và thông điệp demo notice.

- **[screenshots/failed-to-load-top-users.png](screenshots/failed-to-load-top-users.png)**
  - Mô tả: Trang features/gallery phần đầu và sau đó một vùng báo lỗi "Error while loading users" với nút Reload.
  - Thành phần liên quan: [src/components/TopUsers.vue](../src/components/TopUsers.vue), [src/components/ErrorLoadUsers.vue](../src/components/ErrorLoadUsers.vue) (hoặc tương tự), view: [src/views/MainPage.vue](../src/views/MainPage.vue).
  - Ghi chú: Dùng để mô phỏng trạng thái mạng lỗi / fallback UI.

- **[screenshots/feature-page.png](screenshots/feature-page.png)**
  - Mô tả: Trang Features với các mục "Diverse Cat Breeds", "Heartwarming Stories", gallery nhỏ và phần About.
  - Thành phần liên quan: [src/views/Features.vue](../src/views/Features.vue).
  - Ghi chú: Thích hợp cho tài liệu tính năng (marketing) hoặc mô tả nội dung trang.

- **[screenshots/home-page-open-gallery.png](screenshots/home-page-open-gallery.png)**
  - Mô tả: Trang chủ (Main) với gallery mở ở dạng lightbox/modal.
  - Thành phần liên quan: [src/views/MainPage.vue](../src/views/MainPage.vue), [src/components/SimpleGallery.vue](../src/components/SimpleGallery.vue).
  - Ghi chú: Kiểm thử photoswipe lightbox integration.

- **[screenshots/home-page-open-preview.png](screenshots/home-page-open-preview.png)**
  - Mô tả: Trang chủ với modal preview (ví dụ preview user hoặc photo preview) hiển thị nội dung tóm tắt.
  - Thành phần liên quan: [src/views/MainPage.vue](../src/views/MainPage.vue), [src/components/ModalUserSummary.vue](../src/components/ModalUserSummary.vue), [src/components/Modal.vue](../src/components/Modal.vue).
  - Ghi chú: Thể hiện interactive preview trước khi xem chi tiết.

- **[screenshots/loading-user-modal-loading-skeleton.png](screenshots/loading-user-modal-loading-skeleton.png)**
  - Mô tả: Modal người dùng ở trạng thái loading (skeleton placeholders cho avatar và text lines).
  - Thành phần liên quan: [src/components/ModalUserSummary.vue](../src/components/ModalUserSummary.vue), [src/components/LoadingComponent.vue](../src/components/LoadingComponent.vue).
  - Ghi chú: Dùng để kiểm thử UX khi chờ dữ liệu người dùng.

- **[screenshots/require-login-to-follow-user.png](screenshots/require-login-to-follow-user.png)**
  - Mô tả: Thông báo (toast) yêu cầu đăng nhập để theo dõi người dùng.
  - Thành phần liên quan: [src/components/ToggleFollowUser.vue](../src/components/ToggleFollowUser.vue), [src/components/Toast.vue](../src/components/Toast.vue), view: [src/views/ViewUser.vue](../src/views/ViewUser.vue).
  - Ghi chú: Authentication check trước khi cho phép follow action.

- **[screenshots/require-login-to-view-user-cats.png](screenshots/require-login-to-view-user-cats.png)**
  - Mô tả: Notice/toast thông báo cần đăng nhập để xem cats của user (trong tab Cats).
  - Thành phần liên quan: [src/views/ViewUser.vue](../src/views/ViewUser.vue), [src/components/Toast.vue](../src/components/Toast.vue), [src/components/CatsByUser.vue](../src/components/CatsByUser.vue).
  - Ghi chú: Protected content - yêu cầu xác thực người dùng.

- **[screenshots/require-login-to-view-user-photos.png](screenshots/require-login-to-view-user-photos.png)**
  - Mô tả: Notice/toast yêu cầu đăng nhập để xem photos của user (trong tab Photos).
  - Thành phần liên quan: [src/views/ViewUser.vue](../src/views/ViewUser.vue), [src/components/PhotosByUser.vue](../src/components/PhotosByUser.vue).
  - Ghi chú: Protected user photos - hiện thị toast reminding cần đăng nhập.

- **[screenshots/require-login-when-access-cats-page.png](screenshots/require-login-when-access-cats-page.png)**
  - Mô tả: Trang cats yêu cầu đăng nhập — hiển thị form sign-in (giao diện page-level sign in).
  - Thành phần liên quan: [src/views/Login.vue](../src/views/Login.vue), logic component switcher (App.vue).
  - Ghi chú: DynamicComponent sẽ chuyển tới Login component khi chưa authenticate.

- **[screenshots/user-detail-page-tab-about.png](screenshots/user-detail-page-tab-about.png)**
  - Mô tả: Trang chi tiết người dùng — tab "About" hiển thị bio, thống kê (followers, likes received, etc.).
  - Thành phần liên quan: [src/views/ViewUser.vue](../src/views/ViewUser.vue), [src/components/UserDetail.vue](../src/components/UserDetail.vue), [src/components/SimpleTabs.vue](../src/components/SimpleTabs.vue).
  - Ghi chú: Tab mặc định hoặc tab đầu tiên hiển thị thông tin tổng quan.

- **[screenshots/user-detail-page-tab-cats.png](screenshots/user-detail-page-tab-cats.png)**
  - Mô tả: View user — tab "Cats" hiển thị list card các cat của user.
  - Thành phần liên quan: [src/views/ViewUser.vue](../src/views/ViewUser.vue), [src/components/CatsByUser.vue](../src/components/CatsByUser.vue), [src/components/CatBlock.vue](../src/components/CatBlock.vue).
  - Ghi chú: Có thể rỗng hoặc yêu cầu đăng nhập nếu user chưa xác thực.

- **[screenshots/user-detail-page-tab-photos.png](screenshots/user-detail-page-tab-photos.png)**
  - Mô tả: View user — tab "Photos" (gallery thumbnails) và illustration khi rỗng/placeholder.
  - Thành phần liên quan: [src/views/ViewUser.vue](../src/views/ViewUser.vue), [src/components/PhotosByUser.vue](../src/components/PhotosByUser.vue), [src/components/SimpleGallery.vue](../src/components/SimpleGallery.vue).
  - Ghi chú: Protected content - kiểm tra authentication trước khi tải.

- **[screenshots/user-page-open-gallery.png](screenshots/user-page-open-gallery.png)**
  - Mô tả: User page với gallery mở modal/lightbox cho ảnh người dùng.
  - Thành phần liên quan: [src/components/SimpleGallery.vue](../src/components/SimpleGallery.vue), [src/components/Modal.vue](../src/components/Modal.vue), [src/components/PhotosByUser.vue](../src/components/PhotosByUser.vue).
  - Ghi chú: Kiểm tra photo gallery interaction.

- **[screenshots/users-page.png](screenshots/users-page.png)**
  - Mô tả: Trang danh sách người dùng (grid card) với avatar, tên, follow/preview buttons, pagination.
  - Thành phần liên quan: [src/views/UsersList.vue](../src/views/UsersList.vue), [src/components/UserBlock2.vue](../src/components/UserBlock2.vue), [src/components/UsersBlock.vue](../src/components/UsersBlock.vue), [src/components/Pagination.vue](../src/components/Pagination.vue).
  - Ghi chú: Hiển thị follow button và preview user modal action.

- **[screenshots/users-page-open-preview.png](screenshots/users-page-open-preview.png)**
  - Mô tả: Trang người dùng với modal preview mở, hiển thị thông tin tóm tắt của một user.
  - Thành phần liên quan: [src/views/UsersList.vue](../src/views/UsersList.vue), [src/components/ModalUserSummary.vue](../src/components/ModalUserSummary.vue), [src/components/UserSummary.vue](../src/components/UserSummary.vue).
  - Ghi chú: Quick preview trước khi truy cập trang chi tiết đầy đủ của user.

---

## Ghi chú chung & gợi ý sử dụng

### Phân nhóm theo loại
- **Pages chính**: cats-page, users-page, feature-page, contact-page, home-page-open-*
- **Modals/Galleries/Previews**: *open-gallery, *open-preview, loading-user-modal-loading-skeleton
- **States**: app-loading, failed-to-load-top-users, require-login-*
- **Chi tiết trang**: cat-detail-page*, user-detail-page-tab-*

### Dùng tài liệu này khi cần
- Viết README trang hoặc tài liệu tính năng (screenshots minh họa từng trang chính)
- Tạo test/capture cho UI regression testing
- Kiểm tra trạng thái lỗi/loading, modal/gallery behavior và authentication flow
- Hướng dẫn cho contributors hoặc tester về các màn hình chính

### Đặc điểm của dự án
- **Không có Vue Router**: Sử dụng `DynamicComponent.vue` để chuyển đổi giữa các views
- **Không cần build tools**: Load component trực tiếp từ browser với vue3-sfc-loader
- **Mock API**: Sử dụng axios-mock-adapter để mô phỏng GraphQL queries với sample data
- **Authentication**: JWT token stored in LocalStorage, auth state trong reactive store
