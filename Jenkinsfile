pipeline {
    agent any

    environment {
        GIT_REPO = 'https://github.com/hanumanthuNani/my-static-site.git'
        GIT_CREDENTIALS = 'github-token'  // The ID of the credential you created in Jenkins
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

        stage('Run Tests') {
            steps {
                script {
                    // Example test command (replace with actual tests if you have them)
                    echo 'Running tests...'
                    // You can run unit tests or integration tests here, like npm test or pytest
                    // sh 'npm install && npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    try {
                        // Build the Docker image
                        echo 'Building Docker image...'
                        sh 'docker build -t my-static-site .'
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        throw e
                    }
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    try {
                        // Run the Docker container and expose it on port 8059
                        echo 'Running Docker container...'
                        sh 'docker run -d -p 8059:80 my-static-site'
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        throw e
                    }
                }
            }
        }

        stage('Clean Up') {
            steps {
                script {
                    // Stop and remove the container after deployment
                    echo 'Cleaning up Docker containers...'
                    sh 'docker ps -q --filter ancestor=my-static-site | xargs docker stop | xargs docker rm'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline ran successfully!'
            // Optional: send notification on success (e.g., to Slack, email)
        }
        failure {
            echo 'Pipeline failed!'
            // Optional: send notification on failure (e.g., to Slack, email)
        }
        always {
            echo 'Cleaning up any resources or notifications.'
            // Optional: do any post-pipeline actions like sending a notification regardless of the result
        }
    }
}
