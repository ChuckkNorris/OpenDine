
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
1. Connect to AKS Cluster to manage the AKS cluster via Kubectl
   ```
   az aks get-credentials --resource-group rg-opendine-dev --name aks-opendine-dev
   ```
1. Login to Azure Container Registry (change `acropendine` to the name of your Azure Container Registry)
   ```
   az login
   az acr login --name acropendine.azurecr.io
   ```
1. Compile React Application and Push to Azure Container Registry
   ```
   cd ./opendine-app
   docker build -t acropendine.azurecr.io/opendine-app:1 .
   docker run -it -p 4200:8080 -t acropendine.azurecr.io/opendine-app:1
   docker push acropendine.azurecr.io/opendine-app:1
   ```
1. Update `manifest.yml` with your image e.g.
   ```
   containers:
    - name: opendine-app
      image: acropendine.azurecr.io/opendine-app:latest
   ```
1. Deploy opendine-app to AKS Cluster
    ```
    kubectl apply -f manifest.yml
    ```
1. Verify the deployment succeeded, then access React app via External IP Address
    ```
    kubectl get service opendine-app -n opendine-dev --watch
    ```