pipeline {
    agent any

    environment {
        GITHUB_REPO = 'https://github.com/hanumanthuNani/my-static-site'
        GITHUB_TOKEN = credentials('github-token') // GitHub token Jenkins credential
        BRANCH = 'main'
        DEPLOY_PATH = 'E:\\my_website' // Folder on Jenkins where your website files and Docker are located
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Optional: Only use this if you want to clone the GitHub repo again
                    // Otherwise, this stage can be removed as files already exist in the workspace
                    echo 'Checking out repository...'
                    git url: GITHUB_REPO, branch: BRANCH, credentialsId: 'github-token'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Navigate to the folder where Docker files are located
                    dir(DEPLOY_PATH) {
                        echo 'Building Docker image...'
                        // Build Docker image using the Dockerfile in the folder
                        sh 'docker build -t my-static-site .'
                    }
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    echo 'Running Docker container...'
                    // Run the Docker container (adjust the port if necessary)
                    // If you need to expose a specific port or mount volumes, modify the command accordingly
                    sh 'docker run -d -p 8080:80 --name my-static-site-container my-static-site'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying Dockerized site...'
                    // This is where you would deploy to another server or platform if needed
                    // For example, you could push to Docker Hub or use SSH to deploy to a remote server
                    // Example: docker push to Docker Hub (if you're using Docker Hub)
                    // sh 'docker push my-static-site:latest'
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
