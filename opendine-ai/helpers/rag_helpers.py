from langchain_community.document_loaders import WebBaseLoader
from langchain_community.vectorstores import Chroma
from langchain_community import embeddings

from langchain.text_splitter import CharacterTextSplitter

class RagWebLoader:
  def __init__(self, model_local, urls, template="Answer the following questions {topic}"):
    self.urls = urls
    self.model_local = model_local
    self.template = template

  def get_vector_store_for_urls(self, urls):
    docs = [WebBaseLoader(url).load() for url in urls]
    docs_list = [item for sublist in docs for item in sublist]
    text_splitter = CharacterTextSplitter.from_tiktoken_encoder(chunk_size=7500, chunk_overlap=100)
    doc_splits = text_splitter.split_documents(docs_list)

    vectorstore = Chroma.from_documents(
      documents=doc_splits,
      collection_name="bbc_news",
      embedding=embeddings.OllamaEmbeddings(model='nomic-embed-text'),
    )
    return vectorstore.as_retriever()

  def invoke_rag_chain(self, query):
    from langchain_community.chat_models import ChatOllama
    from langchain_core.runnables import RunnablePassthrough
    from langchain_core.output_parsers import StrOutputParser
    from langchain_core.prompts import ChatPromptTemplate

    retriever = self.get_vector_store_for_urls(self.urls)

    template = ChatPromptTemplate([
            ("system", "You are an angry chatbot. If relevant to the query, please prefer using this context in your answers: {context}"), # Your name is {name}."),
            ("human", "Hello, how are you doing?"),
            ("ai", "I'm doing absolutely spectacular! Thank you SOOOO much for asking!"),
            ("human", "{question}"),
        ])
    rag_prompt = ChatPromptTemplate.from_template(self.template)
    rag_chain = (
      {"context": retriever, "question": RunnablePassthrough()}
      | template #rag_prompt # template
      | self.model_local
      | StrOutputParser()
    )
    print(rag_chain.invoke({ 'question': query}))
    # after_rag_chain.invoke({"topic": "Ozempic"})
    # #rag_chain = rag_prompt | model_local | StrOutputParser()

    # before_rag_template = "Answer the following questions {topic}"
    # before_rag_prompt = ChatPromptTemplate.from_template(before_rag_template)
    # before_rag_chain = before_rag_prompt | model_local | StrOutputParser()
    # print(before_rag_chain.invoke({ "query": "query"}))

    

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
    # return after_rag_chain.invoke({"topic": "Ozempic"})