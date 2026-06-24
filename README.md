# 🚀 SalonBliss – DevOps Deployment Project

SalonBliss is a full-stack MERN application deployed using modern DevOps practices. The project demonstrates containerization, CI/CD automation, cloud deployment, monitoring, and infrastructure management using AWS and Docker-based workflows.

---

## 🌐 Live Deployment

* Application: http://13.201.162.181:3000/
* Frontend: React.js
* Backend: Node.js + Express.js
* Database: MongoDB Atlas

---

## 🏗️ DevOps Architecture

GitHub
↓
GitHub Actions (CI/CD)
↓
Docker Image Build
↓
Docker Hub Registry
↓
AWS EC2 Deployment
↓
Docker Compose
↓
CloudWatch Monitoring

---

## ⚙️ Key DevOps Implementations

### 🐳 Containerization

* Dockerized frontend and backend services.
* Multi-container deployment using Docker Compose.
* Environment-based configuration management.

### 🔄 CI/CD Automation

* Automated build and deployment pipeline using GitHub Actions.
* Docker image creation and publishing.
* Continuous deployment to AWS EC2 using SSH workflows.

### ☁️ AWS Infrastructure

* Application deployed on AWS EC2.
* Configured IAM, Security Groups, and networking rules.
* Monitored server health and application performance using CloudWatch.

### 📊 Monitoring

* AWS CloudWatch integration for infrastructure monitoring.
* Log inspection and server resource tracking.

### 🔐 Security

* JWT authentication and authorization.
* Environment variable management.
* Secure deployment using SSH keys.

---

## 🛠️ Tech Stack

### Application

* React.js
* Node.js
* Express.js
* MongoDB Atlas

### DevOps

* Docker
* Docker Compose
* GitHub Actions
* AWS EC2
* AWS IAM
* AWS CloudWatch
* Linux
* Nginx

---

## 🚀 Local Setup

### Clone Repository

```bash
git clone <repository-url>
cd salon-bliss
```

### Start Application

```bash
docker-compose up -d
```

### Verify Containers

```bash
docker ps
```

---

## 📈 Future Enhancements

* Kubernetes Deployment
* Terraform Infrastructure Provisioning
* Grafana & Prometheus Monitoring Stack
* Blue-Green Deployment Strategy
* AWS Load Balancer Integration

---

## 👨‍💻 Author

Aryan Patel

* LinkedIn: https://linkedin.com/in/aryanpatel1066
* Portfolio: https://aryanpatel.vercel.app
