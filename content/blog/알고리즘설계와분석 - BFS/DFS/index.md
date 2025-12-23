---
title: 알고리즘설계와분석 - BFS/DFS와 Topological Sort
date: 2025-12-11
description: 그래프 탐색의 두 가지 핵심 알고리즘인 BFS와 DFS의 원리, 구현 및 Topological Sort에 대해 알아본다.
thumbnail: ./index.png
pointColor: "#ffffff"
tags: ["알고리즘"]
keywords: "알고리즘, BFS, DFS, 너비 우선 탐색, 깊이 우선 탐색, 그래프 탐색, Topological Sort, 위상 정렬, 그래프, Graph"
---

> 학부 수업 "알고리즘설계와분석" 내용을 정리한다. 

## 1️⃣ BFS (Breadth-First Search)

### BFS 핵심 개념

#### 1-1 BFS란?

BFS는 그래프 탐색 알고리즘으로, **거리(distance)** 기준으로 정점을 계층별로 방문한다. 출발점 S에서 시작해 인접한 정점들을 단계적으로 탐색하는 방식이다.

🔥 **Wave 기반 탐색**

BFS는 파동(wave)처럼 확장되며 탐색을 진행한다.

- 출발점 S에서 시작
- S와 인접한 정점들(거리 1) 먼저 탐색
- 그 다음 거리 2인 정점들 탐색
- 거리 k → k+1 순서로 wavefront 확장

이러한 특성으로 인해 BFS는 **unweighted graph에서 최단 경로**를 보장한다.

#### 1-2 BFS가 생성하는 정보

BFS는 탐색 과정에서 각 정점에 대해 다음 정보를 제공한다.

**`v.d` (distance)**

- S에서 v까지의 최단 거리
- 거리는 간선 개수로 측정
- BFS 실행 중 점진적으로 갱신됨

**`v.π` (predecessor)**

- v의 부모 정점
- BFS 트리에서 v를 처음 발견하게 한 정점
- parent chain을 따라가면 S→v 최단 경로를 복원할 수 있음

**Predecessor subgraph = BFS Tree**

- BFS로 만든 parent 구조는 트리가 된다
- 트리의 간선들은 최단 경로를 구성하는 간선들만 포함한다
- 이를 **최단 경로 트리(shortest path tree)** 라고 한다

### BFS 알고리즘 구조

#### 1-3 자료구조와 색상 관리

🔥 **큐(FIFO Queue)**

BFS는 큐를 사용하여 방문할 정점들을 관리한다. 큐의 FIFO 특성으로 인해 거리 순서가 자동으로 보장된다.

- 큐에는 항상 거리 k와 k+1인 정점들만 존재
- 먼저 발견된 정점이 먼저 처리됨

🔥 **색상(Color) 시스템**

BFS는 세 가지 색상으로 정점의 상태를 관리한다.

- `white`: 아직 방문되지 않은 정점
- `gray`: 발견되어 큐에 들어간 정점
- `black`: 탐색이 완료된 정점

정점은 항상 **white → gray → black** 순서로 상태가 변한다.

#### 1-4 BFS 의사코드

```python
# 초기화
for each vertex v in G.V - {S}:
    v.color = white
    v.d = ∞
    v.π = nil

S.color = gray
S.d = 0
S.π = nil
Q = empty queue
enqueue(Q, S)

# 메인 루프
while Q ≠ ∅:
    u = dequeue(Q)
    for each v in G.Adj[u]:  # u의 모든 인접 정점
        if v.color == white:  # 처음 발견한 정점
            v.color = gray
            v.d = u.d + 1
            v.π = u
            enqueue(Q, v)
    u.color = black  # 탐색 완료
```

#### 1-5 BFS 동작 예시

다음과 같은 그래프에서 S를 출발점으로 BFS를 수행한다고 가정하자.

```
S --- R --- T
|     |     |
U --- V     W --- X
|           |
Y           Z
```

**탐색 과정:**

1. S에서 시작, S와 인접한 R, U, V 발견 → 거리 = 1 → 큐에 삽입
2. S는 black으로 변경
3. 큐에서 R 꺼냄 → 인접한 W, T 발견 → 거리 = 2 → 큐 삽입
4. R은 black으로 변경
5. 큐에서 U 꺼냄 → white인 Y 발견 → 거리 = 2 → 큐 삽입
6. U는 black으로 변경
7. 큐에서 V 꺼냄 → 모든 이웃이 이미 방문됨 → 변화 없음
8. 큐에서 T 꺼냄 → white 없음 → 변화 없음
9. 큐에서 W 꺼냄 → X, Z 발견 → 거리 3 → gray → 큐 삽입
10. 큐가 빌 때까지 반복

최종적으로 모든 reachable 정점이 black 상태가 되며 탐색이 완료된다.

### BFS 성능 분석

#### 1-6 시간 복잡도

BFS의 시간 복잡도는 그래프 표현 방식에 따라 결정된다. adjacency list를 사용할 때 가장 효율적이다.

**초기화 단계**

- 모든 정점에 대해 색상, 거리, 부모 설정
- 시간 복잡도: `O(V)`

**큐 연산**

- 각 정점은 최대 한 번 enqueue & dequeue
- 시간 복잡도: `O(V)`

**인접 리스트 스캔**

- 각 간선 (u,v)는 최대 한 번씩만 확인됨
- 시간 복잡도: `O(E)`

**최종 시간 복잡도: `O(V + E)`**

이는 그래프 탐색에서 가장 효율적인 형태 중 하나이다.

### BFS 정확성 증명

#### 1-7 BFS가 최단 경로를 찾는 이유

🔥 **핵심 명제**

모든 간선 (u, v)에 대해 다음 부등식이 성립한다.

```
δ(S, v) ≤ δ(S, u) + 1
```

여기서 `δ(S, v)`는 S에서 v까지의 최단 거리를 의미한다.

**직관적 이해:**

- S→u까지 최단 경로 뒤에 u→v 간선 하나만 추가하면 S→v에 도달 가능
- 따라서 v까지의 최단 경로는 u까지의 최단 경로보다 최대 1만 크다

🔥 **모순법을 이용한 증명**

BFS가 올바른 최단 거리를 계산하지 못한다고 가정하자.

1. BFS가 `v.d`를 최단 거리 `δ(S,v)`와 다르게 설정한 정점 v 중, `δ(S,v)`가 가장 작은 정점을 선택
2. v의 실제 최단 경로 상의 parent를 u라고 하면, `δ(S,v) = δ(S,u) + 1`
3. v가 가장 작은 최단 거리를 가진 오류 정점이므로, u는 올바른 거리를 가짐: `u.d = δ(S,u)`
4. BFS 알고리즘 절차를 분석하면:
   - **v가 white일 때:** u를 처리할 때 `v.d = u.d + 1 = δ(S,u) + 1 = δ(S,v)`로 올바르게 설정됨 → 모순
   - **v가 black일 때:** v가 u보다 먼저 처리됨 → `v.d ≤ u.d` → 거리 관계 모순
   - **v가 gray일 때:** v가 더 일찍 발견됨 → `v.d ≤ u.d + 1 = δ(S,v)` → 모순

모든 경우에서 모순이 발생하므로 BFS는 항상 최단 거리를 올바르게 계산한다.

#### 1-8 최단 경로 복원

BFS가 생성한 predecessor 정보를 이용하여 실제 최단 경로를 복원할 수 있다.

```python
def print_path(s, v):
    if v == s:
        print(s)
    elif v.π == nil:
        print("경로 없음")
    else:
        print_path(s, v.π)
        print(v)
```

이 재귀 함수는 parent chain을 따라 역순으로 경로를 복원한다.

> 💡 **BFS의 주요 특징 정리**
>
> - **거리 순서 보장**: 항상 거리 증가 순서로 방문 (wave 1 → wave 2 → wave 3)
> - **최단 경로 보장**: unweighted graph에서 최단 경로를 찾음
> - **효율성**: `O(V + E)` 시간 복잡도로 최적의 성능
> - **완전성**: 출발점에서 reachable한 모든 정점을 탐색

## 2️⃣ DFS (Depth-First Search)

### DFS 핵심 개념

#### 2-1 DFS란?

DFS는 그래프 탐색 알고리즘으로, BFS와 달리 **깊이(depth)** 기준으로 탐색한다. 한 정점에서 가능한 한 깊이 들어간 후, 더 이상 갈 곳이 없으면 되돌아오는 방식이다.

🔥 **BFS와의 주요 차이점**

- **자료구조**: 큐 대신 재귀 호출 스택 사용 (또는 명시적 스택)
- **출력 구조**: 단일 트리가 아닌 **forest(포레스트)** 생성 가능
- **시작점**: 하나의 고정된 source가 없음
- **기록 정보**: 거리 대신 `discovery time`과 `finish time` 기록

#### 2-2 DFS가 생성하는 정보

**`v.d` (discovery time)**

- v를 처음 발견한 시점
- 탐색을 시작할 때 증가하는 타임스탬프

**`v.f` (finish time)**

- v의 탐색이 완료된 시점
- 항상 `v.f > v.d`

**`v.π` (predecessor)**

- DFS 트리에서 v의 부모 정점

### DFS 알고리즘 구조

#### 2-3 DFS 의사코드

```python
# 초기화 및 메인 루프
def DFS(G):
    for each vertex u in G.V:
        u.color = white
        u.π = nil
    time = 0

    for each vertex u in G.V:
        if u.color == white:
            DFS_VISIT(G, u)

# 재귀적 방문
def DFS_VISIT(G, u):
    global time
    time = time + 1
    u.d = time          # discovery time 기록
    u.color = gray

    for each v in G.Adj[u]:
        if v.color == white:
            v.π = u
            DFS_VISIT(G, v)

    u.color = black
    time = time + 1
    u.f = time          # finish time 기록
```

#### 2-4 DFS 작동 방식

🔥 **재귀적 탐색**

- 큐를 사용하지 않고 재귀 호출 스택 활용
- 한 경로를 끝까지 탐색한 후 백트래킹
- discovery time과 finish time을 보존하며 깊이 우선 탐색

🔥 **색상 의미**

- `gray`: 방문했지만 아직 완료되지 않은 상태 (현재 탐색 중인 경로 상의 정점)
- `black`: 해당 정점 관련된 모든 탐색이 끝남
- finish time이 기록되는 순간은 "이 정점에서 더 이상 탐색할 곳이 없음"을 의미

### DFS 성능 분석

#### 2-5 시간 복잡도

**정점 방문**

- 각 정점은 정확히 한 번 방문
- 시간 복잡도: `Θ(V)`

**간선 스캔**

- 각 간선은 정확히 한 번 확인
- 시간 복잡도: `Θ(E)`

**최종 시간 복잡도: `Θ(V + E)`**

BFS와 동일하지만, tight bound로 표현된다.

> 💡 **BFS vs DFS 비교**
>
> | 특성        | BFS                | DFS                   |
> | ----------- | ------------------ | --------------------- |
> | 자료구조    | 큐(Queue)          | 스택(Stack) 또는 재귀 |
> | 탐색 방식   | 너비 우선 (레벨별) | 깊이 우선 (경로별)    |
> | 출력 구조   | 단일 트리          | 포레스트              |
> | 기록 정보   | 거리(distance)     | discovery/finish time |
> | 최단 경로   | 보장               | 보장 안 함            |
> | 시간 복잡도 | O(V + E)           | Θ(V + E)              |

## 3️⃣ DAG와 Topological Sort

### DAG 개념

#### 3-1 DAG란?

DAG(Directed Acyclic Graph)는 **방향 그래프이며 사이클이 없는** 그래프이다.

🔥 **DAG의 특징과 활용**

- 사이클이 없으므로 **의존성(dependency)** 표현에 적합
- 작업 순서, 컴파일 순서, 강의 선수과목 등을 모델링

**예시: 옷 입는 순서**

```
속옷 → 바지 → 벨트
양말 → 신발
셔츠 → 넥타이
셔츠 → 재킷
```

각 화살표는 "이것을 먼저 입어야 한다"는 의존성을 나타낸다.

### Topological Sort 기본

#### 3-2 Topological Sort 정의

DAG의 정점들을 **선형 순서로 나열**하되, 모든 간선 (u → v)에 대해 **u가 v보다 앞에 오도록** 정렬하는 것을 Topological Sort라고 한다.

이 순서를 **topological order** 또는 **topological ordering**이라고 한다.

#### 3-3 In-degree 기반 알고리즘

```python
result = []
while 그래프에 정점이 남아있음:
    진입 차수가 0인 정점 v 선택
    result에 v 추가
    v와 v에서 나가는 모든 간선 제거
return result
```

🔥 **문제점**

- 매 단계마다 in-degree가 0인 정점을 찾는 데 비용이 큼
- adjacency list 전체 탐색이 필요 → `O(V + E)` per deletion
- 전체 수행 시간 = **`O(V² + VE)`** → 비효율적

### DFS를 이용한 Topological Sort

#### 3-4 핵심 아이디어

DFS의 finish time을 활용하면 효율적으로 topological sort를 수행할 수 있다.

🔥 **Finish Time의 의미**

finish time이 기록되는 순간은:

- 그 정점으로부터 나가는 모든 경로를 이미 방문 완료
- 즉, 그 정점 이후에 방문할 정점이 없음

따라서:

**DFS에서 finish time이 큰 정점일수록 선형 순서의 앞쪽에 배치되어야 한다.**

#### 3-5 DFS 기반 Topological Sort 알고리즘

```python
def topological_sort(G):
    result = []

    # DFS 수행
    DFS(G)

    # finish time 내림차순으로 정렬
    # (또는 DFS 중 finish될 때마다 리스트 앞에 삽입)
    return sorted(G.V, key=lambda v: v.f, reverse=True)
```

더 효율적인 방법:

```python
def DFS_VISIT_with_topological(G, u, result):
    global time
    time = time + 1
    u.d = time
    u.color = gray

    for each v in G.Adj[u]:
        if v.color == white:
            v.π = u
            DFS_VISIT_with_topological(G, v, result)

    u.color = black
    time = time + 1
    u.f = time
    result.insert(0, u)  # 앞에 삽입 (finish time 큰 것부터)
```

#### 3-6 시간 복잡도

- DFS 실행: `Θ(V + E)`
- 추가 비용: `O(1)` (각 정점의 finish 시 리스트 앞에 삽입)
- **최종 시간 복잡도: `Θ(V + E)`**

이는 in-degree 기반 방법보다 훨씬 효율적이다.

### DFS와 Topological Sort의 특성

#### 3-7 비결정성과 정확성

🔥 **DFS 결과의 비결정성**

DFS 결과는 **유일하지 않다**.

- 시작 정점 선택 순서
- adjacency list 내부 정점 순서

에 따라 discovery time과 finish time이 달라진다.

🔥 **Topological Sort의 정확성**

하지만 **topological sort 결과는 순서가 달라도 언제나 valid하다**.

- finish time ordering은 상대적 순서를 보존
- 간선 (u → v)에 대해 u가 v보다 먼저 finish되는 경우는 없음
- 따라서 어떤 DFS 수행 결과든 올바른 topological order를 생성

**예시:**

같은 DAG에서 DFS를 여러 번 수행하면 다른 topological order를 얻을 수 있지만, 모두 유효한 순서이다.

```
A → C
B → C

가능한 topological orders:
- A, B, C
- B, A, C
```

두 순서 모두 "C보다 A와 B가 앞에 온다"는 조건을 만족한다.

> 💡 **Topological Sort 응용 분야**
>
> - **작업 스케줄링**: 작업 간 의존성을 고려한 실행 순서 결정
> - **컴파일 순서**: 모듈 간 의존성을 고려한 컴파일 순서
> - **선수과목 체계**: 강의 수강 순서 결정
> - **Makefile 의존성**: 파일 빌드 순서 결정
