# Running the RAG Process
Example RAG process to embed data from relational DB, documents, and websites for Llama 3.1 model

# Pre-Requisites
1. Install Ollama
    ```
    # Windows
    winget install ollama
    # Mac
    brew install ollama
    ```
2. Install Python 3.12
    ```
    # Windows
    winget install Python.Python.3.12
    # Mac
    brew install python@3.12
    ```


# Setup
1. Pull models via Ollama
    ```
    ollama pull nomic-embed-text
    ollama pull llama3.1:8B
    ```
1. Install Python Dependencies
    ```
    cd ./opendine-ai
    python -m venv ./
    pip install -r ./requirements.txt
    ```