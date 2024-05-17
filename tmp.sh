#!/bin/sh

ssh -i keygen thomaseychenne47@34.163.169.117 << EOF
  if [ -z "$vmss_count" ]; then
    vmss_count=1
  fi
  count="$vmss_count"
  echo "Actual count: $count"
  sudo su stack
  cd ~/terraform
  terraform apply -auto-approve -lock=false
  echo PRIVATE Launched > log
  vmss_count=$((vmss_count + 1))
  az vmss scale --resource-group myResourceGroup --name example-vmss --new-capacity 1
  export vmss_count
EOF

echo "done"
