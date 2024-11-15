pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'dockerhub-access'
        GITLAB_CREDENTIALS_ID = 'gitlab-access-u1qns'
        PARTICIPATION_DOCKERHUB_REPO = '404dreamsolutions/participation'
        GITLAB_REPO = 'https://lab.ssafy.com/s11-final/S11P31A404.git'
        BRANCH = 'backend/participation'
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
                stage('Participation') {
                    // when {
                    //     expression {
                    //         sh(script: "git diff --name-only HEAD^ | grep '^backend/participation'", returnStatus: true) == 0
                    //     }
                    // }
                    stages {
                        stage('Build backend/participation') {
                            steps {
                                dir('backend/participation') {
                                    withCredentials([file(credentialsId: 'application-secret', variable: 'SECRET_FILE')]) {
                                        sh '''
                                            mkdir -p src/main/resources
                                            cp $SECRET_FILE src/main/resources/application-secret.yml
                                            ls -l src/main/resources/application-secret.yml
                                        '''
                                    }
                                    sh 'chmod +x ./gradlew'
                                    sh './gradlew clean bootJar -Pprofile=prod -x test'
                                    sh 'ls -l build/libs/'
                                }
                            }
                        }
                        stage('Build & Push Participation Docker Image') {
                            steps {
                                dir('backend/participation') {
                                    withDockerRegistry([credentialsId: "${DOCKER_CREDENTIALS_ID}", url: "https://index.docker.io/v1/"]) {
                                        script {                                            
                                            def remoteDigest = sh(
                                                script: "docker pull ${PARTICIPATION_DOCKERHUB_REPO}:latest && docker inspect --format='{{index .RepoDigests 0}}' ${PARTICIPATION_DOCKERHUB_REPO}:latest || echo 'no_remote_digest'",
                                                returnStdout: true
                                            ).trim()

                                            def localDigest = sh(
                                                script: """
                                                docker build -t ${PARTICIPATION_DOCKERHUB_REPO}:latest .
                                                docker inspect --format='{{index .RepoDigests 0}}' ${PARTICIPATION_DOCKERHUB_REPO}:latest || echo 'no_local_digest'
                                                """,
                                                returnStdout: true
                                            ).trim()

                                            if (remoteDigest != localDigest && localDigest != 'no_local_digest') {
                                                sh "docker push ${PARTICIPATION_DOCKERHUB_REPO}:latest"
                                            } else {
                                                echo "백엔드 이미지가 최신 상태입니다. 푸시를 생략합니다."
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        stage('Deploy Participation') {
                            steps {
                                sshagent(['application-ec2-ssh']) {
                                    withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}",
                                        usernameVariable: 'DOCKER_USERNAME',
                                        passwordVariable: 'DOCKER_PASSWORD')]) {
                sh """
                    ssh -o StrictHostKeyChecking=no ec2-user@${USER_SERVER_IP} '
                    echo "Logging into Docker Hub..." && \
                    docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD} && \
                    echo "Checking Docker network..." && \
                    docker network inspect 404_dream_solutions_network >/dev/null 2>&1 || docker network create 404_dream_solutions_network && \
                    echo "Stopping existing container..." && \
                    docker stop participation || true && \
                    docker rm participation || true && \
                    echo "Pruning unused images..." && \
                    docker image prune -f && \
                    echo "Pulling latest image..." && \
                    docker pull ${PARTICIPATION_DOCKERHUB_REPO}:latest && \
                    echo "Running new container..." && \
                    docker run -d --name participation \
                        -p 9091:8080 \
                        --network 404_dream_solutions_network \
                        -e SPRING_PROFILES_ACTIVE=prod \
                        ${PARTICIPATION_DOCKERHUB_REPO}:latest && \
                    echo "Logging out from Docker Hub..." && \
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
                def lastCommitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()

                mattermostSend (
                    color: 'good',
                    message: """빌드 성공 :hwarang_sun:: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_Name} 
                    최근 커밋: ${lastCommitMessage}
                    (<${env.BUILD_URL}|Details>)""",
                    endpoint: 'https://meeting.ssafy.com/hooks/s88btx34q7fzmcbp5fnxzdtq1o',
                    channel: 'a404-jenkins'
                )
            }
        }
        failure {
            script {
                def lastCommitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend (
                    color: 'danger',
                    message: """빌드 실패 :cryingpatamon:: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_Name}
                    최근 커밋: ${lastCommitMessage}
                    (<${env.BUILD_URL}|Details>)""",
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
