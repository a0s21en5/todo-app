# Todo Application

A modern, feature-rich todo application built with Angular 20 and containerized with Docker. This application provides a clean and intuitive interface for managing your daily tasks with features like adding, editing, deleting, and filtering todos.

## 🚀 Features

- ✅ **Add Tasks**: Create new todo items with ease
- ✏️ **Edit Tasks**: Double-click or use edit button to modify existing todo items
- 🗑️ **Delete Tasks**: Remove completed or unwanted tasks
- 🔍 **Filter Tasks**: View all, active, or completed tasks
- 📊 **Progress Tracking**: Visual progress bar and statistics
- 💾 **Local Storage**: Automatic data persistence using browser storage
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🐳 **Dockerized**: Ready for containerized deployment
- ⚡ **Fast & Modern**: Built with Angular 20 and optimized for performance
- ♿ **Accessible**: Built with accessibility best practices

## 🛠️ Technology Stack

- **Frontend**: Angular 20.2.0
- **Language**: TypeScript 5.9.2
- **Styling**: CSS3 with modern features
- **Build Tool**: Angular CLI
- **Testing**: Jasmine & Karma
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx (for production)

## 🏁 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Angular CLI 20+
- Docker (optional, for containerized deployment)

### Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   # or
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

### 🐳 Docker Deployment

#### Using Docker Compose (Recommended)

1. **Build and run with Docker Compose**

   ```bash
   docker-compose up -d
   ```

2. **Access the application**
   Navigate to `http://localhost:3000/`

#### Using Docker directly

1. **Build the Docker image**

   ```bash
   docker build -t todo-app .
   ```

2. **Run the container**

   ```bash
   docker run -d -p 3000:80 --name todo-app todo-app
   ```

## 📁 Project Structure

```text
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── todo-input/      # Todo input component
│   │   ├── todo-item/       # Individual todo item component
│   │   ├── todo-list/       # Todo list container component
│   │   ├── todo-filters/    # Filter buttons component
│   │   └── todo-stats/      # Statistics component
│   ├── models/              # TypeScript interfaces
│   │   └── todo.model.ts
│   ├── services/            # Business logic services
│   │   └── todo.service.ts
│   ├── app.component.*      # Root component
│   └── ...
├── assets/                  # Static assets
├── environments/            # Environment configurations
└── ...
```

## 🎯 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Lint the codebase
- `npm run e2e` - Run end-to-end tests

## 🔧 Configuration

### Environment Variables

The application supports different environment configurations:

- `src/environments/environment.ts` - Development configuration
- `src/environments/environment.prod.ts` - Production configuration

### Docker Configuration

- `Dockerfile` - Multi-stage Docker build configuration
- `docker-compose.yml` - Docker Compose setup for easy deployment
- `nginx.conf` - Nginx configuration for production serving

## 📱 Usage

### Adding Todos

- Type your task in the input field
- Press Enter or click the + button to add

### Managing Todos

- **Complete**: Click the circle button to toggle completion
- **Edit**: Double-click on the text or use the edit button
- **Delete**: Click the trash icon to remove

### Filtering

- **All**: View all todos
- **Active**: View only incomplete todos
- **Completed**: View only completed todos

### Bulk Actions

- **Toggle All**: Mark all todos as complete/incomplete
- **Clear Completed**: Remove all completed todos

## 🌟 Key Features Details

### Smart Filtering

The app provides intuitive filtering with real-time counts for each category.

### Persistent Storage

All todos are automatically saved to browser's localStorage and restored on page reload.

### Responsive Design

The interface adapts seamlessly to different screen sizes with mobile-first approach.

### Accessibility

- Full keyboard navigation support
- Screen reader friendly
- High contrast support
- Focus management

## 🚀 Performance Optimizations

- **Lazy Loading**: Components are optimized for fast loading
- **Change Detection**: Uses OnPush strategy where applicable
- **Bundle Optimization**: Tree-shaking and code splitting
- **Production Build**: Optimized for minimal bundle size
- **Nginx Configuration**: Gzip compression and caching headers

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🛠️ Development

### Code Scaffolding

Generate new components:

```bash
ng generate component component-name
```

Generate services:

```bash
ng generate service service-name
```

### Testing

Run unit tests:

```bash
ng test
```

Run e2e tests:

```bash
ng e2e
```

### Building for Production

```bash
ng build --prod
```

The build artifacts will be stored in the `dist/` directory.

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

Built with ❤️ using Angular 20
