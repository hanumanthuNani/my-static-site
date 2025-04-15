pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                git credentialsId: 'PERSONAL', url: 'https://github.com/hanumanthuNani/my-static-site.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t my-static-site .'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh 'docker stop my-static-site || true'
                    sh 'docker rm my-static-site || true'
                    sh 'docker run -d -p 8070:80 --name my-static-site my-static-site'
                }
            }
        }
    }
}
