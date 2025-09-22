# Todo App

A modern, responsive todo application built with Angular 20 and containerized with Docker. This application provides a clean and intuitive interface for managing your daily tasks with features like adding, editing, deleting, and filtering todos.

## 🚀 Features

- ✅ **Add Tasks**: Create new todo items with ease
- ✏️ **Edit Tasks**: Modify existing todo items
- 🗑️ **Delete Tasks**: Remove completed or unwanted tasks
- 🔍 **Filter Tasks**: View all, active, or completed tasks
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🐳 **Dockerized**: Ready for containerized deployment
- ⚡ **Fast & Modern**: Built with Angular 20 and optimized for performance

## 🛠️ Technology Stack

- **Frontend**: Angular 20.3.0
- **Language**: TypeScript 5.9.2
- **Styling**: CSS3
- **Testing**: Jasmine & Karma
- **Build Tool**: Angular CLI
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx (for production)

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 or higher)
- [npm](https://www.npmjs.com/) (v10 or higher)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
- [Docker](https://www.docker.com/) (for containerized deployment)
- [Docker Compose](https://docs.docker.com/compose/) (for multi-container setup)

## 🚀 Getting Started

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
   Navigate to `http://localhost:4200` to view the application.

### Docker Development

1. **Build and run with Docker Compose**

   ```bash
   docker-compose up -d
   ```

2. **Access the application**
   Navigate to `http://localhost:3000` to view the containerized application.

3. **Stop the application**

   ```bash
   docker-compose down
   ```

## 📁 Project Structure

```text
todo-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── add-todo/          # Component for adding new todos
│   │   │   ├── todo-filter/       # Component for filtering todos
│   │   │   ├── todo-item/         # Individual todo item component
│   │   │   └── todo-list/         # Main todo list component
│   │   ├── models/
│   │   │   └── todo.interface.ts  # Todo data model
│   │   ├── services/
│   │   │   └── todo.service.ts    # Todo business logic service
│   │   ├── app.config.ts          # App configuration
│   │   ├── app.routes.ts          # Routing configuration
│   │   └── app.ts                 # Root component
│   ├── index.html                 # Main HTML file
│   ├── main.ts                    # Application bootstrap
│   └── styles.css                 # Global styles
├── public/
│   └── favicon.ico                # Application favicon
├── docker-compose.yml             # Docker Compose configuration
├── Dockerfile                     # Docker image definition
├── nginx.conf                     # Nginx configuration for production
└── package.json                   # Dependencies and scripts
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start development server on `http://localhost:4200` |
| `npm run build` | Build the app for production |
| `npm run watch` | Build the app in watch mode for development |
| `npm test` | Run unit tests with Karma |
| `npm run ng` | Run Angular CLI commands |

## 🐳 Docker Commands

| Command | Description |
|---------|-------------|
| `docker-compose up` | Start the application in containers |
| `docker-compose up -d` | Start the application in detached mode |
| `docker-compose down` | Stop and remove containers |
| `docker-compose logs` | View application logs |
| `docker-compose build` | Build the Docker images |

## 🧪 Testing

Run the test suite with:

```bash
npm test
```

This will execute the unit tests using Karma and Jasmine in watch mode.

## 🏗️ Building for Production

### Local Build

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Docker Build

```bash
docker-compose up --build
```

This creates an optimized production build served by Nginx.

## 🌐 Deployment

The application is containerized and ready for deployment to any Docker-compatible platform:

- **Local**: Use Docker Compose
- **Cloud**: Deploy to AWS ECS, Google Cloud Run, Azure Container Instances
- **Kubernetes**: Use the generated Docker images
- **Heroku**: Deploy using Heroku Container Registry

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues & Support

If you encounter any issues or have questions, please:

1. Check the [existing issues](../../issues)
2. Create a [new issue](../../issues/new) if your problem isn't already reported
3. Provide detailed information about your environment and the issue

## 🔄 Changelog

### Version 0.0.0

- Initial release
- Basic todo functionality (add, edit, delete, filter)
- Docker containerization
- Responsive design

---

Made with ❤️ using Angular
