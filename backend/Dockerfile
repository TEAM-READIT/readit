# Dockerfile

# jdk17 Image Start
FROM openjdk:17

# jar 파일 복제
COPY /var/lib/jenkins/workspace/Readit/backend/readit/build/libs/ReadIt-0.0.1-SNAPSHOT.jar app.jar

# 실행 명령어
ENTRYPOINT ["java", "-jar", "app.jar"]