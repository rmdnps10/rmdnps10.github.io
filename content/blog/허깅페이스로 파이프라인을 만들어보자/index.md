---
title: "허깅페이스로 파이프라인을 만들어보자 - 트랜스포머 모델 활용 가이드"
slug: "make-huggingface-pipeline"
date: "2025-10-04"
description: "허깅페이스 라이브러리로 NLP 모델을 쉽게 활용하는 방법부터 복합 파이프라인 구축까지 단계별로 알아보자."
thumbnail: "./index.png"
pointColor: "#FF9A00"
tags: ["AI"]
keywords: "허깅페이스, Hugging Face, 트랜스포머, Transformer, NLP, 자연어 처리, 머신러닝, AI, Python, 파이프라인, BERT, GPT, 딥러닝"
---

![ㄱㅇㅇ](./index.png)

> 수많은 트랜스포머 모델이 쏟아져 나오지만 각각 다른 구현 방식으로 인해 활용이 어려웠다. 허깅페이스는 통일된 인터페이스로 이 문제를 해결하고, 복잡한 NLP 파이프라인을 간단하게 구축할 수 있게 해준다.

## 0️⃣ 구글 코랩과 깃허브 연동하기

#### 0-1 개발 환경 준비

실습을 위해 구글 코랩(Google Colab)과 깃허브(Github) 연동이 필요하다.

```python
# GPU 사용 설정 확인
import torch
device = 0 if torch.cuda.is_available() else -1
print(f"Using device: {'GPU' if device == 0 else 'CPU'}")

# 필요한 라이브러리 설치
!pip install transformers datasets torch pandas
```

## 1️⃣ 허깅페이스 개요

#### 1-1 등장 배경

**💡 문제점**

- 트랜스포머 아키텍처 기반 모델들이 급속히 증가 ⬆
- 모델마다 서로 다른 구현 방식과 인터페이스 존재
- 새로운 모델 사용법을 매번 새로 익혀야 하는 어려움

**✅ 해결 방안**

공통된 인터페이스로 다양한 트랜스포머 모델을 활용할 수 있도록 지원하는 라이브러리 개발 → `Huggingface` 팀의 `transformers` 라이브러리

#### 1-2 허깅페이스란?

다양한 트랜스포머 모델을 **통일된 인터페이스**로 사용 가능하도록 지원하는 오픈소스 라이브러리/플랫폼이다.

**라이브러리 구성**

- `transformers`: 사전 학습된 트랜스포머 모델 및 토크나이저 지원
- `datasets`: 데이터셋 업로드 및 다운로드 지원
- 서로 다른 모델을 통일된 인터페이스로 활용 가능

```python
# 통일된 인터페이스 예시
text = "What is Huggingface Transformers?"

# BERT 모델 활용
bert_model = AutoModel.from_pretrained("bert-base-uncased")
bert_tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')
encoded_input = bert_tokenizer(text, return_tensors='pt')
bert_output = bert_model(**encoded_input)

# GPT-2 모델 활용
gpt_model = GPT2LMHeadModel.from_pretrained('gpt2')
gpt_tokenizer = AutoTokenizer.from_pretrained('gpt2')
encoded_input = gpt_tokenizer(text, return_tensors='pt')
gpt_output = gpt_model(**encoded_input)
```

**플랫폼(Hub)**

- `huggingface_hub`: 모델과 데이터셋 탐색 및 공유 지원
- https://huggingface.co/

#### 1-3 허깅페이스 허브 탐색하기

##### 모델 허브

- https://huggingface.co/models

**필터링 옵션**

| 카테고리      | 설명                     | 예시                              |
| ------------- | ------------------------ | --------------------------------- |
| **Tasks**     | 작업 종류별 필터링       | NLP, CV, Audio, Multimodal        |
| **Libraries** | 학습 라이브러리별 필터링 | PyTorch, TensorFlow, Transformers |
| **Languages** | 지원 언어별 필터링       | 한국어, 영어, 중국어              |

**주요 Task 유형**

| Task           | 설명          | 모델 예시                   |
| -------------- | ------------- | --------------------------- |
| **NLP**        | 자연어 처리   | 번역, 요약, 감정 분석 모델  |
| **CV**         | 컴퓨터 비전   | 이미지 분류, 객체 탐지 모델 |
| **Audio**      | 오디오 처리   | 음성 인식, TTS              |
| **Multimodal** | 복합 모달리티 | 이미지 캡셔닝, VQA 모델     |

##### 데이터셋 허브

https://huggingface.co/datasets

**KLUE Dataset 예시**

- **Subset**: 데이터셋의 하위 데이터셋으로 각각 다른 학습 목적
- **Split**: Train/Validation 8:2 비율로 구성

> **Train**: 모델 학습에 사용되는 데이터셋으로, 모델이 패턴을 학습하는 데 활용된다.
>
> **Validation**: 모델 성능을 검증하는 데이터셋으로, 학습 과정에서 과적합을 방지하고 모델의 일반화 성능을 평가한다.

## 2️⃣ 트랜스포머 모델 활용하기

#### 2-1 모델 구조: 바디 + 헤드

|                    바디                    |                    헤드                     |
| :----------------------------------------: | :-----------------------------------------: |
| 모델의 중심 엔진으로 추론 모델의 핵심 부분 | 특정 태스크를 수행하는 기능별 세분화된 부분 |

허깅페이스 라이브러리로 동일한 바디에 서로 다른 헤드를 붙여 다양한 작업을 수행할 수 있다.

#### 2-2 모델 불러오기

**1. 바디만 불러오기**

```python
from transformers import AutoModel

base_model_id = 'bert-base-uncased'
base_model = AutoModel.from_pretrained(base_model_id)
# 출력: hidden state(고차원 벡터)
# 목적: 모델을 feature extractor(특징 추출기)로 활용
```

**2. 분류 헤드가 포함된 모델 불러오기**

```python
from transformers import AutoModelForSequenceClassification

model_id = 'SamLowe/roberta-base-go_emotions'
classification_model = AutoModelForSequenceClassification.from_pretrained(model_id)
# 감정 분류가 이미 학습된 모델
```

**3. 분류 헤드가 랜덤 초기화된 모델 불러오기**

```python
from transformers import AutoModelForSequenceClassification

model_id = 'klue/roberta-base'
random_model = AutoModelForSequenceClassification.from_pretrained(model_id)
# 바디: 사전학습 완료, 헤드: 랜덤 초기화
# 목적: 특정 task에 맞춰 fine-tuning할 때 사용
```

#### 2-3 토크나이저 활용하기

**토크나이저의 역할**

텍스트를 토큰 단위로 나누고 각 토큰을 대응하는 **토큰 ID**로 변환하는 아키텍처다.

- **토큰**: 언어 모델이 텍스트를 이해하고 생성하는 기본 단위
- 학습 데이터를 통해 토큰 사전 구축 → 모델마다 토크나이징 방법이 다름
- **동일한 모델 ID**로 모델과 토크나이저를 통일해야 함

```python
from transformers import AutoTokenizer

model_id = 'klue/roberta-base'
tokenizer = AutoTokenizer.from_pretrained(model_id)
```

**토크나이저 출력값**

```python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
text = "I love banana"
encoded = tokenizer(text, padding=True, truncation=True)

print(encoded)
# 출력 예시:
# {
#  'input_ids': [101, 1045, 2293, 15212, 102],
#  'token_type_ids': [0, 0, 0, 0, 0],
#  'attention_mask': [1, 1, 1, 1, 1]
# }
```

**주요 출력 요소**

- `input_ids`: 각 토큰의 사전 내 인덱스 번호
- `token_type_ids`: 토큰이 속한 문장 ID (첫 번째 문장: 0, 두 번째 문장: 1)
- `attention_mask`: padding token 여부 (실제 토큰: 1, padding: 0)

**토큰 확인하기**

```python
tokenized = tokenizer("토크나이저는 텍스트를 토큰 단위로 나눈다")

# 토큰 리스트로 변환
print(tokenizer.convert_ids_to_tokens(tokenized['input_ids']))
# ['[CLS]', '토크', '##나이', '##저', '##는', '텍스트', '##를', '토', '##큰', '단위', '##로', '나눈다', '[SEP]']

# 원래 문장으로 디코딩
print(tokenizer.decode(tokenized['input_ids'], skip_special_tokens=True))
# 토크나이저는 텍스트를 토큰 단위로 나눈다
```

**배치 디코딩**

```python
# 개별 문장들의 배치 처리
first_tokenized = tokenizer(['첫 번째 문장', '두 번째 문장'])['input_ids']
print(tokenizer.batch_decode(first_tokenized))
# ['[CLS] 첫 번째 문장 [SEP]', '[CLS] 두 번째 문장 [SEP]']

# 문장 쌍으로 처리
second_tokenized = tokenizer([['첫 번째 문장', '두 번째 문장']])['input_ids']
print(tokenizer.batch_decode(second_tokenized))
# ['[CLS] 첫 번째 문장 [SEP] 두 번째 문장 [SEP]']
```

## 3️⃣ 데이터셋 활용하기

#### 3-1 데이터셋 다운로드

**허깅페이스 허브에서 다운로드**

```python
from datasets import load_dataset

# MRC(Machine Reading Comprehension) 데이터셋
klue_mrc_dataset = load_dataset('klue', 'mrc')
klue_mrc_dataset_only_train = load_dataset('klue', 'mrc', split='train')
```

**로컬 데이터 활용**

```python
# JSON 파일 로드
dataset_json = load_dataset("json", data_files="/path/to/data.json")

# 수동으로 train/test 분할
dataset_json_test = dataset_json["train"].train_test_split(test_size=0.2, seed=42)["test"]
```

**Python 딕셔너리/DataFrame 활용**

```python
from datasets import Dataset
import pandas as pd

# 딕셔너리에서 생성
my_dict = {"a": [1, 2, 3]}
dataset = Dataset.from_dict(my_dict)

# pandas DataFrame에서 생성
df = pd.DataFrame({"a": [1, 2, 3]})
dataset = Dataset.from_pandas(df)
```

#### 3-2 데이터셋 가공하기

**KLUE YNAT 데이터셋 예시**

```python
from datasets import load_dataset

klue_tc_train = load_dataset("klue", "ynat", split="train")
klue_tc_eval = load_dataset("klue", "ynat", split="validation")

# 데이터셋 구조 확인
print(klue_tc_train)
# Dataset({
#     features: ['guid', 'title', 'label', 'url', 'date'],
#     num_rows: 45678
# })
```

**불필요한 컬럼 제거**

```python
klue_tc_train_removed = klue_tc_train.remove_columns(['guid', 'url', 'date'])
```

**컬럼 추가하기**

```python
# label을 문자열로 변환하는 함수
klue_tc_label = klue_tc_train_removed.features['label']

def make_str_label(batch):
    batch['label_str'] = klue_tc_label.int2str(batch['label'])
    return batch


# map을 사용하여 배치 처리
klue_tc_train_removed = klue_tc_train_removed.map(
    make_str_label,
    batched=True,
    batch_size=1000
)
```

> **💡 map 함수란?**
>
> 데이터셋의 모든 요소에 대해 동일한 함수를 적용하는 허깅페이스 datasets의 핵심 메서드다.
>
> - **batched=True**: 여러 샘플을 한 번에 처리하여 성능 향상
> - **batch_size**: 한 번에 처리할 샘플 수 지정 (메모리 효율성)
> - **num_proc**: 멀티프로세싱을 통한 병렬 처리 지원

**Train/Validation/Test 분할**

```python
# 학습용 데이터 1만개 추출
train_dataset = klue_tc_train.train_test_split(test_size=10000, shuffle=True, seed=42)['test']

# 테스트용 데이터 1000개 추출
dataset = klue_tc_eval.train_test_split(test_size=1000, shuffle=True, seed=42)
test_dataset = dataset['test']

# 검증용 데이터 1000개 추출
valid_dataset = dataset['train'].train_test_split(test_size=1000, shuffle=True, seed=42)['test']
```

## 4️⃣ 모델을 이용하여 추론하기

#### 4-1 BERT vs GPT 모델 비교

| 특징              | BERT                        | GPT                      |
| ----------------- | --------------------------- | ------------------------ |
| **아키텍처**      | 트랜스포머 인코더만 사용    | 트랜스포머 디코더만 사용 |
| **방향성**        | 양방향(Bidirectional)       | 단방향(왼쪽→오른쪽)      |
| **사전학습 목표** | MLM + NSP                   | 표준 언어 모델링         |
| **주요 강점**     | 텍스트 이해 및 분석         | 텍스트 생성              |
| **활용 분야**     | 분류, 개체명 인식, 질의응답 | 텍스트 생성, 대화형 AI   |
| **활용 방식**     | Fine-tuning 중심            | Zero-shot, Few-shot 학습 |

> **💡 인코더와 디코더**
>
> **인코더(Encoder)**: 입력 텍스트를 이해하고 문맥 정보를 추출하는 역할
>
> - 입력 전체를 한 번에 보고 양방향으로 정보 처리
> - 텍스트의 의미를 파악하는 데 특화
>
> **디코더(Decoder)**: 순차적으로 토큰을 생성하는 역할
>
> - 이전 토큰들만 참조하여 다음 토큰 예측
> - 자연스러운 텍스트 생성에 특화

#### 4-2 BERT 모델로 추론하기

##### 파이프라인 활용

```python
from transformers import pipeline

model_id = "hykiim/roberta-base-klue-ynat-classification"
model_pipeline = pipeline("text-classification", model=model_id)

# 텍스트 분류 실행
results = model_pipeline(test_dataset["title"][:5])
print(results)
```

**주요 파이프라인 종류**

| 파이프라인             | 작업        | 예시                   |
| ---------------------- | ----------- | ---------------------- |
| `text-classification`  | 텍스트 분류 | 감정 분석, 스팸 감지   |
| `token-classification` | 토큰 분류   | 개체명 인식, 품사 태깅 |
| `text-generation`      | 텍스트 생성 | 글쓰기, 코딩           |
| `question-answering`   | 질의응답    | 독해, FAQ 챗봇         |
| `summarization`        | 요약        | 뉴스 기사 요약         |
| `translation`          | 번역        | 다국어 번역            |

##### 커스텀 파이프라인 구현

```python
import torch
from torch.nn.functional import softmax
from transformers import AutoModelForSequenceClassification, AutoTokenizer

class CustomPipeline:
    def __init__(self, model_id):
        self.model = AutoModelForSequenceClassification.from_pretrained(model_id)
        self.tokenizer = AutoTokenizer.from_pretrained(model_id)
        self.model.eval()  # 평가 모드

    def __call__(self, texts):
        # 텍스트 토크나이징
        tokenized = self.tokenizer(
            texts,
            return_tensors="pt",
            padding=True,
            truncation=True
        )

        # 추론 실행
        with torch.no_grad():
            outputs = self.model(**tokenized)
            logits = outputs.logits

        # 확률 계산 및 예측
        probabilities = softmax(logits, dim=-1)
        scores, labels = torch.max(probabilities, dim=-1)
        labels_str = [self.model.config.id2label[label_idx] for label_idx in labels.tolist()]

        return [{"label": label, "score": score.item()} for label, score in zip(labels_str, scores)]

# 사용 예시
custom_pipeline = CustomPipeline(model_id)
results = custom_pipeline(test_dataset['title'][:5])
```

#### 4-3 GPT 모델로 문장 이어쓰기

##### 파이프라인 버전

```python
from transformers import pipeline
import torch

# 텍스트 생성 파이프라인
generator = pipeline('text-generation', model='gpt2', device=0)

prompt = "Once upon a time, in a land far, far away,"

# 텍스트 생성
results = generator(
    prompt,
    max_length=100,
    num_return_sequences=3,
    do_sample=True,
    temperature=0.7,
    top_k=50,
    no_repeat_ngram_size=2
)

for i, result in enumerate(results):
    print(f"결과 {i+1}: {result['generated_text']}")
```

##### 직접 구현 버전

```python
from transformers import GPT2LMHeadModel, AutoTokenizer
import torch

# 모델과 토크나이저 로드
gpt_model = GPT2LMHeadModel.from_pretrained('gpt2')
gpt_tokenizer = AutoTokenizer.from_pretrained('gpt2')

# pad 토큰 설정
if gpt_tokenizer.pad_token is None:
    gpt_tokenizer.pad_token = gpt_tokenizer.eos_token

# 텍스트 생성
text = "What is Huggingface Transformer?"
encoded_input = gpt_tokenizer(text, return_tensors='pt')

output_sequences = gpt_model.generate(
    input_ids=encoded_input['input_ids'],
    max_length=50,
    num_return_sequences=1,
    pad_token_id=gpt_tokenizer.pad_token_id,
    do_sample=True,
    top_k=50,
    top_p=0.95,
    temperature=0.7
)

# 결과 디코딩
generated_text = gpt_tokenizer.decode(output_sequences[0], skip_special_tokens=True)
print("Generated Text:", generated_text)
```

## 5️⃣ 뉴스기사 요약→번역→감정분석 파이프라인

#### 5-1 파이프라인 설계

**전체 워크플로우**

1. 기사 내용(한국어) → 요약(한국어)
2. 요약(한국어) → 번역(영어)
3. 번역(영어) → 감정분석

#### 5-2 데이터셋 준비

```python
from datasets import load_dataset
import pandas as pd

# KLUE MRC 데이터셋 로드
full_dataset = load_dataset("klue", "mrc", split="train")

# 실습용 데이터 일부 선택
num_samples_to_use = 10
klue_mrc_subset = full_dataset.select(range(num_samples_to_use))

print("로드된 데이터셋 정보:")
print(klue_mrc_subset)
```

#### 5-3 1단계: 기사 요약

```python
# 요약 모델 파이프라인 로드
summarizer = pipeline(
    task="summarization",
    model="gogamza/kobart-summarization",
    device=device
)

# 요약 함수 정의
def summarize_context(example):
    summary_result = summarizer(
        example['context'],
        max_length=150,
        min_length=30,
        do_sample=False
    )
    example['summary'] = summary_result[0]['summary_text']
    return example

# 데이터셋에 요약 적용
print("요약 작업을 시작합니다...")
summarized_dataset = klue_mrc_subset.map(summarize_context)
print("요약 작업 완료.")
```

#### 5-4 2단계: 한영 번역

```python
# 번역 모델 파이프라인 로드
translator = pipeline(
    task="translation",
    model="facebook/nllb-200-distilled-600M",
    device=device
)

# 번역 함수 정의
def translate_summary_to_english(example):
    translation_result = translator(
        example['summary'],
        src_lang="kor_Hang",
        tgt_lang="eng_Latn",
        max_length=150,
        min_length=30,
        do_sample=False
    )
    example['english_summary'] = translation_result[0]['translation_text']
    return example

# 데이터셋에 번역 적용
print("번역 작업을 시작합니다...")
translated_dataset = summarized_dataset.map(translate_summary_to_english)
print("번역 작업 완료.")
```

#### 5-5 3단계: 감정 분석

```python
# 감정 분석 모델 파이프라인 로드
emotion_classifier = pipeline(
    task="text-classification",
    model="SamLowe/roberta-base-go_emotions",
    top_k=1,
    device=device
)

# 감정 분석 함수 정의
def analyze_emotion(example):
    emotion_result = emotion_classifier(example['english_summary'])
    example['emotion'] = emotion_result[0][0]['label']
    return example

# 데이터셋에 감정 분석 적용
print("감정 분석 작업을 시작합니다...")
final_dataset = translated_dataset.map(analyze_emotion)
print("감정 분석 작업 완료.")
```

#### 5-6 결과 확인

```python
print("최종 데이터셋 컬럼:", final_dataset.column_names)

# 최종 결과 확인
for i in range(min(5, len(final_dataset))):
    print(f"\n--- 샘플 {i+1} ---")
    print(f"원문 일부: {final_dataset[i]['context'][:100]}...")
    print(f"요약: {final_dataset[i]['summary']}")
    print(f"영어 번역: {final_dataset[i]['english_summary']}")
    print(f"감정 분석: {final_dataset[i]['emotion']}")

# CSV로 저장 (선택사항)
df_final = pd.DataFrame(final_dataset)
df_final.to_csv('news_analysis_pipeline_results.csv', index=False)
```
