from langchain_community.document_loaders import WebBaseLoader
from langchain_community.vectorstores import Chroma
from langchain_community import embeddings
from langchain_community.chat_models import ChatOllama
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain.text_splitter import CharacterTextSplitter
from helpers.rag_helpers import RagWebLoader

model_local = ChatOllama(model="llama3.1:8B", device="cuda")

# Chunk data
urls = [
  'https://www.bbc.com/news/live/c04p5916k4xt',
  'https://www.cbsnews.com/news/ozempic-wegovy-price-novo-nordisk-senate-committee-hearing/',
]

# retriever = get_vector_store_for_urls(urls)
loader = RagWebLoader(model_local, urls)
loader.invoke_rag_chain('You are an angry chatbot. Is Ozempic expensive compared to other countries?')

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