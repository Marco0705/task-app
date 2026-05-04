# Task App — Informe Final del Proyecto DevOps

## 1. Introducción

Este documento constituye el **informe final** del proyecto **Task App**, desarrollado como ejercicio práctico de **DevOps / Platform Engineering**.

El proyecto tiene como finalidad demostrar la aplicación real de prácticas DevOps modernas en un entorno controlado, cubriendo todo el ciclo de vida de una aplicación: desarrollo, integración continua, despliegue continuo, operación, observabilidad, seguridad, infraestructura como código y comunicación operativa.

---

## 2. Objetivos del proyecto

Los objetivos principales fueron:

- Implementar un flujo **CI/CD completo** y automatizado.
- Containerizar una aplicación backend y frontend.
- Desplegar la aplicación en **Kubernetes** siguiendo buenas prácticas.
- Aplicar un modelo **GitOps** con reconciliación automática.
- Integrar **observabilidad end‑to‑end**.
- Incorporar seguridad desde fases tempranas (**DevSecOps**).
- Gestionar infraestructura y configuración como código (**IaC**).
- Implementar **ChatOps** para mejorar la visibilidad operativa.

---

## 3. Alcance del proyecto

### Incluido en el alcance
- CI/CD con GitHub Actions.
- Containerización con Podman.
- Kubernetes local (Minikube) + Helm.
- GitOps con ArgoCD.
- Observabilidad con OpenTelemetry, Prometheus y Grafana.
- Seguridad con SonarCloud y Trivy.
- Infrastructure as Code con Terraform y Ansible.
- ChatOps mediante Slack.

### Excluido del alcance
- Despliegue en un cloud público real.
- Alta disponibilidad multi‑región.
- Escalado automático (HPA).
- Gestión avanzada de secretos cloud.

Estas exclusiones fueron **decisiones conscientes**, documentadas y justificadas por el contexto del proyecto.

---

## 4. Stack tecnológico

- **Backend**: .NET 8 Minimal API  
- **Frontend**: Angular  
- **CI/CD**: GitHub Actions  
- **Registry**: GitHub Container Registry  
- **Orquestación**: Kubernetes (Minikube)  
- **Packaging**: Helm  
- **GitOps**: ArgoCD  
- **Observabilidad**: OpenTelemetry, Prometheus, Grafana  
- **Seguridad**: SonarCloud, Trivy  
- **IaC**: Terraform, Ansible  
- **ChatOps**: Slack  

---

## 5. CI/CD y Gitflow

Se adoptó un modelo de ramas basado en buenas prácticas:

- `develop` para integración continua.
- `main` como rama estable de despliegue.
- Pull Requests obligatorios con validaciones automáticas.

La calidad y la seguridad del código se validan antes de permitir cualquier merge a `main`.

---

## 6. Kubernetes y GitOps

El despliegue se realiza mediante Helm y se gestiona con **ArgoCD**, aplicando GitOps como modelo operativo.

Ventajas obtenidas:
- Eliminación de despliegues manuales.
- Reconciliación automática del estado.
- Detección y corrección de *drift*.
- Git como única fuente de la verdad.

---

## 7. Observabilidad

La observabilidad se implantó como un requisito esencial:

- Instrumentación automática del backend con OpenTelemetry.
- Exportación de métricas al OpenTelemetry Collector.
- Recolección de métricas con Prometheus Operator y ServiceMonitor.
- Visualización en Grafana (latencia, throughput, errores).

Esto permite entender el comportamiento real del sistema y facilita el diagnóstico de problemas.

---

## 8. Seguridad (DevSecOps)

La seguridad se integró siguiendo un enfoque **shift‑left**:

- **SonarCloud** analiza calidad y seguridad del código y bloquea PRs.
- **Trivy** escanea imágenes de contenedor en el pipeline de CD.
- El despliegue se bloquea ante vulnerabilidades **CRITICAL**.

La seguridad deja de ser un paso manual para formar parte del ciclo automatizado.

---

## 9. Infrastructure as Code

### Terraform
- Define infraestructura de forma declarativa.
- Uso de variables, outputs y estado.
- Ejecución reproducible (`init / plan / apply`).

### Ansible
- Automatiza configuración como código.
- Playbooks idempotentes.
- Ejecución desde WSL (Linux), práctica habitual en entornos Windows.

---

## 10. ChatOps

Se implementaron notificaciones automáticas de CD en **Slack**:

- Mensajes de éxito y fallo del pipeline.
- Información contextual del despliegue.
- Mejora de visibilidad y feedback inmediato.

La integración con Teams fue descartada tras detectar restricciones corporativas, decisión documentada y justificada.

---

## 11. Problemas reales encontrados

Durante el desarrollo se encontraron problemas reales, entre ellos:

- Restricciones de políticas corporativas en Microsoft Teams.
- Limitaciones de Trivy en Windows sin Docker.
- Complejidad inicial al integrar observabilidad en Kubernetes.
- Errores de configuración de pipelines y secrets en GitHub Actions.

Todos estos problemas se resolvieron mediante investigación, pruebas controladas o decisiones conscientes de alcance.

---

## 12. Lecciones aprendidas ✅

Esta sección recoge los principales aprendizajes del proyecto:

### 1. GitOps simplifica la operación
Delegar el despliegue en ArgoCD reduce errores humanos y añade trazabilidad. El acceso manual al clúster deja de ser necesario.

### 2. La observabilidad no debe ser opcional
Instrumentar la aplicación desde el inicio evita “volar a ciegas”. Sin métricas y trazas, diagnosticar errores es significativamente más complejo.

### 3. La seguridad debe integrarse temprano
Integrar SonarCloud y Trivy en CI/CD es más efectivo que auditar al final. Los problemas se detectan cuando aún son baratos de corregir.

### 4. Windows introduce retos reales
Ciertas herramientas (Ansible, Trivy) funcionan mejor en entornos Linux. Usar WSL no es un parche, sino una práctica habitual.

### 5. Las restricciones corporativas existen
No todas las decisiones dependen del equipo técnico. Saber documentar limitaciones y proponer alternativas es parte del trabajo DevOps.

### 6. IaC mejora reproducibilidad y confianza
Gestionar infraestructura y configuración como código permite volver atrás, repetir entornos y reducir errores manuales.

---

## 13. Próximos pasos

Como evolución natural del proyecto:

- Despliegue en cloud público (AKS, EKS o GKE).
- Activación de HPA y escalado automático.
- Gestión avanzada de secretos.
- Alerting y SLOs con Prometheus.
- CDN y TLS en frontend.

---

## 14. Conclusión

El proyecto **Task App** demuestra una implementación **DevOps end‑to‑end realista**, alineada con prácticas actuales de la industria.

Más allá del uso de herramientas, el valor principal del proyecto reside en:
- La automatización completa del ciclo de vida.
- La toma de decisiones técnicas consciente.
- La resolución de problemas reales.
- La integración de calidad, seguridad y observabilidad desde el inicio.

El resultado es una arquitectura extensible, mantenible y directamente extrapolable a entornos productivos.
``