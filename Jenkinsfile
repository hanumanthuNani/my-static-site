pipeline {
    agent any

    environment {
        GITHUB_REPO = 'https://github.com/hanumanthuNani/my-static-site'
        GITHUB_TOKEN = credentials('github-token') // GitHub token Jenkins credential
        BRANCH = 'main'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    echo 'Checking out repository...'
                    git url: GITHUB_REPO, branch: BRANCH, credentialsId: 'github-token'
                }
            }
        }

        stage('Clean Up Old Docker Containers and Images') {
            steps {
                script {
                    echo 'Cleaning up old Docker containers and images...'
                    sh 'docker rm -f my-static-site-container || true'
                    sh 'docker rmi -f my-static-site || true'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Building Docker image...'
                    // Ensure Dockerfile exists in the repository root
                    sh 'docker build -t my-static-site .'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    echo 'Running Docker container...'
                    // Run the Docker container, ensuring ports are exposed correctly
                    sh 'docker run -d -p 70:80 --name my-static-site-container my-static-site'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying Dockerized site...'
                    // Example of pushing to Docker Hub or other deployments
                    // sh 'docker push my-static-site:latest' // Uncomment if needed
                }
            }
        }
    }

    post {
        success {
            echo 'Dockerized website deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
