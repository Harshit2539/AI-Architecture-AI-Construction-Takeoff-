# AI-Construction Takeoff Platform

An enterprise-grade Document Management System powered by AI-based detection, automated data extraction, and a modular microservice-ready architecture.

---

## 🚀 Architecture Overview

This project is a multi-stack monorepo containing four key modules:

### **1. Frontend (React)**
- Built with Vite/React
- Modern UI for document upload, annotation visualization, and result dashboards

### **2. Backend (Node.js + MongoDB)**
- REST APIs for authentication, project management, file handling
- MongoDB for storing hierarchy metadata, ML outputs, and document structures
- Supports scalable microservice integration

### **3. Python AI Engine**
- Runs detection models (YOLO / custom CNN / OCR)
- Performs classification, area extraction, structure mapping
- Acts as an inference microservice

### **4. Training Pipeline**
- Annotation datasets
- Model training scripts
- Versioned experiments
- Outputs model weights (ignored via .gitignore)

---

## 📁 Directory Structure

project-root/
│── frontend/ # User interface
│── backend/ # Node.js API + MongoDB
│── python/ # AI engine for inference
│── training/ # ML training pipeline
│── README.md
│── .gitignore


---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind, Vite
- **Backend:** Node.js, Express, MongoDB
- **AI Engine:** Python, YOLO, OpenCV, FastAPI (optional)
- **Training:** PyTorch / TensorFlow, annotation datasets

---

## 📦 Setup & Installation

### **Frontend**
cd frontend
npm install
npm run dev



### **Backend**
cd backend
npm install
npm start


### **Python AI Service**
cd python
pip install -r requirements.txt
python main.py


### **Training**
cd training
python train.py


---

## 🚀 Deployment Ready

- Modular for microservices
- Scalable for CI/CD pipelines
- AI models isolated from codebase
- Clean git structure using ignore rules

---

## 🤝 Contribution

Fork → Branch → Commit → Pull Request.

---

## 📜 License

MIT License
