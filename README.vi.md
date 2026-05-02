# GraphQL Vue Không Dùng Router

> 🌐 Language / Ngôn ngữ: [English](README.md) | **Tiếng Việt**

Một ứng dụng Vue.js 3 hiện đại, tương tác, minh họa tích hợp GraphQL và tải thành phần động **không cần công cụ build**. Dự án này giới thiệu một nền tảng xã hội theo chủ đề mèo với xác thực người dùng, quản lý nội dung và các tính năng quản trị.

## 📚 Liên kết tài liệu
- **Tài liệu ảnh chụp màn hình**: [screenshots/SCREENSHOTS_SUMMARY.md](screenshots/SCREENSHOTS_SUMMARY.md)
- **Tài liệu ảnh chụp màn hình (Tiếng Việt)**: [screenshots/SCREENSHOTS_SUMMARY.vi.md](screenshots/SCREENSHOTS_SUMMARY.vi.md)

## 🔗 Server Backend
Dự án frontend này được thiết kế để hoạt động với server backend **[Fastify-Mercurius-GraphQL](https://github.com/dangkhoa2016/Fastify-Mercurius-GraphQL)**. Backend cung cấp tất cả các API GraphQL để quản lý người dùng, mèo, ảnh và các tương tác xã hội. Hãy đảm bảo rằng server backend đang chạy trước khi sử dụng ứng dụng frontend.

## Tổng quan

Dự án này được thiết kế để giúp lập trình viên học và hiểu:
- **Vue.js 3** - Framework JavaScript phản ứng hiện đại
- **GraphQL** - Ngôn ngữ truy vấn cho API
- **Single File Components (SFC)** - Không cần công cụ build hoặc npm
- **Thiết kế đáp ứng** - Tích hợp Bootstrap 5
- **Quản lý trạng thái** - Mẫu store phản ứng
- **Điều hướng phía client** - Chuyển đổi component động

## ✨ Tính năng

### Tính năng cho người dùng
- **Quản lý người dùng**
  - Đăng ký và đăng nhập với xác thực JWT
  - Theo dõi/bỏ theo dõi người dùng khác
  - Hồ sơ người dùng kèm thống kê
  - Khám phá và duyệt người dùng
  
- **Quản lý mèo**
  - Duyệt danh mục mèo phong phú với phân trang
  - Thích/bỏ thích mèo
  - Xem thông tin chi tiết về mèo, bao gồm ảnh
  - Lọc mèo theo người dùng hoặc danh mục
  
- **Quản lý ảnh**
  - Thư viện ảnh với bố cục lưới đáp ứng
  - Thích/bỏ thích ảnh
  - Xem ảnh theo mèo hoặc theo người dùng
  - Thống kê và tương tác với ảnh
  
- **Tương tác xã hội**
  - Hệ thống theo dõi để cập nhật các nhà sáng tạo yêu thích
  - Hệ thống thích cho mèo và ảnh
  - Bảng điều khiển thống kê người dùng
  - Bảng xếp hạng người dùng hàng đầu

### Tính năng cho quản trị viên
- Quản lý tài khoản người dùng (bật/tắt)
- Quản lý mục mèo (bật/tắt)
- Quản lý mục ảnh (bật/tắt)
- Quản lý vai trò người dùng

### UI/UX
- Thiết kế đáp ứng bằng Bootstrap 5
- Hộp thoại modal để xác nhận và xem chi tiết
- Thông báo toast cho phản hồi người dùng
- Chuyển trang mượt mà
- Thư viện lightbox ảnh với PhotoSwipe
- Chỉ báo tải và xử lý lỗi
- Thành phần accordion và tab
- Phân trang động

## 🏗️ Cấu trúc dự án

```bash
src/
├── components/          # Các single-file component của Vue
│   ├── App.vue                    # Component gốc
│   ├── AppHeader.vue              # Thanh điều hướng đầu trang
│   ├── AppFooter.vue              # Chân trang
│   ├── DynamicComponent.vue       # Bộ chuyển đổi component kiểu router
│   ├── CatBlock.vue               # Component thẻ mèo
│   ├── UserBlock*.vue             # Các biến thể hiển thị người dùng
│   ├── Modal*.vue                 # Hộp thoại modal
│   ├── Toast.vue                  # Toast thông báo
│   └── ...                        # Các component UI khác
│
├── views/               # Các component trang
│   ├── MainPage.vue               # Trang chủ / trang giới thiệu
│   ├── CatsList.vue               # Tất cả mèo
│   ├── CatDetail.vue              # Chi tiết một con mèo
│   ├── UsersList.vue              # Tất cả người dùng
│   ├── UserProfile.vue            # Hồ sơ người dùng
│   ├── ViewUser.vue               # Hồ sơ của người dùng khác
│   ├── Login.vue                  # Xác thực
│   ├── Features.vue               # Trang tính năng
│   ├── Pricing.vue                # Trang giá
│   ├── FAQs.vue                   # Trang câu hỏi thường gặp
│   ├── About.vue                  # Trang giới thiệu
│   └── Contact.vue                # Trang liên hệ
│
├── stores/              # Quản lý trạng thái phản ứng
│   ├── authStore.mjs              # Trạng thái xác thực
│   ├── catsStore.mjs              # Kho dữ liệu mèo
│   ├── usersStore.mjs             # Kho dữ liệu người dùng
│   ├── photosStore.mjs            # Kho dữ liệu ảnh
│   ├── toggleLikesStore.mjs       # Tương tác thích
│   ├── toggleFollowsStore.mjs     # Tương tác theo dõi
│   ├── toggleStatusesStore.mjs    # Trạng thái bật/tắt
│   ├── homeStore.mjs              # Trạng thái trang chủ
│   └── graphQLStore.mjs           # Các truy vấn GraphQL
│
├── libs/                # Các mô-đun tiện ích
│   ├── api.mjs                    # Axios API với mock adapter
│   ├── helpers.mjs                # Tiện ích tổng quát
│   ├── catHelpers.mjs             # Tiện ích dành riêng cho mèo
│   ├── userHelpers.mjs            # Tiện ích dành riêng cho người dùng
│   ├── dateTimeHelpers.mjs        # Tiện ích ngày/giờ
│   ├── localStorageHelpers.mjs    # Wrapper cho LocalStorage
│   ├── eventBus.mjs               # Bộ phát sự kiện
│   ├── loadModuleHelper.mjs       # Bộ tải component động
│   └── abortablePromise.mjs       # Tác vụ bất đồng bộ có thể hủy
│
├── assets/              # Tài nguyên tĩnh
│   ├── style.css                  # Kiểu toàn cục
│   ├── start.css                  # Kiểu khởi tạo
│   └── images/                    # Tệp ảnh
│
└── sample-data/         # Dữ liệu giả cho phát triển
    ├── cat.json                   # Dữ liệu một con mèo
    ├── cats-list.json             # Nhiều con mèo
    ├── user.json                  # Dữ liệu một người dùng
    ├── users-list.json            # Nhiều người dùng
    ├── photos-by-cat.json         # Ảnh theo mèo
    ├── like-cat.json              # Phản hồi thao tác thích
    ├── follow.json                # Phản hồi thao tác theo dõi
    └── ...                        # Các dữ liệu mẫu khác
````

## 🚀 Công nghệ sử dụng

### Framework lõi

* **[Vue.js 3](https://vuejs.org/)** - Framework JavaScript tiến bộ
* **[vue3-sfc-loader v0.8.4](https://github.com/FranckFreiburger/vue3-sfc-loader)** - Tải tệp .vue trực tiếp trong trình duyệt mà không cần bước build

### API & dữ liệu

* **[GraphQL](https://graphql.org/)** - Ngôn ngữ truy vấn cho API
* **[Axios](https://axios-http.com/)** - HTTP client
* **[axios-mock-adapter](https://github.com/ctimmerm/axios-mock-adapter)** - Giả lập request HTTP trong quá trình phát triển

### Giao diện & kiểu dáng

* **[Bootstrap 5](https://getbootstrap.com/)** - Framework CSS
* **[PhotoSwipe v5.4.3](https://photoswipe.com/)** - Thư viện thư viện ảnh

### Lưu trữ

* **LocalStorage API** - Dùng để lưu token xác thực và dữ liệu người dùng

## 📋 Yêu cầu trước

* Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)
* Kết nối Internet (cho các tài nguyên CDN)
* Trình soạn thảo văn bản hoặc IDE

## ⚙️ Bắt đầu

### Tùy chọn 1: Dùng gói `serve` của npm

```bash
# Cài serve toàn cục (nếu chưa cài)
npm install -g serve

# Di chuyển đến thư mục dự án
cd GraphQL-Vue-Without-Route

# Khởi động máy chủ phát triển
serve .

# Truy cập tại http://localhost:3000 hoặc http://localhost:5000
```

### Tùy chọn 2: Dùng `zrok` để chia sẻ từ xa

```bash
# Chia sẻ công khai (cần zrok)
zrok share public --backend-mode web .
```

### Tùy chọn 3: Dùng bất kỳ máy chủ HTTP tĩnh nào

```bash
# Dùng Python 3
python -m http.server 8000

# Dùng http-server của Node.js
npx http-server .

# Dùng Ruby
ruby -run -ehttpd . -p8000
```

Sau đó mở trình duyệt và truy cập:

* `http://localhost:8000` (hoặc cổng bạn chọn)
* `http://localhost:3000`
* `http://localhost:8080`

## 🔧 Cấu hình

### Endpoint API

Chỉnh biến `endpoint` trong [src/libs/api.mjs](src/libs/api.mjs):

```javascript
// Dành cho máy chủ GraphQL cục bộ:
export const endpoint = 'http://localhost:4000';

// Dành cho chế độ chỉ chạy trên trình duyệt (dùng dữ liệu giả):
export const endpoint = '/';
```

### Dữ liệu giả

Dự án dùng `axios-mock-adapter` để chặn các request GraphQL và trả về dữ liệu giả từ [src/sample-data/](src/sample-data/) khi endpoint được đặt là `/`.

## 📚 Cách hoạt động

### Không cần công cụ build

Dự án này không cần các công cụ build của Node.js. Các component được tải động tại thời gian chạy bằng:

* `vue3-sfc-loader` - Phân tích và biên dịch tệp .vue trong trình duyệt
* ES modules - Để tổ chức mã thành các mô-đun
* URL trực tiếp - Để liên kết tới các tệp component

### Tải component

`DynamicComponent.vue` đóng vai trò thay thế router:

```javascript
// Chuyển đổi giữa các view mà không cần Vue Router
<DynamicComponent :component-name="'MainPage'" />
```

### Quản lý trạng thái

Các store phản ứng sử dụng Composition API của Vue:

```javascript
// Cấu trúc store ví dụ
const authStore = reactive({
  authInfo: null,
  isAuthenticated: false,
  isAdmin: false,
});
```

### Truy vấn GraphQL

Tất cả việc lấy dữ liệu đều dùng GraphQL với mock adapter cho môi trường phát triển:

```javascript
api.post(`/graphql`, {
  query: `query { cats { id name age } }`
})
```

## 🎓 Tài nguyên học tập

### Vue.js 3

* [Tài liệu chính thức](https://vuejs.org/)
* [Hướng dẫn Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)

### GraphQL

* [Trang chính thức GraphQL](https://graphql.org/)
* [Học GraphQL](https://graphql.org/learn/)

### Bootstrap 5

* [Tài liệu Bootstrap](https://getbootstrap.com/docs/5.3/)

### vue3-sfc-loader

* [Kho dự án](https://github.com/FranckFreiburger/vue3-sfc-loader)

## 📝 Dữ liệu mẫu

Các phản hồi GraphQL mẫu được lưu trong [src/sample-data/](src/sample-data/) để phát triển và kiểm thử mà không cần backend thật:

* `cats-list.json` - Nhiều con mèo
* `users-list.json` - Nhiều người dùng
* `login.json` - Phản hồi đăng nhập
* `like-cat.json` - Phản hồi thao tác thích
* `follow.json` - Phản hồi thao tác theo dõi

## 🔐 Xác thực

Ứng dụng dùng xác thực dựa trên token JWT với:

* **Đăng nhập**: Tên người dùng/email + mật khẩu
* **Lưu token**: LocalStorage (`authInfo`)
* **Kiểm tra admin**: Vai trò người dùng = `'admin'`
* **Duy trì phiên**: Khôi phục token khi tải lại trang

Thông tin đăng nhập mẫu (từ dữ liệu giả):

* Email: [user@example.com](mailto:user@example.com)
* Mật khẩu: password123

## 🎨 Tùy biến

### Thêm view mới

1. Tạo một tệp `.vue` mới trong [src/views/](src/views/)
2. Tham chiếu nó trong component điều hướng
3. Dùng `DynamicComponent` để tải nó

### Thêm component mới

1. Tạo tệp `.vue` trong [src/components/](src/components/)
2. Import trong component cha
3. Đăng ký bằng `defineAsyncComponent()` để tải lười

### Kiểu dáng

* Kiểu toàn cục: [src/assets/style.css](src/assets/style.css)
* Tiện ích Bootstrap: Dùng trực tiếp các class Bootstrap trong template
* CSS tùy chỉnh: Thêm vào thẻ `<style>` của component

## 🐛 Khắc phục sự cố

### Component không tải được?

* Kiểm tra console của trình duyệt để xem lỗi
* Xác minh đường dẫn tệp là đúng
* Đảm bảo có kết nối Internet (cho tài nguyên CDN)

### API trả về 404?

* Kiểm tra cấu hình `endpoint` trong [src/libs/api.mjs](src/libs/api.mjs)
* Với dữ liệu giả, đảm bảo endpoint được đặt là `/`
* Với máy chủ thật, xác minh đúng URL endpoint GraphQL

### LocalStorage không lưu được?

* Kiểm tra trình duyệt có cho phép LocalStorage với miền của bạn không
* Thử xóa cache trình duyệt và dùng chế độ riêng tư/ẩn danh
* Kiểm tra chính sách bảo mật của trình duyệt

## 📄 Giấy phép

Dự án này được cấp phép theo giấy phép MIT - xem tệp [LICENSE](LICENSE) để biết chi tiết.

## 👥 Tác giả

* **Dang khoa** - [dangkhoa2016](https://github.com/dangkhoa2016)

## 🤝 Đóng góp

Hoan nghênh mọi đóng góp! Bạn có thể:

* Báo lỗi
* Đề xuất tính năng
* Gửi pull request
* Cải thiện tài liệu

## 🔗 Dự án liên quan

* [github.com/dangkhoa2016/GraphQL-Vue-With-Route](https://github.com/dangkhoa2016/GraphQL-Vue-With-Route) - Phiên bản dùng Vue Router
* [github.com/dangkhoa2016/GraphQL-Vue-With-Route-Vite](https://github.com/dangkhoa2016/GraphQL-Vue-With-Route-Vite) - Phiên bản Vite có routing

## 📞 Hỗ trợ

Nếu có câu hỏi hoặc sự cố, vui lòng mở issue trên GitHub hoặc liên hệ tác giả.
