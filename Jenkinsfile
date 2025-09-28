@Library('jenkins-shared-libraries') _

pipeline {
    agent { label 'agent-vinod' }

    stages {
        stage('Code') {
            steps {
                checkoutCode(
                    repoUrl: 'https://github.com/a0s21en5/todo-app',
                    branch: 'main',
                    credentialsId: '', // For private repos
                    shallow: true, // Faster clone
                    submodules: false,
                    timeout: 15,
                    showCommitInfo: true
                )
            }
        }

        stage('Build') {
            steps {
                buildDockerImage(
                    imageName: 'my-todo-app',
                    imageTag: 'v1.0.0',
                    dockerfilePath: './Dockerfile',
                    buildArgs: '--no-cache --pull',
                    buildContext: '.',
                    showUser: true
                )
            }
        }

        stage('Push to Registry') {
            steps {
                pushToDockerHub(
                    imageName: 'my-todo-app',
                    imageTag: 'v1.0.0',
                    repository: 'todo-app',
                    targetTag: 'latest',
                    dockerCredentialsId: 'dockerHubCredential',
                    registryUrl: '', // Empty for DockerHub, or specify custom registry
                    autoLogout: true
                )
            }
        }

        stage('Deploy') {
            steps {
                deployApp(
                    composeFile: 'docker-compose.yml',
                    serviceName: 'todo-app', // Deploy specific service - matches docker-compose.yml
                    detached: true,
                    build: false,
                    pullImages: true,
                    removeOrphans: true,
                    projectName: 'todo-app-prod',
                    environment: [
                        'ENV': 'production',
                        'PORT': '8080'
                    ],
                    showStatus: true
                )
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed.'
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline execution failed!'
        }
    }
}
