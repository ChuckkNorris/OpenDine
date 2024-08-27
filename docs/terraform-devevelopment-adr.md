# Terraform Development Approaches

## Option A - Terraform Init Each Environment

**Directory Structure**
```
opendine
├── infra
│   ├── environments
│   │   ├── dev.conf
│   │   ├── dev.tfvars
│   │   ├── test.conf
│   │   ├── test.tfvars
│   │   ├── prod.conf
│   │   └── prod.tfvars
│   ├── modules
│   │   ├── app-service/main.tf
│   │   ├── networking/main.tf
│   │   └── database/main.tf
├── main.tf
└── variables.tf   
```

**Terraform Process**
1. Initialize the Terraform Environment (Must pass `-reconfigure` flag if changing backend)
    ```
      terraform init --backend-config="./infra/environments/dev-backend.conf" -reconfigure
    ```
1. Provision Infrastructure in Environment
    ```
      terraform apply --var-file="./infra/environments/dev.tfvars"
    ```

## Option B - Isolated Environments by Folder

**Directory Structure**
```
opendine
├── environments
│   ├── dev
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── terraform.tfvars
│   ├── test
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── terraform.tfvars
└── modules
    ├── app-service/
    ├── database/
    └── networking/
```

**Terraform Process**
1. Initialize Terraform for Environment
    ```
      cd environments/dev
      terraform init
    ```
1. Provision Infrastructure in Environment
    ```
      cd environments/dev
      terraform apply
    ```

## Option C - Terraform Workspaces

**Directory Structure**
```
opendine
├── infra
│   ├── environments
│   │   ├── dev.conf
│   │   ├── dev.tfvars
│   │   ├── test.conf
│   │   ├── test.tfvars
│   │   ├── prod.conf
│   │   └── prod.tfvars
│   ├── modules
│   │   ├── app-service/main.tf
│   │   ├── networking/main.tf
│   │   └── database/main.tf
├── main.tf
└── variables.tf   
```

**Terraform Process**
1. Initialize Terraform for Environment
    ```
      terraform workspace new dev
      terraform init --backend-config="./infra/environments/dev-backend.conf"
    ```
1. Provision Infrastructure in Environment
    ```
      terraform apply --var-file="./infra/environments/dev.tfvars"
      terraform apply
    ```
