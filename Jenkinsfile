pipeline {
    agent any

    tools {
        nodejs 'NodeJS 20.x'
    }

    environment {
        DOCKER_CREDENTIALS_ID = 'dockerhub-access'
        GITLAB_CREDENTIALS_ID = 'gitlab-access-leeju1013'
        BACKEND_DOCKERHUB_REPO = '404dreamsolutions/backend'
        FRONTEND_DOCKERHUB_REPO = '404dreamsolutions/frontend'
        GITLAB_REPO = 'https://lab.ssafy.com/s11-final/S11P31A404.git'
        BRANCH = 'develop'
        USER_SERVER_IP = 'k11a404.p.ssafy.io'
        SPRING_PROFILE = 'prod'
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    git credentialsId: "${GITLAB_CREDENTIALS_ID}",
                        branch: "${BRANCH}",
                        url: "${GITLAB_REPO}"
                    echo "Repository cloned successfully from ${GITLAB_REPO}."
                }
            }
        }

        stage('Parallel Build & Deploy') {
            parallel {
                stage('Frontend') {
                    when {
                        expression {
                            sh(script: "git diff --name-only HEAD^ | grep '^frontend/'", returnStatus: true) == 0
                        }
                    }
                    stages {
                        stage('Build Frontend') {
                            steps {
                                dir('frontend/1s-before') {
                                    sh 'npm install'
                                    sh 'npm run build'
                                }
                            }
                        }
                        stage('Build & Push Frontend Docker Image') {
                            steps {
                                dir('frontend/1s-before') {
                                    withDockerRegistry([credentialsId: "${DOCKER_CREDENTIALS_ID}", url: "https://index.docker.io/v1/"]) {
                                        sh "docker build -t ${FRONTEND_DOCKERHUB_REPO}:latest ."
                                        sh "docker push ${FRONTEND_DOCKERHUB_REPO}:latest"
                                    }
                                }
                            }
                        }
                        stage('Deploy Frontend') {
                            steps {
                                sshagent(['ssafy-ec2-ssh']) {
                                    withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}",
                                        usernameVariable: 'DOCKER_USERNAME',
                                        passwordVariable: 'DOCKER_PASSWORD')]) {
                                        sh """
                                            ssh -o StrictHostKeyChecking=no ubuntu@${USER_SERVER_IP} '
                                            docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD} && \
                                            docker pull ${FRONTEND_DOCKERHUB_REPO}:latest && \
                                            docker stop frontend || true && \
                                            docker rm frontend || true && \
                                            docker run -d --name frontend -p 3000:3000 ${FRONTEND_DOCKERHUB_REPO}:latest && \
                                            docker logout'
                                        """
                                    }
                                }
                            }
                        }
                    }
                }

                stage('Backend') {
                    when {
                        expression {
                            sh(script: "git diff --name-only HEAD^ | grep '^backend/'", returnStatus: true) == 0
                        }
                    }
                    stages {
                        stage('Build Backend') {
                            steps {
                                dir('backend') {
                                    withCredentials([file(credentialsId: 'application-secret', variable: 'SECRET_FILE')]) {
                                        sh '''
                                            mkdir -p src/main/resources
                                            cp $SECRET_FILE src/main/resources/application-secret.yml
                                        '''
                                    }
                                    sh 'chmod +x ./gradlew'
                                    sh './gradlew clean build -Pprofile=prod -x test'
                                    sh 'ls -l build/libs/'
                                }
                            }
                        }
                        stage('Build & Push Backend Docker Image') {
                            steps {
                                dir('backend') {
                                    withDockerRegistry([credentialsId: "${DOCKER_CREDENTIALS_ID}", url: "https://index.docker.io/v1/"]) {
                                        sh "docker build -t ${BACKEND_DOCKERHUB_REPO}:latest ."
                                        sh "docker push ${BACKEND_DOCKERHUB_REPO}:latest"
                                    }
                                }
                            }
                        }
                        stage('Deploy Backend') {
                            steps {
                                sshagent(['ssafy-ec2-ssh']) {
                                    withCredentials([
                                        usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}",
                                            usernameVariable: 'DOCKER_USERNAME',
                                            passwordVariable: 'DOCKER_PASSWORD'),
                                        file(credentialsId: 'application-secret', variable: 'SECRET_FILE')
                                    ]) {
                                        sh """
                                            ssh -o StrictHostKeyChecking=no ubuntu@${USER_SERVER_IP} '
                                            sudo mkdir -p /home/ubuntu/config && \
                                            sudo chown -R ubuntu:ubuntu /home/ubuntu/config && \
                                            docker network inspect my-network >/dev/null 2>&1 || docker network create my-network && \
                                            docker inspect mysql_container >/dev/null 2>&1 || (
                                                docker run -d --name mysql_container \
                                                -e MYSQL_ROOT_PASSWORD=root \
                                                -e MYSQL_DATABASE=dreamsolution \
                                                -e MYSQL_USER=solution \
                                                -e MYSQL_PASSWORD=onesecondbefore \
                                                --network my-network \
                                                mysql:8.0
                                            )'
                                            
                                            scp -o StrictHostKeyChecking=no \$SECRET_FILE ubuntu@${USER_SERVER_IP}:/home/ubuntu/config/application-secret.yml
                                            
                                            ssh -o StrictHostKeyChecking=no ubuntu@${USER_SERVER_IP} '
                                            docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD} && \
                                            docker pull ${BACKEND_DOCKERHUB_REPO}:latest && \
                                            docker stop backend || true && \
                                            docker rm backend || true && \
                                            docker run -d --name backend \
                                                -p 9090:9090 \
                                                -v /home/ubuntu/config/application-secret.yml:/app/config/application-secret.yml \
                                                --network my-network \
                                                -e SPRING_PROFILES_ACTIVE=prod \
                                                ${BACKEND_DOCKERHUB_REPO}:latest && \
                                            docker logout'
                                        """
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                mattermostSend (
                    color: 'good',
                    message: "빌드 성공 :hwarang_sun:: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Details>)",
                    endpoint: 'https://meeting.ssafy.com/hooks/s88btx34q7fzmcbp5fnxzdtq1o',
                    channel: 'a404-jenkins'
                )
            }
        }
        failure {
            script {
                mattermostSend (
                    color: 'danger',
                    message: "빌드 실패 :cryingpatamon:: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Details>)",
                    endpoint: 'https://meeting.ssafy.com/hooks/s88btx34q7fzmcbp5fnxzdtq1o',
                    channel: 'a404-jenkins'
                )
            }
        }
        always {
            cleanWs()
        }
    }
}
