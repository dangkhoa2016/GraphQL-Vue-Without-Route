
# GraphQL Vue Without Route

> 🌐 Language / Ngôn ngữ: **English** | [Tiếng Việt](README.vi.md)

A modern, interactive Vue.js 3 application that demonstrates GraphQL integration and dynamic component loading **without build tools**. This project showcases a cat-themed social platform with user authentication, content management, and administrative features.

## 📚 Documentation Links
- **Screenshot documentation**: [screenshots/SCREENSHOTS_SUMMARY.md](screenshots/SCREENSHOTS_SUMMARY.md)
- **Screenshot documentation (Vietnamese)**: [screenshots/SCREENSHOTS_SUMMARY.vi.md](screenshots/SCREENSHOTS_SUMMARY.vi.md)

## 🔗 Backend Server
This frontend project is designed to work with the **[Fastify-Mercurius-GraphQL](https://github.com/dangkhoa2016/Fastify-Mercurius-GraphQL)** backend server. The backend provides all GraphQL APIs for user management, cats, photos, and social interactions. Make sure to have the backend server running before using this frontend application.

## Overview

This project is designed to help developers learn and understand:
- **Vue.js 3** - Modern reactive framework
- **GraphQL** - Query language for APIs
- **Single File Components (SFC)** - Without build tools or npm
- **Responsive Design** - Bootstrap 5 integration
- **State Management** - Reactive stores pattern
- **Client-side Routing** - Dynamic component switching

## ✨ Features

### User Features
- **User Management**
  - User registration and login with JWT authentication
  - Follow/unfollow other users
  - User profiles with statistics
  - User discovery and browsing
  
- **Cat Management**
  - Browse extensive cat catalog with pagination
  - Like/unlike cats
  - View detailed cat information including photos
  - Filter cats by user or category
  
- **Photo Management**
  - Photo gallery with responsive grid layout
  - Like/unlike photos
  - View photos by cat or by user
  - Photo statistics and interactions
  
- **Social Interactions**
  - Follow system to track favorite creators
  - Like system for cats and photos
  - User statistics dashboard
  - Top users leaderboard

### Admin Features
- Manage user accounts (enable/disable)
- Manage cat entries (enable/disable)
- Manage photo entries (enable/disable)
- User role management

### UI/UX
- Responsive Bootstrap 5 design
- Modal dialogs for confirmations and details
- Toast notifications for user feedback
- Smooth page transitions
- Photo lightbox gallery with PhotoSwipe
- Loading indicators and error handling
- Accordion and tab components
- Dynamic pagination

## 🏗️ Project Structure

```
src/
├── components/          # Vue single-file components
│   ├── App.vue                    # Root component
│   ├── AppHeader.vue              # Header navigation
│   ├── AppFooter.vue              # Footer
│   ├── DynamicComponent.vue       # Router-like component switcher
│   ├── CatBlock.vue               # Cat card component
│   ├── UserBlock*.vue             # User display variants
│   ├── Modal*.vue                 # Modal dialogs
│   ├── Toast.vue                  # Notification toast
│   └── ...                        # Other UI components
│
├── views/               # Page components
│   ├── MainPage.vue               # Home/landing page
│   ├── CatsList.vue               # All cats
│   ├── CatDetail.vue              # Single cat details
│   ├── UsersList.vue              # All users
│   ├── UserProfile.vue            # User profile
│   ├── ViewUser.vue               # Other user's profile
│   ├── Login.vue                  # Authentication
│   ├── Features.vue               # Features page
│   ├── Pricing.vue                # Pricing page
│   ├── FAQs.vue                   # FAQ page
│   ├── About.vue                  # About page
│   └── Contact.vue                # Contact page
│
├── stores/              # Reactive state management
│   ├── authStore.mjs              # Authentication state
│   ├── catsStore.mjs              # Cats data store
│   ├── usersStore.mjs             # Users data store
│   ├── photosStore.mjs            # Photos data store
│   ├── toggleLikesStore.mjs       # Like interactions
│   ├── toggleFollowsStore.mjs     # Follow interactions
│   ├── toggleStatusesStore.mjs    # Enable/disable status
│   ├── homeStore.mjs              # Home page state
│   └── graphQLStore.mjs           # GraphQL queries
│
├── libs/                # Utility modules
│   ├── api.mjs                    # Axios API with mock adapter
│   ├── helpers.mjs                # General utilities
│   ├── catHelpers.mjs             # Cat-specific utilities
│   ├── userHelpers.mjs            # User-specific utilities
│   ├── dateTimeHelpers.mjs        # Date/time utilities
│   ├── localStorageHelpers.mjs    # LocalStorage wrapper
│   ├── eventBus.mjs               # Event emitter
│   ├── loadModuleHelper.mjs       # Dynamic component loader
│   └── abortablePromise.mjs       # Abortable async operations
│
├── assets/              # Static assets
│   ├── style.css                  # Global styles
│   ├── start.css                  # Startup styles
│   └── images/                    # Image files
│
└── sample-data/         # Mock data for development
    ├── cat.json                   # Single cat data
    ├── cats-list.json             # Multiple cats
    ├── user.json                  # Single user data
    ├── users-list.json            # Multiple users
    ├── photos-by-cat.json         # Photos by cat
    ├── like-cat.json              # Like action response
    ├── follow.json                # Follow action response
    └── ...                        # Other sample data
```

## 🚀 Technologies Used

### Core Framework
- **[Vue.js 3](https://vuejs.org/)** - Progressive JavaScript Framework
- **[vue3-sfc-loader v0.8.4](https://github.com/FranckFreiburger/vue3-sfc-loader)** - Load .vue files in the browser without a build step

### API & Data
- **[GraphQL](https://graphql.org/)** - Query language for APIs
- **[Axios](https://axios-http.com/)** - HTTP client
- **[axios-mock-adapter](https://github.com/ctimmerm/axios-mock-adapter)** - Mock HTTP requests for development

### UI & Styling
- **[Bootstrap 5](https://getbootstrap.com/)** - CSS Framework
- **[PhotoSwipe v5.4.3](https://photoswipe.com/)** - Photo gallery library

### Storage
- **LocalStorage API** - For storing authentication tokens and user data

## 📋 Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for CDN resources)
- Text editor or IDE

## ⚙️ Getting Started

### Option 1: Using npm `serve` package
```bash
# Install serve globally (if not already installed)
npm install -g serve

# Navigate to project directory
cd GraphQL-Vue-Without-Route

# Start development server
serve .

# Access at http://localhost:3000 or http://localhost:5000
```

### Option 2: Using `zrok` for remote sharing
```bash
# Share publicly (requires zrok)
zrok share public --backend-mode web .
```

### Option 3: Using any static HTTP server
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server .

# Using Ruby
ruby -run -ehttpd . -p8000
```

Then open your browser and navigate to:
- `http://localhost:8000` (or your chosen port)
- `http://localhost:3000`
- `http://localhost:8080`

## 🔧 Configuration

### API Endpoint
Edit the `endpoint` variable in [src/libs/api.mjs](src/libs/api.mjs):

```javascript
// For local GraphQL server:
export const endpoint = 'http://localhost:4000';

// For browser-only (using mock data):
export const endpoint = '/';
```

### Mock Data
The project uses `axios-mock-adapter` to intercept GraphQL requests and serve mock data from [src/sample-data/](src/sample-data/) when the endpoint is set to `/`.

## 📚 How It Works

### No Build Tools
This project doesn't require Node.js build tools. Components are loaded dynamically at runtime using:
- `vue3-sfc-loader` - Parses and compiles .vue files in the browser
- ES modules - For organizing code into modules
- Direct URLs - For linking to component files

### Component Loading
The `DynamicComponent.vue` acts as a router substitute:
```javascript
// Switch between views without Vue Router
<DynamicComponent :component-name="'MainPage'" />
```

### State Management
Reactive stores using Vue's Composition API:
```javascript
// Example store structure
const authStore = reactive({
  authInfo: null,
  isAuthenticated: false,
  isAdmin: false,
});
```

### GraphQL Queries
All data fetching uses GraphQL with mock adapter for development:
```javascript
api.post(`/graphql`, {
  query: `query { cats { id name age } }`
})
```

## 🎓 Learning Resources

### Vue.js 3
- [Official Documentation](https://vuejs.org/)
- [Composition API Guide](https://vuejs.org/guide/extras/composition-api-faq.html)

### GraphQL
- [GraphQL Official Site](https://graphql.org/)
- [GraphQL Learn](https://graphql.org/learn/)

### Bootstrap 5
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/)

### vue3-sfc-loader
- [Project Repository](https://github.com/FranckFreiburger/vue3-sfc-loader)

## 📝 Sample Data

Sample GraphQL responses are stored in [src/sample-data/](src/sample-data/) for development and testing without a real backend:
- `cats-list.json` - Multiple cats
- `users-list.json` - Multiple users
- `login.json` - Login response
- `like-cat.json` - Like reaction response
- `follow.json` - Follow action response

## 🔐 Authentication

The app uses JWT token-based authentication with:
- **Login**: Username/email + password
- **Token Storage**: LocalStorage (`authInfo`)
- **Admin Check**: User role = 'admin'
- **Session Persistence**: Token restored on page load

Sample credentials (from mock data):
- Email: user@example.com
- Password: password123

## 🎨 Customization

### Adding New Views
1. Create a new `.vue` file in [src/views/](src/views/)
2. Reference it in the navigation component
3. Use `DynamicComponent` to load it

### Adding New Components
1. Create `.vue` file in [src/components/](src/components/)
2. Import in parent component
3. Register with `defineAsyncComponent()` for lazy loading

### Styling
- Global styles: [src/assets/style.css](src/assets/style.css)
- Bootstrap utilities: Use Bootstrap classes directly in templates
- Custom CSS: Add to component `<style>` tags

## 🐛 Troubleshooting

### Components not loading?
- Check browser console for errors
- Verify file paths are correct
- Ensure internet connection (for CDN resources)

### API calls returning 404?
- Check the `endpoint` configuration in [src/libs/api.mjs](src/libs/api.mjs)
- For mock data, ensure endpoint is set to `/`
- For real server, verify GraphQL endpoint URL

### LocalStorage not persisting?
- Check if browser allows LocalStorage for your domain
- Try clearing browser cache and using private/incognito mode
- Check browser security policies

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Dang khoa** - [dangkhoa2016](https://github.com/dangkhoa2016)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 🔗 Related Projects

- [github.com/dangkhoa2016/GraphQL-Vue-With-Route](https://github.com/dangkhoa2016/GraphQL-Vue-With-Route) - Version with Vue Router
- [github.com/dangkhoa2016/GraphQL-Vue-With-Route-Vite](https://github.com/dangkhoa2016/GraphQL-Vue-With-Route-Vite) - Vite version with routing

## 📞 Support

For questions or issues, please open an issue on GitHub or contact the author.
