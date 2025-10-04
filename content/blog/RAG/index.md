---
title: "RAG의 핵심 개념과 실습"
date: "2025-10-01"
description: "RAG의 핵심 개념부터 벡터 DB 구축, 실제 챗봇 구현까지 Python 코드와 함께 알아보자."
thumbnail: "./index.png"
pointColor: "#FF6B6B"
tags: ["AI"]
---

> 대형 언어 모델의 한계를 극복하고 실시간 정보 활용을 가능하게 하는 RAG 기술이 주목받고 있다. 검색과 생성을 결합한 이 혁신적인 접근법을 이론부터 실습까지 알아보자.

## 1️⃣ RAG란?

#### 1-1 RAG의 정의

`RAG(Retrieval-Augmented Generation)`는 자연어 처리 분야에서 사용되는 기술로 **정보 검색을 통해** 언어 생성 과정을 향상시키는 방식이다.

기존 언어 모델이 사전 학습된 지식에만 의존하는 반면, RAG는 외부 데이터베이스에서 관련 정보를 실시간으로 검색하여 더 정확하고 최신의 답변을 생성한다.

#### 1-2 RAG 작동 원리

RAG의 작동 과정은 다음과 같다:

1. **사용자가 질문을 입력한다**
2. **RAG는 외부 데이터베이스에서 질문과 관련된 정보를 검색한다**
3. **검색된 정보를 기반으로 LLM이 답변을 생성한다**

```python
# RAG 작동 원리 예시
def rag_process(user_query):
    # 1. 사용자 질문 입력
    query = user_query

    # 2. 외부 DB에서 관련 정보 검색
    relevant_docs = vector_db.search(query, top_k=3)

    # 3. 검색된 정보와 함께 LLM에 전달
    context = "\n".join(relevant_docs)
    prompt = f"Context: {context}\nQuestion: {query}\nAnswer:"

    # 4. 최종 답변 생성
    answer = llm.generate(prompt)
    return answer
```

## 2️⃣ RAG는 왜 필요할까?

#### 2-1 대형 언어 모델의 한계

ChatGPT와 같은 **대량의 데이터를 학습한 대규모 언어 모델**도 다음과 같은 한계를 가진다:

- **Knowledge Cutoff**: 학습 이후에 새로 나온 데이터에 대해서는 답변이 어려움
- **Training Data Cutoff**: 학습하지 않은 특정 도메인 데이터들에 대한 제한적 지식
- **할루시네이션**: 사실이 아닌 내용을 그럴듯하게 생성하는 문제

#### 2-2 RAG의 해결 방안

RAG는 **실시간으로 부족한 데이터를 주입**하기 위해 고안된 방법으로 다음과 같은 이점을 제공한다:

- 최신 정보에 기반한 정확한 답변 생성
- 특정 도메인 지식의 실시간 활용
- 출처가 명확한 신뢰할 수 있는 응답 제공

## 3️⃣ RAG 작동 과정

#### 3-1 데이터 임베딩 및 Vector DB 구축

RAG의 첫 번째 단계는 **데이터를 임베딩 모델에 통합**하는 것이다.

```python
# 임베딩 과정 예시
def create_embeddings(text_data):
    """
    텍스트 데이터를 임베딩 벡터로 변환
    """
    # 텍스트를 chunk 단위로 분할
    chunks = chunk_text(text_data, chunk_size=400, chunk_overlap=50)

    # 각 chunk를 벡터로 변환
    embeddings = []
    for chunk in chunks:
        embedding = embedding_model.encode(chunk)
        embeddings.append(embedding)

    return chunks, embeddings
```

**임베딩**이란 텍스트, 이미지 등의 데이터를 `벡터 임베딩(Vector Embedding)`라고 하는 수치화된 배열로 변환한 방법을 의미한다:

- 사과 = [0.00212, -0.00328, 0.00789...]
- 배 = [0.00234, -0.00222, 0.00635...]
- 컴퓨터 = [-0.078, 0.00986, 0.00123...]

### Chunking의 이해

**Chunking**이란 긴 문서를 AI에게 통째로 전달하면 성능이 떨어지거나 context 길이 제한을 초과해 제대로 처리하지 못할 수 있어서, **긴 문서를 작은 덩어리로 나누는 작업**이다.

```python
# Chunking 예시
document = """안녕하세요. 저는 인공지능에 관심이 많고 생성형 AI에 대해서
공부하고 있습니다. 오늘은 RAG를 배웠습니다."""

# Chunk 결과
chunks = [
    "안녕하세요. 저는 인공지능에 관심이 많고 생성형 AI에 대해서 공부하",
    "형 AI에 대해서 공부하고 있습니다. 오늘은 RAG를 배웠습니다."
]
```

**주요 파라미터:**

- **chunk_size**: 하나의 chunk에 포함되는 글자 수
- **chunk_overlap**: 청크끼리 일정 부분 겹치게 만드는 설정

`chunk_overlap`을 사용하는 이유는 chunk가 정확히 잘리는 지점에서 문장의 맥락이 끊기면 AI가 의미를 파악하기 어려워지기 때문이다.

#### 3-2 쿼리 벡터화 및 관련 정보 추출

사용자의 **질문을 벡터화**하고, **벡터 DB를 대상으로 유사도 검색**을 사용하여 가장 관련성이 높은 상위 K개의 항목을 추출한다.

##### 벡터 유사도 검색

임베딩을 통해 저장된 데이터는 **벡터 간의 거리를 측정**하여 얼마나 유사한지를 평가한다. 주요 유사도 측정 방식은 다음과 같다:

| 방식                 | 설명                                     | 특징                                       |
| -------------------- | ---------------------------------------- | ------------------------------------------ |
| **유클리드 거리**    | 두 벡터의 끝점을 잇는 가장 짧은 직선거리 | 벡터의 크기와 방향을 모두 고려             |
| **코사인 유사도**    | 두 벡터간의 각도를 이용하여 측정         | 벡터의 방향에 중점, 고차원 데이터에 효과적 |
| **내적 기반 유사도** | 벡터의 내적으로 측정                     | 방향성과 크기를 모두 고려                  |

```python
def vector_similarity_search(query_vector, database_vectors, top_k=3):
    """
    쿼리 벡터와 가장 유사한 상위 k개 벡터 검색
    """
    similarities = []

    for i, doc_vector in enumerate(database_vectors):
        # 코사인 유사도 계산
        similarity = cosine_similarity(query_vector, doc_vector)
        similarities.append((i, similarity))

    # 유사도 기준 정렬 후 상위 k개 반환
    similarities.sort(key=lambda x: x[1], reverse=True)
    return similarities[:top_k]
```

#### 3-3 LLM을 통한 답변 생성

LLM은 **쿼리 텍스트와 추출된 관련 정보**를 바탕으로 최종 답변을 생성한다. 이 과정에서 **정확한 출처에 기반한 답변**이 가능해진다.

```python
def generate_final_answer(query, retrieved_docs):
    """
    검색된 문서를 바탕으로 최종 답변 생성
    """
    # 검색된 문서들을 하나의 컨텍스트로 결합
    context = "\n".join([doc.content for doc in retrieved_docs])

    prompt = f"""
    다음 문서들을 참고하여 질문에 답변해주세요:

    문서 내용:
    {context}

    질문: {query}
    답변:
    """

    response = llm.generate(prompt)
    return response
```

## 4️⃣ RAG vs Fine-tuning

두 가지 접근법의 차이점을 명확히 이해해보자.

#### 4-1 RAG (검색 기반 생성)

**외부 지식을 검색해 GPT에게 전달**하고 그를 바탕으로 응답을 생성하는 방식이다.

#### 4-2 Fine-tuning (모델 미세조정)

**기존 GPT 모델에 새로운 데이터를 학습**시켜, 모델 자체를 바꾸는 방식이다.

#### 4-3 비교 분석

| 구분            | RAG                              | Fine-tuning                             |
| --------------- | -------------------------------- | --------------------------------------- |
| **데이터 반영** | 외부 문서만 바꾸면 즉시 반영     | 새로 학습해야 반영됨 (느림)             |
| **구축 복잡도** | 문서 쪼개기 + 벡터DB 구성        | 학습 데이터 준비 + 학습 + 파라미터 조정 |
| **비용**        | 상대적으로 저렴                  | GPU 비용 + 학습시간 + 모델 호스팅 비용  |
| **응답 속도**   | 검색 단계로 인해 상대적으로 느림 | 모델 내장 지식이라 빠름                 |
| **유연성**      | 실시간 정보 업데이트 가능        | 모델 재학습 필요                        |

```python
# RAG 방식 예시
def rag_approach(query):
    docs = vector_db.search(query)  # 실시간 검색
    return llm.generate_with_context(query, docs)

# Fine-tuning 방식 예시
def finetuned_approach(query):
    return finetuned_model.generate(query)  # 학습된 지식 활용
```

## 5️⃣ Vector DB

#### 5-1 Vector DB의 정의

**Vector DB**는 데이터를 **벡터 형태로 저장**하고, **벡터 간 유사도를 기반으로 검색**하는 데이터베이스다.

기존의 관계형 DB가 행과 열의 2차원 형식으로 데이터를 표현하는 반면, Vector DB는 **다차원 공간으로 개념을 확장**한다.

#### 5-2 Vector DB가 필요한 이유

생성형 AI나 RAG에서 Vector DB를 사용하는 이유:

- 자연어 문서를 텍스트 그대로 저장하지 않음
- **AI가 이해 가능한 형태인 벡터로 변환**하여 저장
- **유사한 의미의 문서나 문장들을 빠르게 검색** 가능

```python
# Vector DB 저장 및 검색 예시
class SimpleVectorDB:
    def __init__(self):
        self.vectors = []
        self.documents = []

    def add_document(self, text, vector):
        """문서와 벡터를 DB에 저장"""
        self.documents.append(text)
        self.vectors.append(vector)

    def search(self, query_vector, top_k=3):
        """쿼리 벡터와 유사한 문서 검색"""
        similarities = []
        for i, vec in enumerate(self.vectors):
            sim = cosine_similarity(query_vector, vec)
            similarities.append((i, sim))

        # 상위 k개 반환
        similarities.sort(key=lambda x: x[1], reverse=True)
        results = []
        for i, _ in similarities[:top_k]:
            results.append(self.documents[i])

        return results
```

#### 5-3 주요 Vector DB 종류

| DB 이름      | 특징                            | 사용 케이스        |
| ------------ | ------------------------------- | ------------------ |
| **Chroma**   | Python 기반 오픈소스, 설치 간단 | 프로토타입, 실습용 |
| **Pinecone** | 클라우드 기반, 확장성 우수      | 상용 서비스        |
| **Weaviate** | GraphQL 지원, 다양한 벡터 검색  | 복합 검색          |
| **Qdrant**   | Rust 기반, 고성능               | 대용량 처리        |

#### 5-4 Chroma 선택 이유

실습에서 **Chroma**를 선택한 이유:

- Python 기반의 오픈소스 라이브러리로 **설치 과정이 단순**
- 별도의 서버를 띄우거나 복잡한 설정 없이 **몇 줄의 코드만으로 벡터 DB 구축 가능**
- 빠르게 개념을 익히고 간단한 환경에서 직접 체험하기에 적합

```bash
# Chroma 설치
pip install chromadb
```

## 6️⃣ 실습코드 1 - Vector DB 구축

#### 6-1 전체 흐름 요약

- **초기화**: 데이터베이스와 컬렉션을 초기화하여 영구 저장소 준비
- **데이터 로드**: 지정된 폴더에서 텍스트 파일들을 불러옴
- **전처리**: 각 텍스트 파일을 일정 길이의 청크로 분할하여 문맥 유지
- **임베딩 생성 및 저장**: 각 청크에 대해 OpenAI 임베딩을 생성하고 벡터 DB에 저장

#### 6-2 build_vector_db.py 구현

##### 환경 설정 및 초기화

```python
import os
from openai import OpenAI
import chromadb
from chromadb.config import Settings
from dotenv import load_dotenv

# 환경 변수 로드하여 API 키 가져오고 OpenAI 클라이언트 초기화
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)
```

##### DB 초기화 함수

```python
def init_db(db_path="./chroma_db"):
    """Vector DB 초기화 및 컬렉션 생성"""
    dbclient = chromadb.PersistentClient(path=db_path)
    # rag_collection이라는 데이터 컬렉션 생성
    collection = dbclient.create_collection(
        name="rag_collection",
        get_or_create=True
    )
    return dbclient, collection
```

##### 텍스트 파일 로딩

```python
def load_text_files(folder_path):
    """지정된 폴더에서 모든 .txt 파일 로드"""
    docs = []
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        if file_path.endswith(".txt"):
            with open(file_path, "r", encoding="utf-8") as f:
                text = f.read()
                docs.append((filename, text))
    return docs
```

##### 임베딩 생성

```python
def get_embedding(text, model="text-embedding-3-large"):
    """주어진 텍스트를 임베딩 벡터로 변환"""
    response = client.embeddings.create(input=[text], model=model)
    embedding = response.data[0].embedding
    return embedding
```

##### 텍스트 청킹

```python
def chunk_text(text, chunk_size=400, chunk_overlap=50):
    """원천 데이터를 청크 단위로 나누고 overlap 적용"""
    chunks = []
    start = 0

    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        chunks.append(chunk)
        start = end - chunk_overlap

        # 예외 처리
        if start < 0:
            start = 0
        if start >= len(text):
            break

    return chunks
```

##### 메인 실행 로직

```python
if __name__ == "__main__":
    # DB 초기화
    dbclient, collection = init_db("./chroma_db")

    # 문서 로드
    folder_path = "./source_data"
    docs = load_text_files(folder_path)

    doc_id = 0
    for filename, text in docs:
        chunks = chunk_text(text, chunk_size=400, chunk_overlap=50)

        for idx, chunk in enumerate(chunks):
            doc_id += 1
            embedding = get_embedding(chunk)

            # Vector DB에 저장
            collection.add(
                documents=[chunk],  # 실제 청크 텍스트
                embeddings=[embedding],  # 생성된 임베딩 벡터
                metadatas=[{
                    "filename": filename,
                    "chunk_index": idx
                }],
                ids=[str(doc_id)]  # 고유 식별자
            )

    print("모든 문서가 Vector DB에 저장 완료")
```

## 7️⃣ 실습코드 2 - RAG 챗봇 구현

#### 7-1 rag_chatbot.py 구현

##### 환경 설정 및 DB 연결

```python
import os
from openai import OpenAI
from build_vector_db import get_embedding
import chromadb
from dotenv import load_dotenv

load_dotenv()
dbclient = chromadb.PersistentClient(path="./chroma_db")
collection = dbclient.get_or_create_collection("rag_collection")
```

##### 문서 검색 함수

```python
def retrieve(query, top_k=3):
    """쿼리를 임베딩하여 가장 유사한 top-k개 문서 검색"""
    query_embedding = get_embedding(query)

    # Vector DB에서 유사한 문서 검색
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )

    return results
```

##### RAG 기반 답변 생성

```python
def generate_answer_with_context(query, top_k=3):
    """
    RAG 기반 답변 생성 프로세스:
    1) 쿼리에 대해 Vector DB에서 top_k개 문서 검색
    2) 검색된 문서들을 context로 구성
    3) Context와 함께 GPT에 프롬프트 전달
    4) 최종 답변 반환
    """

    # 1. 관련 문서 검색
    results = retrieve(query, top_k)
    found_docs = results["documents"][0]
    found_metadatas = results["metadatas"][0]

    # 2. Context 구성
    context_texts = []
    for doc_text, meta in zip(found_docs, found_metadatas):
        context_texts.append(
            f"<<filename: {meta['filename']}>>\n{doc_text}"
        )
    context_str = "\n\n".join(context_texts)

    # 3. 프롬프트 작성
    system_prompt = """
    당신은 주어진 문서 정보를 바탕으로 사용자 질문에 답변하는
    지능형 어시스턴트입니다. 다음 원칙을 엄격히 지키세요:

    1. 반드시 제공된 문서 내용에 근거해서만 답변을 작성하세요.
    2. 문서에 언급되지 않은 내용이라면, 함부로 추측하거나 만들어내지 마세요.
    3. 사실 관계를 명확히 기술하고, 불확실한 부분은 "정확한 정보를 찾지 못했습니다"라고 말하세요.
    4. 지나치게 장황하지 않게, 간결하고 알기 쉽게 설명하세요.
    5. 문서 출처나 연도가 중요하다면, 가능한 정확하게 전달하세요.
    """

    user_prompt = f"""아래는 검색된 문서들의 내용입니다:
    {context_str}
    질문: {query}"""

    # 4. ChatGPT 호출
    api_key = os.getenv("OPENAI_API_KEY")
    client = OpenAI(api_key=api_key)

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
    )

    answer = response.choices[0].message.content
    return answer
```

##### 비교용 일반 GPT 답변

```python
def generate_answer_without_context(query):
    """RAG 없이 일반 GPT로 답변하는 함수"""
    api_key = os.getenv("OPENAI_API_KEY")
    client = OpenAI(api_key=api_key)

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant"},
            {"role": "user", "content": query}
        ]
    )

    answer = response.choices[0].message.content
    return answer
```

##### 메인 실행 루프

```python
if __name__ == "__main__":
    while True:
        user_query = input("질문을 입력하세요(종료: quit): ")
        if user_query.lower() == "quit":
            break

        # RAG 기반 답변
        answer = generate_answer_with_context(user_query, top_k=3)
        # 일반 GPT 답변 (비교용)
        # answer = generate_answer_without_context(user_query)

        print("===답변===")
        print(answer)
        print("==========\n")
```

#### 7-2 검색 결과 데이터 구조

```python
# collection.query() 결과 예시
{
  "documents": [
    [문서1, 문서2, 문서3]  # 한 개의 쿼리에 대한 top_k 문서 리스트
  ],
  "metadatas": [
    [메타데이터1, 메타데이터2, 메타데이터3]  # 각 문서에 해당하는 메타데이터 리스트
  ]
}
```

## ✅ 정리

**RAG의 핵심 포인트**

- 🔍 **검색 기반**: 외부 지식을 실시간으로 검색하여 활용
- 📊 **벡터 검색**: 의미적 유사도 기반의 정확한 문서 검색
- 🎯 **맥락 제공**: 검색된 문서를 맥락으로 활용한 정확한 답변 생성
- ⚡ **실시간 반영**: 새로운 데이터를 즉시 활용 가능

**RAG vs Fine-tuning 선택 기준**

- **RAG**: 실시간 정보 업데이트, 비용 효율성, 출처 명시가 중요한 경우
- **Fine-tuning**: 특정 스타일/톤 학습, 응답 속도, 일관된 행동 패턴이 중요한 경우

**구현 시 고려사항**

- **청킹 전략**: chunk_size와 overlap 최적화
- **벡터 DB 선택**: 용량과 성능 요구사항에 맞는 DB 선택
- **임베딩 모델**: 도메인에 특화된 임베딩 모델 활용
- **검색 최적화**: 유사도 기준과 상위 K개 결과 수 조정

RAG는 현재 생성형 AI의 한계를 극복하고 신뢰할 수 있는 AI 서비스를 구축하는 핵심 기술이다. 체계적인 이해와 실습을 통해 실무에서 효과적으로 활용할 수 있다.
