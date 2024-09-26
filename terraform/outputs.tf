output "vpc_id" {
  value = module.vpc.vpc_id
}

output "frontend_service_url" {
  value = aws_ecs_service.frontend.name
}

output "backend_service_url" {
  value = aws_ecs_service.backend.name
}

output "db_instance_endpoint" {
  value = aws_db_instance.mysql.endpoint
}
