# How to Build Enterprise AI
The goal of this is to teach you the core concepts of AI and to demonstrate an enterprise-grade AI architecture/application

## Incremental Goals
- Model Training - Create model, train with custom data, store dataset and trained model in Huggingface
- Augmented Retrieval - Utilize custom, private datastores allowing users to ask questions about proprietary data

## Core Concepts
- System Prompts - Provided to LLM to define how it should operate and respond to user prompts
    > A system prompt is an instruction provided by the developers of an AI model. It sets the context, tone, and boundaries for the AI's responses. The system prompt acts as a guiding framework, shaping the behavior and style of the AI throughout the interaction
- User Prompts - Provided to LLM as a request for it to process and generate a response to
- Vectors - Sequences of numbers that represent data; the inputs and outputs of models. Vectors transform unstructured data (text, videos) into a format suitable for machine learning models to process

# Stack
## Machine Learning Developer Tools
- Huggingface - Repository (like GitHub) for storing models, datasets, and spaces

## Raw Data Sources
Raw data that is typically integrated into data store optimized for LLMs - can include SQL DBs, NoSQL DBs, documents, websites or other data that should be fed into an LLM for contextual information
- Relational DBs - Possible to use "text-to-SQL" models, but migrating data to optimized search provider can be more powerful and efficient (e.g. Solr, Redis)
- PDF/Word documents - 
- Websites

## LLM Models
Generates text responses to user prompts given instructions or other contextual data related to request
- GPT
- Llama
- Grok
- Gemini

## Embedding Models
- Nomic Text Embed - Embedding model for representing large text as vectors

## Finetuning / Training Tools
- Unsloth AI
- Ollama
- Lora

## AI Optimized Data Stores
Intermediate data store for quickly retrieving contextual information about a user's query
- Redis
- ChromaDb

## RAG Pipeline Tools
Used to persist and provide customized information to LLM
- LangChain
- LlamaIndex
- Pytorch

## Tools
- [Redis Vector Database?](https://redis.io/docs/latest/develop/get-started/vector-database/)
- [Ollama](https://redis.io/docs/latest/develop/get-started/vector-database/)

## Process
1. Configure Datastores
  - SQL Server Database - Create SQL Server Edge docker container
  - PDF Documents in OneDrive - Upload PDFs to OneDrive
  - Websites - Determine which website URLs to scrape for additional information
1. Determine Models to Use - Some may include:
  - Ollama
  - Mixtral
  - Nomic Embed Text?
1. Define System Prompt
  - Include Database Schema and tool specs (e.g. SQL Server)
  - Define instructions about how to respond to user queries with a few examples
      > Pro Tip: Enclose each section with XML tags to improve LLM understanding e.g.
        ```
        <instructions>
        Response concicely to user queries with a direct response to the question followed by additional context about the information provided. Cite which data sources were used by listing the query performed, or references to the site URLs used
        </instructions>
        <example>
        Last year's revenue in Q4 was $364,345
          - Revenue: $200,000
          - Expenses: $150,000
          - Net Profit: $50,000
        </example>
        ```
    - Define guidelines to add additional constraints
    - Define a response format e.g.
        ```
        <instructions>
        Response concicely to user queries with a direct response to the question followed by bulleted information similar to the examples below.
        </instructions>
        <example>
        Last year's revenue in Q4 was $364,345
          - Revenue: $200,000
          - Expenses: $150,000
          - Net Profit: $50,000
        </example>
        ```
1. Define intent for User Prompt
  - Questions could require information from one or many data sources requiring the model to:
    - Perform a SQL query (or Solr?), some may include joins
    - Scrape a website and embed the information
    - Review relevant PDF documents

TBD:
- splitting the prompt into system and user fragments and passing it to Ollama as two different parameters seemed to help with formatting the mixtral template and therefore generating better results. initially I passed everything into the prompt parameter which meant that Ollama would pass an empty system prompt (as per the Modelfile)

- given the non-deterministic nature of LLMs, I observed that sometimes the model would mess up on something (sql query, tool selection, etc.) where on a previous run it succeeded. Implementing retry logic on exceptions helped improve the guarantee of a good result

- mixtral worked much better than other models I tried! I'm going to the try the nous-hermes2-mixtral variant that was just released

- converting back to a simple natural language sentence required massaging of the inputs since the response from mixtral could be a variety of responses based on what combination the model identified as means to answering the original question

- helps to start very simple and iterate - there's a lot to learn and nothing works as easily as it should / you might think when using open source tools or generative AI for that matter...