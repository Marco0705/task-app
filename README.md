# Task App — DevOps End-to-End Project

Aplicación web de tareas desarrollada como proyecto final DevOps / Platform Engineering.

## Tech Stack
- Frontend: Angular + Bootstrap
- Backend: .NET 8 Minimal API
- CI/CD: GitHub Actions
- Registry: GitHub Container Registry
- Containers: Podman
- Orchestration: Kubernetes + Helm
- Observability: OpenTelemetry, Prometheus, Grafana
- Security: SonarQube, Trivy, Azure Key Vault
- GitOps: ArgoCD

## Run locally (dev)
### Backend
```bash
cd app/backend/TaskApi
dotnet run
````

### Frontend
```bash
cd app/forntend/task-web
npm start
````

