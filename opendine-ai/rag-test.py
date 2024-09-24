from langchain_community.document_loaders import WebBaseLoader
from langchain_community.vectorstores import Chroma
from langchain_community import embeddings
from langchain_community.chat_models import ChatOllama
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain.text_splitter import CharacterTextSplitter

model_local = ChatOllama(model="llama3.1:8B", device="cuda")

# Chunk data
urls = [
  'https://www.bbc.com/news/live/c04p5916k4xt',
  'https://www.cbsnews.com/news/ozempic-wegovy-price-novo-nordisk-senate-committee-hearing/',
]

docs = [WebBaseLoader(url).load() for url in urls]
docs_list = [item for sublist in docs for item in sublist]
text_splitter = CharacterTextSplitter.from_tiktoken_encoder(chunk_size=7500, chunk_overlap=100)
doc_splits = text_splitter.split_documents(docs_list)

vectorstore = Chroma.from_documents(
  documents=doc_splits,
  collection_name="bbc_news",
  embedding=embeddings.OllamaEmbeddings(model='nomic-embed-text'),
)

retriever = vectorstore.as_retriever()

print("Before RAG\n")
before_rag_template = "What is {topic}"
before_rag_prompt = ChatPromptTemplate.from_template(before_rag_template)
before_rag_chain = before_rag_prompt | model_local | StrOutputParser()
print(before_rag_chain.invoke({ "topic": "Ozempic"}))

# After RAG
print("\nAfter RAG\n")
after_rag_template = """
Answer the question based only on the following context:
{context}

Question: {question}
"""
after_rag_prompt = ChatPromptTemplate.from_template(after_rag_template)
after_rag_chain = (
  {"context": retriever, "question": RunnablePassthrough()}
  | after_rag_prompt
  | model_local
  | StrOutputParser()
)
print(after_rag_chain.invoke({"topic": "Ozempic"}))