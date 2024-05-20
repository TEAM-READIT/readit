# ReadIt Porting Manual

## 개발환경
- IntelliJ IDEA 2023.3 Ultimate
- openjdk 17.0.10 2024-01-16
    - Spring Boot: 3.2.5
- nodeJS 20.10.0
    - React: 18.2.0
- python 3.11.9
    - FastAPI: 0.110.2
- AWS EC2 Ubuntu 24.04 LTS (운영 서버 2대)
- AWS EC2 Ubuntu 20.04.6 LTS (개발 서버)
- AWS ELB
---

## 개발서버 기본 세팅
### Java 설치
```
sudo apt-get update
sudo apt-get upgrade

# JAVA11 설치
sudo apt-get install openjdk-11-jdk
```
### 타임존 변경
```
sudo timedatectl set-timezone 'Asia/Seoul'
```
### 미러서버 변경
```
sudo sed -i 's/ap-northeast-2.ec2.archive.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list
```
## 젠킨스 (개발서버)
### 젠킨스 설치
1) 설치 및 업그레이드를 자동화하는 Jenkins의 데비안 패키지 저장소를 사용하기 위해 먼저 시스템에 키 추가
```
  sudo wget -O /usr/share/keyrings/jenkins-keyring.asc \
    https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
```
2) Jenkins apt 저장소 항목 추가
```
 echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
    https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
    /etc/apt/sources.list.d/jenkins.list > /dev/null
```
3) Jenkins 설치
```
sudo apt-get update
sudo apt-get install fontconfig
sudo apt-get install jenkins
```

### 젠킨스 포트 설정(8090포트)
1) /etc/default/jenkins 파일 수정하기
```
sudo vim /etc/default/jenkins
```
2) jenkins.service 파일 수정하기
- jenkins.service 파일의 권한을 777로 우선 변경
- 해당 파일에 들어가서 Environment="JENKINS_PORT=8080" 부분 변경
- 포트 변경 뒤 권한을 read only로 다시 변경
```
sudo chmod 777 /usr/lib/systemd/system/jenkins.service
sudo vim /usr/lib/systemd/system/jenkins.service
sudo chmod 444 /usr/lib/systemd/system/jenkins.service
```
3) 데몬 프로세스와 젠킨스 재실행
```
sudo systemctl daemon-reload
sudo service jenkins restart
```
4) 포트 변경 확인
```
sudo lsof -i -P -n | grep jenkins
```
5) 해당 포트 방화벽 허용
```
sudo ufw allow 8090
```
### 젠킨스 접속
1) `http://개발서버주소:8090` 로 접속

2) /var/lib/jenkins/secrets/initialAdminPassword 에서 비밀번호 확인 후 입력
### 기본 플러그인 설치

### 관리자 계정 설정
- 주어진 입력 폼에 맞춰 관리자 계정 생성
### 추가 플러그인 설치
- 도커, gitLab, mattermost 등 관련 플러그인

## MySQL (개발서버)
DB용 서버를 따로 두는 것이 일반적이나, 서버가 부족하여 개발 서버에 설치
### mysql 설치
```
sudo apt update
sudo apt install mysql-server
```
### 방화벽 열기
```
sudo ufw allow 3306
```

### MySQL 실행
```
sudo systemctl start mysql
sudo systemctl enable mysql
```
참고) 중지는 아래와 같이 함
```
sudo systemctl stop mysql
```

### root 계정 비번 재설정
1) mysql 접속
```
sudo mysql -u root
```
2) root 계정 비번 설정
```
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '비밀번호';
```
3) 변경 비밀번호 적용
```
mysql> FLUSH PRIVILEGES;
```

### 계정 생성
1) 사용자 계정에 관한 정보는 mysql database에 들어있기 때문에 mysql 데이터베이스에 들어가 아래 과정 진행
```
mysql> use mysql;
```
```
mysql> SELECT user, host, plugin FROM user;
```
2) 계정 생성
```
mysql> CREATE USER '계정명'@'%' IDENTIFIED BY '비밀번호';
```
2) 생성한 계정에 모든 권한 부여
```
mysql> grant all privileges on *.* to '계정명'@'%';
```
### DB 생성
```
mysql> create database 데이터베이스명;
```
### mysqld.cnf 설정

1) /etc/mysql/mysql.conf.d 폴더로 이동

2) mysqld.cnf 파일 수정

3) bind-address 가 기존에는 127.0.0.1이었음

4) 0.0.0.0으로 변경하여 모두 허용

### mysql 재시작
```
sudo service mysql restart
```
## 데몬 등록 (개발서버)
### JAR 파일 실행할 .service 파일 만들기
1) `/etc/systemd/system`으로 이동
2) `readit.service` 파일 작성
```
sudo vi readit.service
```
readit.service
```
[Unit]
Description=ReadIt
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/java -jar /var/lib/jenkins/workspace/Readit/backend/readit/build/libs/readit-0.0.1-SNAPSHOT.jar
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```
### 서비스 활성화 및 시작

```
sudo systemctl daemon-reload
sudo systemctl enable readit
sudo systemctl start readit
```

### 서비스 상태 확인

서비스가 제대로 실행되고 있는지 확인

```
sudo systemctl status readit
```

참고) 실시간 log 보는 명령어
```
sudo journalctl -f -u readit.service --lines=500
```


## Docker
### 도커 설치 (개발서버&운영서버)
1) 오래된 버전 삭제하기
```
sudo apt-get remove docker docker-engine docker.io containerd runc
```
2) repository 설정하기
- apt package index 업데이트 및 HTTPS를 통해 repository를 이용하기 위해 package 설치
```
sudo apt-get update
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```
3) Docker의 Official GPG Key 등록
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

4) stable repository 등록
```
echo \
"deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
$(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```
5) Docker Engine 설치
```
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```
6) 설치 완료 확인
```
docker --version
```
## Jenkins x 배포서버 SSH연결
### 개발 서버에서 SSH 키 생성
배포서버인 AWS EC2 인스턴스에 접근하기 위해서 PEM 형식의 키를 생성
```
// /var/lib/jenkins 아래에 .ssh 폴더 없으면 생성
$ cd /var/lib/jenkins
$ mkdir .ssh

// readit_dev라는 키 생성
$ sudo ssh-keygen -t rsa -C "readit_dev" -m PEM -P "" -f /var/lib/jenkins/.ssh/readit_dev
```
### 배포서버에 PublicKey 등록
위에서 생성한 키페어 중 퍼블릭 키를 배포서버인 인스턴스의 .ssh/authorized_keys 파일에 추가
``` 
// 개발 서버에서 공개키 확인 후 복사
$ sudo cat /var/lib/jenkins/.ssh/readit_dev.pub //젠킨스 ec2

// 배포 서버1 접속 후, 아래 파일에 줄바꿈 후 붙여넣기
$ vi .ssh/authorized_keys

// 배포 서버2도 동일 
$ vi .ssh/authorized_keys
```


### Credential 설정
#### GitLab Credential
- 사용할 gitlab에 접근하기 위한 계정 정보
- Kind : Username with password 선택
- Username : Gitlab 계정 아이디 입력
- Password : Gitlab 계정 비밀번호 입력 **(토큰 발행시, API 토큰 입력)**
- ID : Credential을 구분하기 위한 별칭

#### GitLab API Token
- GitLab이 제공하는 API를 사용하기 위한 토큰
- Kind : Gitlab API token 선택
- API tokens : Gitlab 계정 토큰 입력
    - 사용하는 gitlab repo > settings > AccessTokens > Add new Tokens 을 통해 생성
- ID : Credential을 구분하기 위한 별칭

#### Webhook
- Jenkins에서 Jenkins 관리 > System > GitLab
    - Enable authentication for '/project' end-point 체크
    - Name: 해당 연결에 대한 이름 지정
    - GitLab host URL: 사용하는 repo의 host URL. SSAFY 기준 https://lab.ssafy.com
    - Credentials: 위에서 설정한 GitLab API Token ID
    - Test Connetion을 통해 확인후 저장
- 사용할 Pipeline 생성 후 build trigger 설정
    - 아이템 선택 > 구성 > General > Build Triggers
    - Build when a change is pushed to Gitlab 체크
    - Push Events 체크
    - Opened Merge Request Events 체크
    - Approved Merge Request (EE-only) 체크
    - Comments 체크
    - 하단 고급 > Secret token Generate 후 복사
- Gitlab repo > Settings > Webhooks > Add new webhook
    - URL: http://(젠킨스주소)/project/(pipeline 이름)
    - Secret Token: 위에서 저장한 secret token

#### Docker Hub Token
- docker hub 계정 생성
- 우측 상단 계정명 > Account Settings
- Security > New Access Token
    - 모든 Access 권한을 지정한 후 Generate후 복사
- Jenkins 관리 > Credentials
    - Kind : Username with password
    - Username : DockerHub에서 사용하는 계정 아이디 입력
    - Password : 위에서 저장한 Access Token 입력
    - ID : Credential을 구분하기 위한 별칭

#### Docker Hub Repository 생성
- spring, fastapi 를 저장할 public Repository 3개 생성

#### Ubuntu Credential 추가
- Jenkins 관리 > Credentials
    - Kind: SSH Username with private key
    - Username: SSH 원격 서버 호스트에서 사용하는 계정명
    - ID: Credential을 구분하기 위한 별칭
    - Enter directly를 체크하고 개발서버의 private key의 값 입력후 create

---

### 빌드용 tools 설정
- Jenkins > Jenkins 관리 > Tools
- > Gradle installations > Add Gradle
    - name: Tool을 구분하기 위한 별칭
    - version: backend에서 사용중인 Gradle version
- > NodeJS installations > Add NodeJS
    - name: Tool을 구분하기 위한 별칭
    - version: frontend에서 사용중인 NodeJs version

---
## 도메인
### 가비아에서 도메인 구입
readit.store
### 호스팅 영역(네임 서버) 생성
AWS에서 해당 도메인 이름으로 호스팅 영역 생성

### 네임 서버 등록
- aws 에서 도메인을 샀다면 이 과정 불필요
- 호스팅 영역에 적혀 있는 네임 서버 4개를 가비아에 등록
---
## SSL Certificate 발급
ELB에 직접 Certbot을 적용하여 SSL 인증서를 적용하는 것은 불가능
1. AWS Certificate Manager 접속
2. 좌측 ‘인증서 요청’ 클릭 > 퍼블릭 인증서 요청
3. 인증서 나열 > 인증서 클릭 > Route 53에서 레코드 생성 클릭
4. 레코드 생성
---
## ELB
### 대상그룹 생성
- 프로토콜 : HTTPS
- 포트 : 443
- 서버 : 미리 생성해둔 배포 서버 2개
### ELB 생성
- 리스너
  - HTTP : 80 -> HTTPS로 리다이렉트
  - HTTPS : 443 -> 대상그룹으로 연결
### route53에서 도메인과 elb 연결
- 레코드 생성 후
- elb와 연결
### ELB의 보안그룹 설정
- 리스너 포트(443) 오픈
- 원격 접속 후 docker 실행 예정이므로 22 포트 오픈
---
## Nginx (운영서버 2개)
### Nginx 설치
```
sudo apt update
sudo apt install nginx
```
### Nginx 포트 확인
`/etc/nginx/sites-availabe`의 default 파일에서 포트 확인 가능

### 방화벽 열어주기
1) 방화벽 활성화
```powershell
sudo ufw enable
```

2) 현재 적용된 리스트 확인
```powershell
sudo ufw status
```

3) 80번 포트 방화벽 열어주기
```powershell
sudo ufw allow 80
```

3) 22번 포트 방화벽 열어주기
```powershell
sudo ufw allow 22/tcp
```

### 리버스 프록시 설정
`/etc/nginx/sites-availabe`의 default 파일 수정 (아래 내용 추가)
```
        location / {
                proxy_pass http://localhost:3000/;
                proxy_set_header Host $host;
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ =404;
        }

        location /api {
                rewrite ^/api(.*)$ $1 break;
                proxy_pass   http://localhost:8080;
                proxy_set_header Host $http_host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Real-IP $remote_addr;
        }
```


---
## 파이프라인

### 백엔드 파이프라인
```
pipeline {
    agent any //agent:
    tools { //빌드 툴
        gradle 'gradle'
    }
    
    stages {    //여러개의 stage로 구성
        
        stage('git clone') { //해당 레포지토리의 backend 브랜치를 clone
            steps {
                git branch: 'backend',
                credentialsId: 'hayoung_id_pwd', //id, pwd를 활용한 credential을 등록해야 함
                url: 'https://lab.ssafy.com/s10-final/S10P31A705'
            }
        }


        stage('Copy setting file'){
            steps{
                sh '''
                    cp /home/ubuntu/backend-yml/application.yml /var/lib/jenkins/workspace/Readit/backend/readit/src/main/resources
                    cp /home/ubuntu/backend-yml/application-apikeys.yml /var/lib/jenkins/workspace/Readit/backend/readit/src/main/resources
                    cp /home/ubuntu/FastAPI-env/.env /var/lib/jenkins/workspace/Readit/FastAPI
                '''
            }
        }

        stage('build spring project') {
            steps {
                //jenkins 빌드가 성공하면 /var/lib/jenkins/workspace 밑에 workspace가 생기고 그 안에 item명(Readit)으로 된 폴더가 생성됨
                dir('backend/readit') { //backend 폴더로 이동해라
                    sh '''
                        sudo rm -rf /var/lib/jenkins/workspace/Readit/backend/readit/build/* 
                        sudo chmod +x ./gradlew

                        sudo ./gradlew clean build
                    '''
                }
            }
        }

        stage('restart spring project') {
            steps {
                    sh ''' 
                        sudo systemctl restart readit.service
                        sudo systemctl restart prometheus.service
                    '''      
                
            }
        }

        stage('spring and FastAPI docker build') {
            steps {
                script {
                    sh "docker build -t haoday/readit-spring:${env.BUILD_NUMBER} /var/lib/jenkins/workspace/Readit/backend/readit"
                    sh "docker build -t haoday/readit-fastapi:${env.BUILD_NUMBER} /var/lib/jenkins/workspace/Readit/FastAPI"
                }
                
            }
        }
        
        stage('spring and FastAPI docker push'){
            steps{
                echo 'Push Docker'
                script {
                    sh "docker login -u ${env.DOCKERHUB_ID} -p ${env.DOCKERHUB_PWD}"
                    sh "docker push haoday/readit-spring:${env.BUILD_NUMBER}"
                    sh "docker push haoday/readit-fastapi:${env.BUILD_NUMBER}"
                }
                
            }
        }

        stage('clean up') { 
		  steps { 
            // docker image 제거
              sh "docker rmi haoday/readit-spring:${env.BUILD_NUMBER}"
              sh "docker rmi haoday/readit-fastapi:${env.BUILD_NUMBER}"
          }
        } 

        stage('Remote SSH to server1') {
            steps {
                sshagent (credentials: ['ssh_credential']) {

                    script {
                        def prevBuildNumber = env.BUILD_NUMBER.toInteger() - 1
                        def remoteCommands = """
                        
                            curl ifconfig.me
                            docker stop fastapi-container
                            docker rm fastapi-container
                            docker rmi haoday/readit-fastapi:${prevBuildNumber}

                            docker run -dit --name fastapi-container -p 8888:8888 haoday/readit-fastapi:${env.BUILD_NUMBER}
                            
                            docker stop spring-container
                            docker rm spring-container
                            docker rmi haoday/readit-spring:${prevBuildNumber}

                            docker run -dit --name spring-container -p 8080:8080 haoday/readit-spring:${env.BUILD_NUMBER}
                        """
                        def sshCommand = "ssh -o StrictHostKeyChecking=no ubuntu@배포서버1주소'${remoteCommands}'"
                        sh(script: sshCommand)
                    }
                }
            }   
        }
        stage('Remote SSH to server2') {
            steps {
                sshagent (credentials: ['ssh_credential']) {

                    script {
                        def prevBuildNumber = env.BUILD_NUMBER.toInteger() - 1
                        def remoteCommands = """
                        
                            curl ifconfig.me
                            docker stop fastapi-container
                            docker rm fastapi-container
                            docker rmi haoday/readit-fastapi:${prevBuildNumber}

                            docker run -dit --name fastapi-container -p 8888:8888 haoday/readit-fastapi:${env.BUILD_NUMBER}
                            
                            docker stop spring-container
                            docker rm spring-container
                            docker rmi haoday/readit-spring:${prevBuildNumber}

                            docker run -dit --name spring-container -p 8080:8080 haoday/readit-spring:${env.BUILD_NUMBER}
                        """
                        def sshCommand = "ssh -o StrictHostKeyChecking=no ubuntu@배포서버2주소 '${remoteCommands}'"
                        sh(script: sshCommand)
                    }
                }
            }   
        }
    }

    post {
        success {
            script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend (color: 'good', 
                message: "빌드 성공: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)", 
                endpoint: 'https://meeting.ssafy.com/hooks/c4sjimgdc3b5frqodq5jwbmepr', 
                channel: 'A705-Alert'
                )
            }
        }
        failure {
            script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend (color: 'danger', 
                message: "빌드 실패: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)", 
                endpoint: 'https://meeting.ssafy.com/hooks/c4sjimgdc3b5frqodq5jwbmepr', 
                channel: 'A705-Alert'
                )
            }
        }
    }
}

```
### 프론트엔드 파이프라인
``` 
pipeline {
    agent any //agent:

    stages {
        
        stage('git clone') {
            steps {
                git branch: 'frontend',
                credentialsId: 'hayoung_id_pwd', 
                url: 'https://lab.ssafy.com/s10-final/S10P31A705'
            }
        }
        
        stage('Copy setting file'){
            steps{
                sh '''
                    cp /home/ubuntu/front-env/.env /var/lib/jenkins/workspace/ReadIt-Front/frontend
                '''
            }
        }

        stage('Copy Frontend to Prod Server') {
            steps {
                sshagent (credentials: ['ssh_credential']) {
                    sh '''
                    scp -o StrictHostKeyChecking=no -r /var/lib/jenkins/workspace/ReadIt-Front/frontend ubuntu@배포서버1주소:/home/ubuntu/front-end
                    '''
                }
            }
        }


        stage('Front Deploy 1') {
            steps {
                sshagent (credentials: ['ssh_credential']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@배포서버1주소 "cd /home/ubuntu/front-end/frontend && sudo npm install -g pnpm && pnpm i && pnpm run build && sudo cp -r /home/ubuntu/front-end/frontend/dist/* /var/www/html/"
                    '''
                }
            }
        }

         stage('Copy Frontend to Prod2 Server') {
             steps {
                 sshagent (credentials: ['ssh_credential']) {
                     sh '''
                     scp -o StrictHostKeyChecking=no -r /var/lib/jenkins/workspace/ReadIt-Front/frontend ubuntu@배포서버2주소:/home/ubuntu/front-end
                     '''
                 }
             }
         }

        
         stage('Front Deploy 2') {
             steps {
                 sshagent (credentials: ['ssh_credential']) {
                     sh '''
                     ssh -o StrictHostKeyChecking=no ubuntu@배포서버2주소 "cd /home/ubuntu/front-end/frontend && sudo npm install -g pnpm && pnpm i && pnpm run build && sudo cp -r /home/ubuntu/front-end/frontend/dist/* /var/www/html/"
                     '''
                 }
             }
         }
    }

    post {
        success {
            script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend (color: 'good', 
                message: "빌드 성공: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)", 
                endpoint: 'https://meeting.ssafy.com/hooks/c4sjimgdc3b5frqodq5jwbmepr', 
                channel: 'A705-Alert'
                )
            }
        }
        failure {
            script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend (color: 'danger', 
                message: "빌드 실패: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)", 
                endpoint: 'https://meeting.ssafy.com/hooks/c4sjimgdc3b5frqodq5jwbmepr', 
                channel: 'A705-Alert'
                )
            }
        }
    }
}
```


---
## 실행
### 설정 파일 작성
- application.yml과 .env 파일 개발서버에 작성
### CI/CD 실행
- 위 과정을 모두 진행 한 후, Jenkins에서 빌드 수행
---

## 시연 시나리오
- 프로젝트 README.md 참고
