#!/bin/sh

ssh -i keygen thomaseychenne47@34.155.238.191 << EOF
  sudo su stack
  cd ~/terraform
  terraform apply -auto-approve -lock=false
  echo [PRIVATE] Launched ] > log*
  ip=$(echo "$output" | grep -oP 'ip: \K.*')
  db_port=3306
  login=caca
  password=gab
  echo "Terraform apply completed successfully:"
  echo "$output"
  output=$(terraform apply -auto-approve tfplan Terraform/Web)
  echo "Terraform apply completed successfully:"
  echo "$output"
EOF

echo "done"