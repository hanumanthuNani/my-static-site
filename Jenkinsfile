pipeline {
    agent any

    environment {
        // Define Docker Image Name and Tag
        DOCKER_IMAGE_NAME = 'my-web-app'
        DOCKER_IMAGE_TAG = 'latest'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the project code from your Git repository
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image from Dockerfile
                    sh 'docker build -t ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} .'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    // Run the Docker container (map port 8080 on the host to port 80 inside the container)
                    sh 'docker run -d -p 8080:80 ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}'
                }
            }
        }

        stage('Clean Up') {
            steps {
                script {
                    // Clean up any stopped containers (optional)
                    sh 'docker ps -q | xargs docker stop | xargs docker rm'
                }
            }
        }
    }

    post {
        always {
            // Clean up the Docker image after the job completes
            sh 'docker rmi ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}'
        }
    }
}
