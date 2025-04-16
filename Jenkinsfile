pipeline {
    agent any

    environment {
        GIT_REPO = 'https://github.com/hanumanthuNani/my-static-site.git'
        GIT_CREDENTIALS = 'GitHub-Token' // The ID of the credential you created
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Clone the GitHub repository using the credential
                    git url: GIT_REPO, credentialsId: GIT_CREDENTIALS
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh 'docker build -t my-static-site .'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    // Run the Docker container
                    sh 'docker run -d -p 8080:80 my-static-site'
                }
            }
        }

        stage('Clean Up') {
            steps {
                script {
                    // Stop and remove the container after deployment
                    sh 'docker ps -q --filter ancestor=my-static-site | xargs docker stop | xargs docker rm'
                }
            }
        }
    }
}
