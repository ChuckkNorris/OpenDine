
# Draft Steps
1. Provision Azure resources in DEV environment using Terraform
   ```
   terraform init --backend-conf=./infra/environments/dev-backend.conf
   terraform apply --var-file=./infra/environments/dev.tfvars
   ```
1. Install Kubectl CLI
   ```
   # Windows
   winget install Kubernetes.kubectl
   
   # Mac
   brew install kubectl
   ```
1. Connect to AKS Cluster
   ```
   az aks get-credentials --resource-group rg-opendine-dev --name aks-opendine-dev
   ```
1. Login to Azure Container Registry
   ```
   az login
   az acr login --name acropendine.azurecr.io
   ```
1. Compile React Application
   ```
   docker build -t opendine-app
   ```