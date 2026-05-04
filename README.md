# Task App — DevOps End‑to‑End Project

Aplicación web de gestión de tareas desarrollada como **proyecto final de DevOps**.

El objetivo del proyecto es demostrar una implementación **end‑to‑end** de prácticas DevOps reales, cubriendo todo el ciclo de vida de una aplicación: desarrollo, CI/CD, contenedores, Kubernetes, GitOps, observabilidad, seguridad (DevSecOps), Infrastructure as Code (IaC) y ChatOps.

Este repositorio está diseñado como **proyecto de portfolio profesional**, siguiendo patrones y decisiones habituales en equipos DevOps.

---

## 🏗 Visión general de la arquitectura

````
Developer
  └─ Git (develop → Pull Request → main)
        ├─ CI (GitHub Actions)
        │     ├─ Build backend (.NET)
        │     ├─ Build frontend (Angular)
        │     └─ SonarCloud (Quality Gate)
        └─ CD (GitHub Actions)
              ├─ Build imágenes
              ├─ Trivy (seguridad contenedores)
              ├─ Push a GHCR
              └─ ChatOps (Slack)

GitHub (main)
  └─ ArgoCD (GitOps)
        └─ Kubernetes (Minikube)
              ├─ Backend (.NET 8)
              ├─ Frontend (Angular)
              ├─ OpenTelemetry Collector
              ├─ Prometheus
              └─ Grafana
🧰 Tech Stack
Aplicación

Frontend: Angular
Backend: .NET 8 Minimal API

CI/CD

CI: GitHub Actions
CD: GitHub Actions
Container Registry: GitHub Container Registry (GHCR)

Contenedores y orquestación

Containers: Podman (entorno local)
Orchestration: Kubernetes (Minikube)
Packaging: Helm

Observabilidad

Instrumentación: OpenTelemetry
Métricas: Prometheus (kube‑prometheus‑stack)
Dashboards: Grafana

Seguridad (DevSecOps)

Calidad y seguridad de código: SonarCloud
Vulnerabilidades de contenedores: Trivy (integrado en CD)

GitOps

Continuous Deployment: ArgoCD
Modelo declarativo: auto‑sync y self‑healing

Infrastructure as Code

Terraform: definición declarativa de infraestructura
Ansible: Configuration as Code (idempotente)

ChatOps

Slack: notificaciones automáticas del pipeline de CD
````

## 🔁 Flujo de trabajo (Gitflow)
El repositorio sigue un flujo de trabajo profesional:

Desarrollo en la rama develop
Pull Requests hacia main
CI obligatorio en develop
Merge controlado a main
CD automático tras el merge

El pipeline de CD realiza:

Build de imágenes
Escaneo de seguridad con Trivy
Push de imágenes a GHCR
Despliegue mediante GitOps (ArgoCD)
Notificación a Slack


🚀 CI/CD
CI — Build & Quality
Triggers

Push a develop
Pull Requests hacia develop

Pasos

Build backend (.NET)
Build frontend (Angular)
Análisis SonarCloud
Validación de Quality Gate

Los Pull Requests se bloquean si no se cumple el estándar de calidad.

CD — Container Publish
Triggers

Merge a main
Tags de versión (vX.Y.Z)

Pasos

Build de imágenes de backend y frontend
Escaneo Trivy (bloquea vulnerabilidades CRITICAL)
Push a GHCR
Notificación automática a Slack

## ☸️ Kubernetes y GitOps

Cluster local con Minikube
Despliegue definido mediante Helm charts
ArgoCD observa el repositorio Git y reconcilia el estado del clúster

Características:

Auto‑sync
Self‑healing
Git como única fuente de la verdad

## 📊 Observabilidad

El proyecto incorpora un stack de observabilidad basado en **OpenTelemetry, Prometheus y Grafana**, desplegado en Kubernetes junto con la aplicación.

OpenTelemetry se utiliza para la instrumentación de la aplicación backend, enviando métricas al **OpenTelemetry Collector**, que actúa como punto central de ingestión. Prometheus y Grafana forman parte del stack de monitorización desplegado mediante kube‑prometheus‑stack.

En el estado actual del proyecto, la infraestructura de observabilidad está **correctamente desplegada y operativa**, aunque el scraping de métricas de aplicación no está activado mediante **ServiceMonitor / PodMonitor**. Esta decisión responde a un control consciente del alcance, priorizando la integración end‑to‑end de CI/CD, GitOps y Kubernetes.

La arquitectura queda preparada para una ampliación futura, donde bastaría añadir los recursos de scraping para habilitar métricas de aplicación y dashboards específicos en Grafana, sin necesidad de modificar el stack existente.

## 🔐 Seguridad (DevSecOps)

SonarCloud asegura calidad y seguridad del código
Trivy escanea imágenes de contenedor en CD
El pipeline falla ante vulnerabilidades CRITICAL
Enfoque shift‑left de seguridad

## 🏗 Infrastructure as Code
Terraform

Infraestructura definida de forma declarativa
Uso de variables, outputs y estado
Ejecución reproducible (init / plan / apply)

Ansible

Configuration as Code
Playbooks idempotentes
Ejecución desde WSL (Linux), práctica estándar en entornos Windows

## 💬 ChatOps

Notificaciones automáticas del pipeline de CD en Slack
Mensajes de éxito y fallo con información del despliegue
Mejora de visibilidad y feedback del sistema


## ▶️ Ejecución en local (modo desarrollo)

Backend
cd app/backend/TaskApi
dotnet run
Frontend
cd app/frontend/task-web
npm install
npm start

## 📁 Estructura del repositorio
````
app/
  ├─ backend/
  └─ frontend/
deploy/
  ├─ helm/
  └─ gitops/
infra/
  ├─ terraform/
  └─ ansible/
observability/
  ├─ otel-collector.yaml
  ├─ otel-collector-service.yaml
  ├─ otel-collector-servicemonitor.yaml
  └─ prometheus-values.yaml
.github/
  └─ workflows/
````

## 📌 Estado del proyecto

✅ Implementación DevOps end‑to‑end completada
✅ CI/CD, GitOps, Observabilidad, Seguridad, IaC y ChatOps operativos

## 👤 Autor

Proyecto desarrollado por **Marco Muñoz Gutiérrez**.
