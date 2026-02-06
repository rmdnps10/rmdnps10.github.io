---
title: "프롬프트 엔지니어링 기초 - AI와 효과적으로 소통하는 방법"
slug: "prompt-engineering-basic"
date: "2025-09-28"
description: "프롬프트 엔지니어링의 기초 개념부터 실전 기법까지, Python 코드 예제와 함께 알아보자."
thumbnail: "./index.png"
pointColor: "#ffffff"
tags: ["AI"]
keywords: "프롬프트 엔지니어링, Prompt Engineering, AI, ChatGPT, LLM, 대형 언어 모델, 자연어 처리, NLP, Python, 머신러닝, GPT, 인공지능"
---

> AI 시대에 접어들면서 프롬프트 엔지니어링은 필수 스킬이 되었다. 단순히 질문을 던지는 것을 넘어서, AI로부터 원하는 결과를 정확하게 얻어내는 기술을 체계적으로 알아보자.

![ChatGPT 사랑해~](index.png)

## 1️⃣ 프롬프트 엔지니어링이란?

#### 1-1. 프롬프트 엔지니어링의 정의

`프롬프트 엔지니어링(Prompt Engineering)`은 AI 언어 모델로부터 **원하는 결과를 얻기 위해 입력 텍스트를 전략적으로 설계하고 최적화하는 기법**이다.

단순히 질문을 던지는 것이 아니라, AI의 동작 원리를 이해하고 **구조화된 지시사항**을 통해 더 정확하고 유용한 응답을 얻어내는 것이 핵심이다.

#### 1-2. 왜 프롬프트 엔지니어링이 중요할까?

현대의 대형 언어 모델(LLM)들은 강력한 성능을 가지고 있지만, **입력에 따라 결과가 크게 달라진다**는 특성이 있다.

**예시: 같은 질문, 다른 결과**

```python
# 일반적인 질문
prompt1 = "파이썬 함수 만들어줘"

# 구체적인 지시사항이 포함된 질문
prompt2 = """
파이썬 함수를 작성해주세요:
- 함수명: calculate_average
- 매개변수: 숫자 리스트
- 기능: 평균값 계산 및 반환
- 예외 처리: 빈 리스트와 숫자가 아닌 값 처리
- 문서화: docstring 포함
- 예시 코드와 테스트 케이스도 함께 제공
"""
```

두 번째 프롬프트가 **훨씬 구체적이고 유용한 결과**를 만들어낸다.

#### 1-3. 프롬프트 엔지니어링의 핵심 원리

- **명확성(Clarity)**: 모호함을 제거하고 구체적으로 명시
- **맥락성(Context)**: 충분한 배경 정보와 예시 제공
- **구조성(Structure)**: 논리적 순서와 명확한 구분
- **반복성(Iteration)**: 결과를 분석하고 지속적으로 개선

## 2️⃣ 프롬프트의 기본 구조

효과적인 프롬프트는 **체계적인 구조**를 가진다. 각 요소가 명확한 역할을 하며 AI가 이해하기 쉽도록 구성되어야 한다.

#### 2-1. 기본 구조 요소

- Role (역할 정의)
- Conext
- Instructions (구체적 지시사항)
- Output Format (출력 형식)
- Constraints (제약사항)

#### 2-2. 각 요소별 세부 설명

##### 역할 정의 (Role)

AI에게 특정 역할을 부여하여 **전문성을 발휘**하도록 한다.

```python
role_examples = {
    "코딩_전문가": "당신은 10년 경험의 시니어 파이썬 개발자입니다.",
    "교육자": "당신은 프로그래밍을 처음 배우는 학생들을 가르치는 친근한 강사입니다.",
    "기술_컨설턴트": "당신은 기업의 기술적 문제를 해결하는 전문 컨설턴트입니다."
}
```

##### 맥락 제공 (Context)

**현재 상황과 배경 정보**를 명확히 전달한다.

```python
context_example = """
현재 상황: 웹 크롤링 프로젝트 진행 중
목적: 뉴스 사이트에서 기사 제목과 내용 추출
기술 스택: Python, BeautifulSoup, requests
난이도: 중급 개발자 수준
"""
```

##### 구체적 지시사항 (Instructions)

**정확히 무엇을 해야 하는지** 단계별로 명시한다.

```python
instructions_example = """
다음 작업을 수행해주세요:
1. requests로 웹페이지 HTML 가져오기
2. BeautifulSoup으로 HTML 파싱
3. 제목과 본문 텍스트 추출
4. 데이터를 딕셔너리 형태로 저장
5. 예외 처리 코드 포함
"""
```

##### 출력 형식 (Output Format)

**결과물의 형태**를 구체적으로 지정한다.

```python
output_format = """
출력 형식:
- 완전한 실행 가능한 Python 코드
- 주석을 통한 상세 설명
- 사용 예시 3개
- 예상 결과값 포함
"""
```

##### 제약사항 (Constraints)

**지켜야 할 규칙이나 제한사항**을 명시한다.

```python
constraints = """
제약사항:
- 외부 라이브러리는 requests, beautifulsoup4만 사용
- 코드 길이는 50줄 이내
- 에러 처리 필수 포함
- PEP 8 스타일 가이드 준수
"""
```

#### 2-3. 완성된 프롬프트 예시

```python
complete_prompt = """
[역할] 당신은 10년 경험의 시니어 파이썬 개발자입니다.

[맥락] 현재 뉴스 데이터 수집 프로젝트를 진행 중이며, 웹 크롤링을 통해 기사 정보를 추출해야 합니다.

[지시사항]
다음 기능을 가진 함수를 작성해주세요:
1. URL을 입력받아 웹페이지 HTML 가져오기
2. 기사 제목과 본문 추출 (CSS 선택자 사용)
3. 결과를 구조화된 딕셔너리로 반환
4. 네트워크 에러와 파싱 에러 처리

[출력 형식]
- 실행 가능한 Python 함수 코드
- 각 줄마다 상세한 주석
- 함수 사용 예시 2개
- docstring 포함

[제약사항]
- requests, beautifulsoup4만 사용
- 함수명: crawl_news_article
- 에러 발생 시 None 반환
- 코드 길이 40줄 이내
"""
```

## 3️⃣ 프롬프트 엔지니어링 기법별 실습

실제 상황에서 자주 사용되는 **핵심 프롬프팅 기법들**을 Python 코드 예제와 함께 실습해보자.

#### 3-1. Zero-shot Prompting

**예시나 학습 데이터 없이** 바로 작업을 수행하도록 하는 기법이다.

```python
# OpenAI API를 사용한 제로샷 프롬프팅 예제
import openai

def zero_shot_prompting(task_description):
    """
    제로샷 프롬프팅으로 작업 수행
    """
    prompt = f"""
    다음 작업을 수행해주세요:
    {task_description}

    조건:
    - 명확하고 실행 가능한 코드 작성
    - 주석을 통한 설명 포함
    - 에러 처리 포함
    """

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
    )

    return response.choices[0].message.content

# 사용 예시
task = "리스트에서 중복 제거하는 함수 만들기"
result = zero_shot_prompting(task)
print(result)
```

#### 3-2. One-shot Prompting

**하나의 예시**를 제공하여 패턴을 학습하게 하는 기법이다.

```python
def one_shot_prompting(example_input, example_output, new_input):
    """
    한 개의 예시를 제공하는 원샷 프롬프팅
    """
    prompt = f"""
    다음 예시를 참고하여 같은 방식으로 작업을 수행해주세요:

    [예시]
    입력: {example_input}
    출력: {example_output}

    [실제 작업]
    입력: {new_input}
    출력:
    """

    # API 호출 로직 (실제 구현 시 사용)
    return prompt

# 사용 예시
example_in = "def add(a, b): return a + b"
example_out = '''
def add(a, b):
    """두 숫자를 더하는 함수"""
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        raise TypeError("숫자만 입력 가능합니다")
    return a + b
'''

new_input = "def multiply(x, y): return x * y"
result = one_shot_prompting(example_in, example_out, new_input)
```

#### 3-3. Few-shot Prompting

**여러 개의 예시**를 제공하여 더 정확한 패턴 학습을 유도하는 기법이다.

```python
def few_shot_prompting(examples, new_input):
    """
    여러 예시를 활용한 퓨샷 프롬프팅
    """
    prompt = "다음 예시들을 참고하여 같은 패턴으로 코드를 개선해주세요:\n\n"

    # 여러 예시 추가
    for i, (input_code, output_code) in enumerate(examples, 1):
        prompt += f"[예시 {i}]\n"
        prompt += f"개선 전:\n{input_code}\n\n"
        prompt += f"개선 후:\n{output_code}\n\n"

    prompt += f"[실제 작업]\n개선 전:\n{new_input}\n\n개선 후:"

    return prompt

# 사용 예시
examples = [
    (
        "def calc(a,b): return a+b",  # 개선 전
        """def calculate_sum(a, b):
    \"\"\"두 수의 합을 계산하는 함수\"\"\"
    return a + b"""  # 개선 후
    ),
    (
        "def get_len(lst): return len(lst)",  # 개선 전
        """def get_list_length(lst):
    \"\"\"리스트의 길이를 반환하는 함수\"\"\"
    if not isinstance(lst, list):
        raise TypeError("리스트만 입력 가능합니다")
    return len(lst)"""  # 개선 후
    )
]

new_code = "def div(x,y): return x/y"
result = few_shot_prompting(examples, new_code)
```

#### 3-4. Chain-of-Thought

**단계별 추론 과정**을 명시적으로 요구하는 기법이다.

```python
def chain_of_thought_prompting(problem):
    """
    단계별 추론을 요구하는 프롬프팅
    """
    prompt = f"""
    다음 문제를 단계별로 해결해주세요:

    문제: {problem}

    해결 과정:
    1단계: 문제 분석 (무엇을 해야 하는지)
    2단계: 접근 방법 설계 (어떻게 해결할지)
    3단계: 코드 구현 (실제 구현)
    4단계: 테스트 및 검증 (동작 확인)
    5단계: 최종 정리 (완성된 솔루션)

    각 단계마다 상세한 설명을 포함해주세요.
    """

    return prompt

# 사용 예시
problem = "주어진 문자열에서 팰린드롬(회문) 여부를 판단하는 함수 작성"
result = chain_of_thought_prompting(problem)
print(result)
```

#### 3-5. Role-based Prompting

**특정 전문가 역할**을 부여하여 전문성을 높이는 기법이다.

```python
def role_based_prompting(role, task, context=""):
    """
    역할을 부여한 전문적 프롬프팅
    """
    roles = {
        "시니어개발자": "당신은 15년 경력의 시니어 파이썬 개발자입니다. 클린 코드와 성능 최적화에 전문가입니다.",
        "보안전문가": "당신은 사이버 보안 전문가입니다. 코드의 보안 취약점을 찾고 안전한 코딩 방법을 제안합니다.",
        "데이터과학자": "당신은 데이터 분석과 머신러닝에 특화된 데이터 사이언티스트입니다.",
        "교육자": "당신은 프로그래밍 교육 전문가입니다. 초보자도 이해하기 쉽게 설명합니다."
    }

    prompt = f"""
    {roles.get(role, "당신은 프로그래밍 전문가입니다.")}

    {context}

    다음 작업을 당신의 전문성을 바탕으로 수행해주세요:
    {task}

    전문가의 관점에서:
    - 모범 사례 적용
    - 잠재적 문제점 지적
    - 개선 방안 제시
    - 실무에서의 활용 팁 포함
    """

    return prompt

# 사용 예시
task = "웹 API에서 데이터를 가져와 JSON으로 파싱하는 안전한 함수 작성"
context = "금융 데이터를 다루는 프로젝트이므로 보안이 중요합니다."

# 보안 전문가 관점
security_prompt = role_based_prompting("보안전문가", task, context)
print("=== 보안 전문가 관점 ===")
print(security_prompt)

# 시니어 개발자 관점
senior_prompt = role_based_prompting("시니어개발자", task, context)
print("\n=== 시니어 개발자 관점 ===")
print(senior_prompt)
```

#### 3-6. 상황별 프롬프팅 기법 선택 가이드

**어떤 상황에서 어떤 기법을 사용해야 할지** 체계적으로 정리해보자.

##### 작업 복잡도에 따른 선택

| 복잡도   | 추천 기법                     | 사용 시기             | 예시 상황                        |
| -------- | ----------------------------- | --------------------- | -------------------------------- |
| **단순** | Zero-shot                     | 명확한 단일 작업      | 간단한 계산 함수, 기본 문법 변환 |
| **중간** | Few-shot + Role-based         | 패턴이 있는 반복 작업 | 코드 리팩토링, 데이터 변환       |
| **복잡** | Chain-of-Thought + Role-based | 다단계 추론 필요      | 알고리즘 설계, 문제 해결         |

##### 데이터 가용성에 따른 선택

```python
def choose_prompting_strategy(task_complexity, available_examples, domain_expertise):
    """
    상황에 따른 최적 프롬프팅 전략 선택
    """
    strategy = {
        "primary_technique": None,
        "supporting_techniques": [],
        "reason": ""
    }

    # 예시 데이터가 풍부한 경우
    if available_examples >= 3:
        strategy["primary_technique"] = "Few-shot"
        strategy["reason"] = "충분한 예시로 패턴 학습 가능"

        if task_complexity == "high":
            strategy["supporting_techniques"].append("Chain-of-Thought")

    # 예시 데이터가 제한적인 경우
    elif available_examples == 1:
        strategy["primary_technique"] = "One-shot"
        strategy["reason"] = "제한된 예시로 기본 패턴 제시"

    # 예시 데이터가 없는 경우
    else:
        if task_complexity == "low":
            strategy["primary_technique"] = "Zero-shot"
            strategy["reason"] = "단순 작업으로 직접 지시 가능"
        else:
            strategy["primary_technique"] = "Chain-of-Thought"
            strategy["reason"] = "복잡한 작업으로 단계별 분해 필요"

    # 전문 도메인인 경우 역할 기반 추가
    if domain_expertise:
        strategy["supporting_techniques"].append("Role-based")

    return strategy

# 사용 예시
situation1 = choose_prompting_strategy("high", 0, True)
print("복잡한 전문 작업, 예시 없음:", situation1)

situation2 = choose_prompting_strategy("low", 5, False)
print("단순 작업, 풍부한 예시:", situation2)
```

##### 실무 적용 시나리오

**📊 데이터 분석 업무**

```python
# 상황: 복잡한 데이터 분석 + 도메인 전문성 필요
analysis_prompt = """
당신은 10년 경력의 데이터 사이언티스트입니다.

다음 단계로 고객 데이터를 분석해주세요:
1단계: 데이터 품질 검증 (결측치, 이상치 확인)
2단계: 탐색적 데이터 분석 (EDA)
3단계: 가설 수립 및 검증
4단계: 비즈니스 인사이트 도출

각 단계별로 사용할 Python 코드와 해석을 제공해주세요.
"""
# 기법 조합: Role-based + Chain-of-Thought
```

**🔧 코드 리팩토링 업무**

```python
# 상황: 패턴이 있는 반복 작업 + 여러 예시 가능
refactoring_examples = [
    {
        "before": "def calc(a,b): return a+b",
        "after": """def calculate_sum(a: float, b: float) -> float:
    \"\"\"두 숫자의 합을 계산\"\"\"
    return a + b"""
    },
    # ... 더 많은 예시들
]
# 기법 조합: Few-shot + Role-based
```

**💡 창의적 문제 해결**

```python
# 상황: 새로운 문제 + 창의적 접근 필요
creative_prompt = """
당신은 혁신적인 솔루션을 제안하는 기술 컨설턴트입니다.

문제: 대용량 이미지 처리 시스템의 성능 병목

다음 관점에서 창의적 해결책을 제안해주세요:
- 기존 접근법의 한계점 분석
- 새로운 아키텍처 패턴 제안
- 최신 기술 활용 방안
- 비용 효율성 고려사항

각 제안에 대해 구체적인 구현 방법과 예상 효과를 포함해주세요.
"""
# 기법 조합: Role-based + Zero-shot (창의성을 위해)
```

## 4️⃣ 효과적인 프롬프트 작성 가이드

#### 4-1. 명확성과 구체성

**모호한 표현을 피하고** 구체적인 지시사항을 제공해야 한다.

| 구분          | 나쁜 예시            | 좋은 예시                                                                                |
| ------------- | -------------------- | ---------------------------------------------------------------------------------------- |
| **목표 설정** | "좋은 함수 만들어줘" | "사용자 입력을 검증하는 함수를 작성하되, 이메일 형식 체크와 길이 제한(5-50자) 기능 포함" |
| **출력 형식** | "코드 작성해줘"      | "Python 함수 코드, docstring, 사용 예시 3개, 에러 케이스 2개 포함하여 작성"              |
| **제약사항**  | "간단하게 해줘"      | "표준 라이브러리만 사용, 함수 길이 30줄 이내, 변수명은 snake_case 사용"                  |

#### 4-2 맥락 정보 제공

**충분한 배경 정보**를 제공하여 AI가 상황을 정확히 이해하도록 한다.

```python
# 맥락 정보를 체계적으로 제공하는 템플릿
context_template = """
프로젝트 정보:
- 도메인: {domain}
- 기술 스택: {tech_stack}
- 사용자 수준: {user_level}
- 성능 요구사항: {performance}
- 보안 고려사항: {security}

현재 상황:
- 진행 단계: {current_stage}
- 해결해야 할 문제: {problem}
- 기대 결과: {expected_result}
"""

# 실제 사용 예시
context = context_template.format(
    domain="전자상거래",
    tech_stack="Python, Django, PostgreSQL",
    user_level="중급 개발자",
    performance="동시 사용자 1000명 처리 가능",
    security="개인정보 암호화 필수",
    current_stage="사용자 인증 시스템 개발",
    problem="안전한 비밀번호 해싱 구현",
    expected_result="bcrypt를 사용한 해싱 함수"
)
```

#### 4-3 예시와 패턴 활용

**구체적인 예시**를 통해 원하는 결과의 패턴을 명확히 전달한다.

```python
def create_example_driven_prompt(task, examples):
    """
    예시 기반 프롬프트 생성
    """
    prompt = f"다음 작업을 수행해주세요: {task}\n\n"
    prompt += "참고할 예시들:\n"

    for i, example in enumerate(examples, 1):
        prompt += f"\n[예시 {i}]\n"
        prompt += f"입력: {example['input']}\n"
        prompt += f"출력: {example['output']}\n"
        prompt += f"설명: {example['explanation']}\n"

    prompt += "\n위 예시들의 패턴을 따라 새로운 코드를 작성해주세요."
    return prompt

# 사용 예시
examples = [
    {
        "input": "리스트 [1,2,3,4,5]",
        "output": "def process_list(data):\n    return [x * 2 for x in data]",
        "explanation": "각 요소를 2배로 만드는 함수"
    },
    {
        "input": "문자열 'hello world'",
        "output": "def process_string(text):\n    return text.upper().replace(' ', '_')",
        "explanation": "대문자로 변환하고 공백을 언더스코어로 교체"
    }
]

task = "딕셔너리 데이터 처리 함수"
prompt = create_example_driven_prompt(task, examples)
```

#### 4-4 단계별 지시사항

**복잡한 작업을 단계별로 분해**하여 명확한 실행 순서를 제시한다.

```python
def create_step_by_step_prompt(main_task, steps):
    """
    단계별 지시사항이 포함된 프롬프트 생성
    """
    prompt = f"메인 작업: {main_task}\n\n"
    prompt += "다음 단계를 순서대로 수행해주세요:\n\n"

    for i, step in enumerate(steps, 1):
        prompt += f"🔸 {i}단계: {step['title']}\n"
        prompt += f"   - 목표: {step['goal']}\n"
        prompt += f"   - 방법: {step['method']}\n"
        prompt += f"   - 결과: {step['output']}\n\n"

    prompt += "각 단계의 코드를 작성하고, 전체적으로 통합된 최종 솔루션을 제공해주세요."
    return prompt

# 사용 예시
task = "웹 스크래핑을 통한 데이터 수집 및 분석 시스템"
steps = [
    {
        "title": "웹페이지 접근",
        "goal": "대상 웹사이트에서 HTML 데이터 수집",
        "method": "requests 라이브러리 사용, 에러 처리 포함",
        "output": "HTML 문자열"
    },
    {
        "title": "데이터 파싱",
        "goal": "HTML에서 필요한 정보 추출",
        "method": "BeautifulSoup으로 CSS 선택자 활용",
        "output": "구조화된 딕셔너리 데이터"
    },
    {
        "title": "데이터 검증",
        "goal": "추출한 데이터의 유효성 확인",
        "method": "정규표현식과 타입 체크",
        "output": "검증된 클린 데이터"
    },
    {
        "title": "데이터 저장",
        "goal": "처리된 데이터를 파일로 저장",
        "method": "JSON 형태로 파일 출력",
        "output": "저장된 데이터 파일"
    }
]

prompt = create_step_by_step_prompt(task, steps)
```

#### 4-5 제약사항과 품질 기준

**명확한 제약사항과 품질 기준**을 설정하여 일관된 결과를 얻는다.

```python
quality_standards = {
    "코드_품질": [
        "PEP 8 스타일 가이드 준수",
        "명확한 변수명과 함수명 사용",
        "적절한 주석과 docstring 포함",
        "복잡도는 함수당 20줄 이내"
    ],
    "기능_요구사항": [
        "모든 edge case 처리",
        "적절한 예외 처리 구현",
        "입력 검증 로직 포함",
        "예상 시간 복잡도 명시"
    ],
    "문서화_기준": [
        "함수별 사용 예시 제공",
        "매개변수와 반환값 설명",
        "발생 가능한 예외 상황 문서화",
        "성능 특성 및 제한사항 명시"
    ]
}

def create_quality_focused_prompt(task, standards):
    """
    품질 기준이 포함된 프롬프트 생성
    """
    prompt = f"작업: {task}\n\n"
    prompt += "다음 품질 기준을 모두 만족하는 코드를 작성해주세요:\n\n"

    for category, criteria in standards.items():
        prompt += f"📋 {category.replace('_', ' ').title()}:\n"
        for criterion in criteria:
            prompt += f"   ✅ {criterion}\n"
        prompt += "\n"

    prompt += "위 모든 기준을 충족하는 완전한 솔루션을 제공해주세요."
    return prompt

# 사용 예시
task = "이메일 주소 유효성 검사 함수"
prompt = create_quality_focused_prompt(task, quality_standards)
```

#### 4-6 반복과 개선

**프롬프트 성능을 지속적으로 모니터링하고 개선**하는 체계적 접근법이다.

```python
class PromptOptimizer:
    """프롬프트 성능 최적화 클래스"""

    def __init__(self):
        self.performance_log = []
        self.best_prompts = {}

    def evaluate_prompt(self, prompt, expected_output, actual_output):
        """프롬프트 성능 평가"""
        score = self._calculate_similarity(expected_output, actual_output)

        evaluation = {
            "prompt": prompt,
            "score": score,
            "timestamp": datetime.now(),
            "improvements": self._suggest_improvements(prompt, score)
        }

        self.performance_log.append(evaluation)
        return evaluation

    def _calculate_similarity(self, expected, actual):
        """결과 유사도 계산 (실제로는 더 정교한 평가 메트릭 사용)"""
        # 단순 예시 - 실제로는 BLEU, ROUGE 등 사용
        return len(set(expected.split()) & set(actual.split())) / len(set(expected.split()))

    def _suggest_improvements(self, prompt, score):
        """개선 방안 제안"""
        suggestions = []

        if score < 0.7:
            if "예시" not in prompt:
                suggestions.append("구체적인 예시 추가")
            if "단계" not in prompt:
                suggestions.append("단계별 지시사항 추가")
            if len(prompt) < 200:
                suggestions.append("더 상세한 맥락 정보 제공")

        return suggestions

    def optimize_prompt(self, base_prompt, task_type):
        """프롬프트 자동 최적화"""
        optimizations = {
            "코딩": ["구체적인 함수명 지정", "에러 처리 요구사항 추가", "테스트 케이스 포함"],
            "분석": ["데이터 형태 명시", "분석 방법론 지정", "결과 해석 요구"],
            "창작": ["톤앤매너 지정", "분량 제한", "타겟 오디언스 명시"]
        }

        improvements = optimizations.get(task_type, [])

        optimized_prompt = base_prompt
        for improvement in improvements:
            optimized_prompt += f"\n추가 요구사항: {improvement}"

        return optimized_prompt

# 사용 예시
optimizer = PromptOptimizer()

base_prompt = "파이썬으로 데이터 처리 함수를 만들어주세요."
optimized = optimizer.optimize_prompt(base_prompt, "코딩")

print("기본 프롬프트:")
print(base_prompt)
print("\n최적화된 프롬프트:")
print(optimized)
```

## 5️⃣ 실전 활용 팁

#### 5-1 도메인별 프롬프트 전략

**각 분야의 특성을 고려한** 맞춤형 프롬프팅 접근법이다.

```python
domain_strategies = {
    "웹개발": {
        "핵심요소": ["보안", "성능", "사용자경험", "호환성"],
        "필수포함": ["에러 처리", "입력 검증", "응답 시간", "브라우저 지원"],
        "예시템플릿": """
        웹 개발 전문가로서 다음을 수행해주세요:
        - 보안 취약점 고려 (XSS, CSRF 등)
        - 성능 최적화 방안 포함
        - 크로스 브라우저 호환성 확인
        - 사용자 접근성 고려
        """
    },
    "데이터분석": {
        "핵심요소": ["정확성", "효율성", "시각화", "해석"],
        "필수포함": ["데이터 검증", "통계적 유의성", "차트 생성", "결과 해석"],
        "예시템플릿": """
        데이터 과학자로서 다음을 분석해주세요:
        - 데이터 품질 검증 및 전처리
        - 적절한 통계 기법 선택
        - 시각화를 통한 인사이트 도출
        - 비즈니스 관점에서의 해석
        """
    }
}
```

#### 5-2 디버깅과 문제 해결

**AI 응답이 기대와 다를 때** 체계적으로 문제를 진단하고 해결하는 방법이다.

```python
def debug_prompt_issues(prompt, response, expected):
    """프롬프트 문제점 진단 및 해결방안 제시"""

    issues = []
    solutions = []

    # 1. 모호성 검사
    ambiguous_words = ["좋은", "적절한", "괜찮은", "간단한", "복잡한"]
    if any(word in prompt for word in ambiguous_words):
        issues.append("모호한 표현 사용")
        solutions.append("구체적인 기준과 수치 제시")

    # 2. 맥락 부족 검사
    if len(prompt) < 100:
        issues.append("충분한 맥락 정보 부족")
        solutions.append("배경 정보와 제약사항 추가")

    # 3. 예시 부족 검사
    if "예시" not in prompt and len(response.split()) < 50:
        issues.append("구체적인 예시 부족")
        solutions.append("입출력 예시 2-3개 추가")

    # 4. 출력 형식 불명확
    format_keywords = ["형식", "구조", "템플릿", "양식"]
    if not any(keyword in prompt for keyword in format_keywords):
        issues.append("출력 형식 불분명")
        solutions.append("원하는 결과물 형태 명시")

    return {
        "발견된_문제": issues,
        "해결_방안": solutions,
        "개선된_프롬프트": improve_prompt(prompt, solutions)
    }

def improve_prompt(original_prompt, solutions):
    """해결방안을 바탕으로 프롬프트 개선"""
    improved = original_prompt

    for solution in solutions:
        if "구체적인 기준" in solution:
            improved += "\n\n구체적 요구사항:\n- 함수명과 매개변수 명시\n- 코드 길이 제한\n- 성능 기준 포함"
        elif "배경 정보" in solution:
            improved += "\n\n프로젝트 맥락:\n- 사용 목적과 환경\n- 기술 스택 정보\n- 사용자 수준"
        elif "예시 추가" in solution:
            improved += "\n\n참고 예시:\n[입력 예시와 기대 출력 포함]"
        elif "형태 명시" in solution:
            improved += "\n\n출력 형식:\n- 완전한 실행 가능 코드\n- 상세 주석 포함\n- 사용 예시 제공"

    return improved

# 사용 예시
original = "파이썬 함수 만들어줘"
response = "def func(): pass"
expected = "완전한 데이터 처리 함수 with 에러처리"

diagnosis = debug_prompt_issues(original, response, expected)
print("문제 진단 결과:", diagnosis)
```

#### 5-3 효율성 향상 도구

**프롬프트 작성과 관리를 효율화**하는 실용적인 도구들이다.

```python
class PromptLibrary:
    """재사용 가능한 프롬프트 라이브러리"""

    def __init__(self):
        self.templates = {}
        self.snippets = {}
        self.load_default_templates()

    def load_default_templates(self):
        """기본 템플릿 로드"""
        self.templates = {
            "코드리뷰": """
            시니어 개발자로서 다음 코드를 리뷰해주세요:

            {code}

            다음 관점에서 검토:
            1. 코드 품질 및 가독성
            2. 성능 및 효율성
            3. 보안 취약점
            4. 개선 방안 제시

            각 항목별로 구체적인 피드백을 제공해주세요.
            """,

            "버그수정": """
            다음 버그를 수정해주세요:

            문제상황: {problem}
            에러메시지: {error}
            관련코드: {code}

            단계별 해결과정:
            1. 원인 분석
            2. 수정 방법 제시
            3. 수정된 코드 제공
            4. 테스트 방법 안내
            """,

            "최적화": """
            성능 최적화 전문가로서 다음 코드를 개선해주세요:

            현재코드: {code}
            성능목표: {target}
            제약사항: {constraints}

            최적화 방안:
            1. 병목 지점 분석
            2. 개선 전략 수립
            3. 최적화된 코드 제공
            4. 성능 개선 효과 예측
            """
        }

    def get_template(self, template_name, **kwargs):
        """템플릿 가져오기 및 변수 치환"""
        template = self.templates.get(template_name)
        if template:
            return template.format(**kwargs)
        return None

    def add_custom_template(self, name, template):
        """사용자 정의 템플릿 추가"""
        self.templates[name] = template

    def create_composite_prompt(self, components):
        """여러 컴포넌트를 조합한 프롬프트 생성"""
        prompt_parts = []

        for component in components:
            if component["type"] == "role":
                prompt_parts.append(f"당신은 {component['content']}입니다.")
            elif component["type"] == "context":
                prompt_parts.append(f"상황: {component['content']}")
            elif component["type"] == "task":
                prompt_parts.append(f"작업: {component['content']}")
            elif component["type"] == "constraints":
                prompt_parts.append(f"제약사항:\n{component['content']}")
            elif component["type"] == "format":
                prompt_parts.append(f"출력형식:\n{component['content']}")

        return "\n\n".join(prompt_parts)

# 사용 예시
library = PromptLibrary()

# 1. 기본 템플릿 사용
code_review = library.get_template("코드리뷰",
    code="def process_data(data): return [x*2 for x in data]"
)

# 2. 조합형 프롬프트 생성
components = [
    {"type": "role", "content": "10년 경력의 풀스택 개발자"},
    {"type": "context", "content": "대용량 트래픽을 처리하는 웹 서비스 개발"},
    {"type": "task", "content": "API 응답 시간을 50% 단축시키는 코드 작성"},
    {"type": "constraints", "content": "- 기존 라이브러리 유지\n- 하위 호환성 보장"},
    {"type": "format", "content": "- 완전한 코드\n- 성능 비교 데이터\n- 구현 가이드"}
]

composite_prompt = library.create_composite_prompt(components)
print(composite_prompt)
```

## ✅ 정리

**프롬프트 엔지니어링의 핵심 포인트**

- 🎯 **명확성**: 모호한 표현을 피하고 구체적인 지시사항 제공
- 📋 **구조화**: 역할, 맥락, 지시사항, 형식, 제약사항의 체계적 구성
- 🔍 **맥락성**: 충분한 배경 정보와 예시를 통한 정확한 의도 전달
- 🔄 **반복성**: 지속적인 테스트와 개선을 통한 품질 향상
- 📊 **상황별 선택**: 작업 복잡도와 가용 데이터에 따른 적절한 기법 선택

**실무 활용 전략**

프롬프트 엔지니어링은 **AI와 효과적으로 협업하는 핵심 능력**이다. 상황에 맞는 기법을 선택하고, 체계적인 접근과 지속적인 개선을 통해 AI로부터 원하는 결과를 정확히 얻어내는 전문성을 기를 수 있다.
