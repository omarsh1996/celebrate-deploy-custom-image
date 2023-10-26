# Helm Deploy Action

The Helm Deploy Action is a custom GitHub Action script written in TypeScript to facilitate deploying applications to Kubernetes using Helm. This action is designed to be used in a GitHub Actions workflow and automates the process of deploying applications to a Kubernetes cluster.

## Features

- Deploys applications to a Kubernetes cluster using Helm.
- Supports custom environment variable mappings to Helm values.
- Allows for dynamic configuration based on GitHub Actions inputs.
- Creates Kubernetes namespaces if they do not exist.

## Prerequisites

Before using this action, make sure you have the following in place:

1. A Kubernetes cluster properly configured and accessible.
2. Helm installed in your GitHub Actions runner environment.
3. Helm chart for your application ready to use.
4. Necessary secrets and environment variables set in your GitHub repository or workflow.

## Usage

To use this action, you'll need to create a GitHub Actions workflow file (e.g., `.github/workflows/deploy.yml`) and configure it as follows:

```yaml
name: Deploy to Kubernetes

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Helm
      run: |
        helm repo add celebrate https://celebrate.github.io/celebrate-helm/
        helm repo update
      if: success()

    - name: Deploy Application
      env:
        allSecrets: ${{ secrets.MY_SECRETS_JSON }}
        allVars: ${{ secrets.MY_VARS_JSON }}
        allInputs: ${{ toJson(needs.build.outputs) }}
      run: |
        npm install # Or yarn install, depending on your project
        npm run deploy
      with:
        app-name: my-app
        branch-name: main
