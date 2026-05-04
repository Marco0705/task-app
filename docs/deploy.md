# 🚀 Despliegue y arranque del proyecto Task App (Runbook)

Este documento describe **paso a paso** cómo levantar la aplicación **Task App** tras apagar el ordenador, siguiendo un flujo **GitOps + Kubernetes + ArgoCD**.

El objetivo es poder **arrancar y enseñar la aplicación sin improvisar**, de forma reproducible y profesional.

---

## ✅ Prerrequisitos

Antes de empezar, asegúrate de tener instalado:

- Minikube
- kubectl
- Helm
- Docker o Podman
- Git

---

## 1️⃣ Arrancar Kubernetes (Minikube)

Inicia el clúster local:

```bash
minikube start
```

Comprueba el estado:

```bash
minikube status
```

Verifica que el nodo está disponible:

```bash
kubectl get nodes
```

## 2️⃣ Verificar el contexto de Kubernetes

Asegúrate de que kubectl apunta a Minikube:

```bash
kubectl config use-context minikube
```

## 3️⃣ Comprobar que ArgoCD está desplegado

Verifica que los pods de ArgoCD están en ejecución:

```bash
kubectl get pods -n argocd
```

## 4️⃣ Acceder a la interfaz de ArgoCD

Expón la UI de ArgoCD:

```bash
kubectl port-forward -n argocd svc/argocd-server 8080:443
```

Abre en el navegador:  https://localhost:8080

Credenciales:

Usuario: admin

Para obtener la contraseña inicial:

```bash
kubectl get secret argocd-initial-admin-secret -n argocd `
  -o jsonpath="{.data.password}" |
  % { [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($_)) }
```

## 5️⃣ Verificar el estado GitOps en ArgoCD

En la UI de ArgoCD deben aparecer dos aplicaciones:

✅ taskapi
✅ taskweb

Ambas deben estar en estado: Synced, Healthy

👉 Si alguna no lo está, pulsa Sync.

```bash
kubectl get pods -n argocd
```

## 6️⃣ Verificación del estado real del clúster

Desde la terminal, comprueba el estado de los recursos:

```bash
kubectl get deploy -n task-app
kubectl get pods -n task-app
kubectl get svc -n task-app
```
✅ Debe existir:

Deployments: taskapi, taskweb
Pods: Todos en estado Running
Services: taskapi → puerto 8080, taskweb → puerto 80

## 7️⃣ Exponer la aplicación

En una terminal:

```bash
kubectl port-forward -n task-app svc/taskweb 4200:80
```

Abrir en el navegador: http://localhost:4200

✅ La interfaz web debe cargarse correctamente.

El frontend utiliza NGINX como reverse proxy para enrutar /api/* hacia el backend dentro del clúster.

## Backend (opcional, para demo técnica)

En otra terminal:

```bash
kubectl port-forward -n task-app svc/taskapi 5000:8080
```

Probar la API directamente: http://localhost:5000/api/tasks

✅ La interfaz web debe cargarse correctamente.

El frontend utiliza NGINX como reverse proxy para enrutar /api/* hacia el backend dentro del clúster.