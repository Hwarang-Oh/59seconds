pipeline {
    agent any

    tools {
        nodejs 'NodeJS 22.x'
    }

    environment {
        DOCKER_CREDENTIALS_ID = 'dockerhub-access'
        GITLAB_CREDENTIALS_ID = 'gitlab-access-u1qns'
        FRONTEND_DOCKERHUB_REPO = '404dreamsolutions/frontend'
        GITLAB_REPO = 'https://lab.ssafy.com/s11-final/S11P31A404.git'
        BRANCH = 'develop'
        USER_SERVER_IP = '43.203.129.131'
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
                    // when {
                    //     expression {
                    //         sh(script: "git diff --name-only HEAD^ | grep '^frontend/'", returnStatus: true) == 0
                    //     }
                    // }
                    stages {
                        stage('Build Frontend') {
                            steps {
                                dir('frontend/1s-before') {
                                    // 환경변수 직접 설정
                                    sh '''
                                        echo "NEXT_PUBLIC_BASE_URL=http://43.203.129.131/api" > .env
                                        echo "NEXT_PUBLIC_WEBSOCKET_URL=ws://43.203.129.131:9090/api/v2/ws" >> .env
                                        echo "NEXT_PUBLIC_KAKAO_REST_API_KEY=d117153d60a3f48a68b2f2e166adc087" >> .env
                                        echo "NEXT_PUBLIC_KAKAO_REDIRECT_URL=http://43.203.129.131" >> .env
                                    '''
                                    sh 'npm install'
                                    sh 'npm run build'
                                }
                            }
                        }
                        stage('Build & Push Frontend Docker Image') {
                            steps {
                                dir('frontend/1s-before') {
                                    withDockerRegistry([credentialsId: "${DOCKER_CREDENTIALS_ID}", url: "https://index.docker.io/v1/"]) {
                                        script {
                                            def remoteDigest = sh(
                                                script: "docker pull ${FRONTEND_DOCKERHUB_REPO}:latest && docker inspect --format='{{index .RepoDigests 0}}' ${FRONTEND_DOCKERHUB_REPO}:latest || echo 'no_remote_digest'",
                                                returnStdout: true
                                            ).trim()
                                            
                                            def localDigest = sh(
                                                script: """
                                                docker build -t ${FRONTEND_DOCKERHUB_REPO}:latest .
                                                docker inspect --format='{{index .RepoDigests 0}}' ${FRONTEND_DOCKERHUB_REPO}:latest || echo 'no_local_digest'
                                                """,
                                                returnStdout: true
                                            ).trim()

                                            if (remoteDigest != localDigest && localDigest != 'no_local_digest') {
                                                sh "docker push ${FRONTEND_DOCKERHUB_REPO}:latest"
                                            } else {
                                                echo "프론트엔드 이미지가 최신 상태입니다. 푸시를 생략합니다."
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        stage('Deploy Frontend') {
                            steps {
                                sshagent(['application-ec2-ssh']) {
                                    withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}",
                                        usernameVariable: 'DOCKER_USERNAME',
                                        passwordVariable: 'DOCKER_PASSWORD')]) {
                                        sh """
                                            ssh -o StrictHostKeyChecking=no ec2-user@${USER_SERVER_IP} '
                                            docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD} && \
                                            docker network inspect 404_dream_solutions_network >/dev/null 2>&1 || docker network create 404_dream_solutions_network && \
                                            docker pull ${FRONTEND_DOCKERHUB_REPO}:latest && \
                                            docker stop frontend || true && \
                                            docker rm frontend || true && \
                                            docker run -d --name frontend -p 3000:3000 --network 404_dream_solutions_network ${FRONTEND_DOCKERHUB_REPO}:latest && \
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
