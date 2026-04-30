resource "local_file" "project_info" {
  filename = "${path.module}/${var.project_name}-${var.environment}.txt"

  content = <<EOF
Project: ${var.project_name}
Environment: ${var.environment}
Managed by Terraform
EOF
}
