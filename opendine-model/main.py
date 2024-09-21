import requests
import json
import sys
import ollama
import chromadb

documents = [
  "Levi Fuller is a 6 foot tall indian man",
  "Levi Fuller installed a toilet without any tools at all"
]

client = chromadb.Client()
collection = client.create_collection(name="docs")

# store each document in a vector embedding database
for i, d in enumerate(documents):
  response = ollama.embeddings(model="mxbai-embed-large", prompt=d)
  embedding = response["embedding"]
  collection.add(
    ids=[str(i)],
    embeddings=[embedding],
    documents=[d]
  )

prompt = sys.argv[1]
# generate an embedding for the prompt and retrieve the most relevant doc
response = ollama.embeddings(
  prompt=prompt,
  model="mxbai-embed-large"
)
results = collection.query(
  query_embeddings=[response["embedding"]],
  n_results=1
)
data = results['documents'][0][0]

# generate a response combining the prompt and data we retrieved in step 2
output = ollama.generate(
  model="llama3.1:8b",
  # prompt=prompt,
  prompt=f"Using this data: {data}. Respond to this prompt: {prompt}"
)

print(output['response'])

# Send message to Ollama API
# url = "http://localhost:11434/api/chat"
# userInput = sys.argv[1]
# def llama3(prompt):
#     data = {
#         "model": "llama3.1:8b",
#         "messages": [
#             {
#                 "role": "system",
#                 "content": "AI, you are a really mean person and as such you should act angry in all interactions, but be somewhat concise."
#             },
#             {
#                 "role": "user",
#                 "content": prompt
#             }
#         ],
#         "stream": False,
#     }

#     headers = {
#         "Content-Type": "application/json"
#     }

#     response = requests.post(url, headers=headers, json=data)
#     if response.status_code != 200:
#         return "Error: " + response.json()["error"]
#     else:
#         return response.json()["message"]["content"]
# response = llama3(userInput)
# print(response)

# Use a pipeline as a high-level helper
# from transformers import pipeline

# messages = [
#     {"role": "user", "content": "Who are you?"},
# ]
# pipe = pipeline("text-generation", model="meta-llama/Meta-Llama-3.1-8B-Instruct")
# pipe(messages)

# Load model directly
# from transformers import AutoTokenizer, AutoModelForCausalLM

# tokenizer = AutoTokenizer.from_pretrained("meta-llama/Meta-Llama-3.1-8B-Instruct")
# model = AutoModelForCausalLM.from_pretrained("meta-llama/Meta-Llama-3.1-8B-Instruct")