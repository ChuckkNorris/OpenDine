from langchain_community.document_loaders import WebBaseLoader
from langchain_community.vectorstores import Chroma
from langchain_community import embeddings
from langchain_community.chat_models import ChatOllama
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain.text_splitter import CharacterTextSplitter
from helpers.rag_helpers import RagWebLoader
import sys

model_local = ChatOllama(model="llama3.1:8B", device="cuda")

# Chunk data
ozempicUrls = [
  'https://www.bbc.com/news/live/c04p5916k4xt',
  'https://www.cbsnews.com/news/ozempic-wegovy-price-novo-nordisk-senate-committee-hearing/',
  'https://www.lawsuit-information-center.com/ozempic-gastroparesis-lawsuit.html',
]

chinaUrls = [
  'https://www.britannica.com/place/China',
  # 'https://www.bbc.com/news/live/c04p5916k4xt',
  # 'https://www.cbsnews.com/news/ozempic-wegovy-price-novo-nordisk-senate-committee-hearing/',
  # 'https://www.lawsuit-information-center.com/ozempic-gastroparesis-lawsuit.html',
]

# Get the first parameter to the python exe
prompt = sys.argv[1] if len(sys.argv) > 1 else 'What is the population of China?'

# retriever = get_vector_store_for_urls(urls)
loader = RagWebLoader(model_local)
retriever = loader.get_vector_store_for_urls({
  "ozempic": loader.get_doc_splits_from_urls(ozempicUrls),
  "china": loader.get_doc_splits_from_urls(chinaUrls),
})
loader.invoke_rag_chain(prompt, retriever)

# print("Before RAG\n")
# before_rag_template = "What is {topic}"
# before_rag_prompt = ChatPromptTemplate.from_template(before_rag_template)
# before_rag_chain = before_rag_prompt | model_local | StrOutputParser()
# print(before_rag_chain.invoke({ "topic": "Ozempic"}))

# After RAG
# print("\nAfter RAG\n")
# after_rag_template = """
# Answer the question based only on the following context:
# {context}

# Question: {question}
# """
# after_rag_prompt = ChatPromptTemplate.from_template(after_rag_template)
# after_rag_chain = (
#   {"context": retriever, "question": RunnablePassthrough()}
#   | after_rag_prompt
#   | model_local
#   | StrOutputParser()
# )
# print(after_rag_chain.invoke({"topic": "Ozempic"}))