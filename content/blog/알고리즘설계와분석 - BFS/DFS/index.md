---
title: BFS/DFS와 Topological Sort
date: 2025-12-11
description: 그래프 탐색의 두 가지 핵심 알고리즘인 BFS와 DFS의 원리와 구현, 그리고 DAG에서의 위상 정렬에 대해 알아본다.
slug: algorithm-bfs-dfs
thumbnail: index.png
pointColor: "#ffffff"
tags: ["알고리즘"]
keywords: "알고리즘, BFS, DFS, 너비 우선 탐색, 깊이 우선 탐색, 그래프 탐색, Topological Sort, 위상 정렬, DAG"
---

> 학부 수업 "알고리즘설계와분석" 내용을 정리한다.

> 그래프 탐색의 핵심인 BFS와 DFS를 이해하고, 이를 활용한 Topological Sort까지 다룬다.

## 1️⃣ BFS (Breadth-First Search)

#### 1-1 BFS의 개념

`BFS`는 그래프를 **거리(distance)** 기준으로 계층별로 탐색하는 알고리즘이다. 출발점 S에서 시작해 인접한 정점들을 단계적으로 방문한다.

**파동 기반 탐색**

BFS는 파동(wave)처럼 확장되며 탐색한다.

- 출발점 S 방문
- S와 인접한 정점들(거리 1) 방문
- 거리 2인 정점들 방문
- 거리 k → k+1 순서로 wavefront 확장

이러한 특성으로 BFS는 **unweighted graph에서 최단 경로를 보장**한다.

#### 1-2 BFS가 제공하는 정보

BFS는 탐색 과정에서 각 정점에 대해 다음 정보를 기록한다.

**`v.d` (distance)**

- S에서 v까지의 최단 거리
- 간선 개수로 측정
- BFS 실행 중 점진적으로 갱신

**`v.π` (predecessor)**

- v의 부모 정점
- BFS 트리에서 v를 처음 발견하게 한 정점
- parent chain을 따라가면 최단 경로 복원 가능

**Predecessor subgraph**

BFS로 만들어진 parent 구조는 트리 형태를 이루며, 이를 **최단 경로 트리(shortest path tree)**라고 한다.

#### 1-3 자료구조와 색상 시스템

**큐(FIFO Queue)**

BFS는 `큐`를 사용해 방문할 정점들을 관리한다. 큐의 FIFO 특성으로 거리 순서가 자동으로 보장된다.

- 큐에는 항상 거리 k와 k+1인 정점들만 존재
- 먼저 발견된 정점이 먼저 처리됨

**색상(Color) 시스템**

세 가지 색상으로 정점의 상태를 관리한다.

- `white`: 아직 방문되지 않은 정점
- `gray`: 발견되어 큐에 들어간 정점
- `black`: 탐색이 완료된 정점

정점은 항상 **white → gray → black** 순서로 상태가 변한다.

#### 1-4 BFS 알고리즘

```java
// 초기화
void BFS(Graph G, Vertex S) {
    for (Vertex v : G.V) {
        if (v != S) {
            v.color = WHITE;
            v.d = INFINITY;
            v.π = null;
        }
    }

    S.color = GRAY;
    S.d = 0;
    S.π = null;
    Queue Q = new Queue();
    Q.enqueue(S);

    // 메인 루프
    while (!Q.isEmpty()) {
        Vertex u = Q.dequeue();

        for (Vertex v : G.Adj[u]) {  // u의 모든 인접 정점
            if (v.color == WHITE) {  // 처음 발견한 정점
                v.color = GRAY;
                v.d = u.d + 1;
                v.π = u;
                Q.enqueue(v);
            }
        }
        u.color = BLACK;  // 탐색 완료
    }
}
```

#### 1-5 BFS 동작 과정

다음 그래프에서 S를 출발점으로 BFS를 수행한다.

```
S --- R --- T
|     |     |
U --- V     W --- X
|           |
Y           Z
```

**탐색 단계:**

1. S 시작 → R, U, V 발견(거리 1) → 큐 삽입
2. R 처리 → W, T 발견(거리 2) → 큐 삽입
3. U 처리 → Y 발견(거리 2) → 큐 삽입
4. V 처리 → 새로운 정점 없음
5. T 처리 → 새로운 정점 없음
6. W 처리 → X, Z 발견(거리 3) → 큐 삽입
7. Y, X, Z 순서로 처리하며 탐색 완료

#### 1-6 시간 복잡도

BFS의 시간 복잡도는 그래프 표현 방식에 따라 결정된다.

**초기화**: `O(V)`

- 모든 정점에 대해 색상, 거리, 부모 설정

**큐 연산**: `O(V)`

- 각 정점은 최대 한 번 enqueue & dequeue

**인접 리스트 스캔**: `O(E)`

- 각 간선은 최대 한 번씩만 확인

**최종 시간 복잡도: `O(V + E)`**

#### 1-7 BFS 정확성 증명

**핵심 명제**

모든 간선 (u, v)에 대해 다음 부등식이 성립한다.

```
δ(S, v) ≤ δ(S, u) + 1
```

여기서 `δ(S, v)`는 S에서 v까지의 최단 거리를 의미한다.

> 💡 **직관적 이해**
>
> S→u까지의 최단 경로 뒤에 u→v 간선 하나만 추가하면 S→v에 도달 가능하다. 따라서 v까지의 최단 경로는 u까지의 최단 경로보다 최대 1만 크다.

**모순법을 이용한 증명**

BFS가 올바른 최단 거리를 계산하지 못한다고 가정하자.

1. BFS가 `v.d`를 최단 거리 `δ(S,v)`와 다르게 설정한 정점 v 중, `δ(S,v)`가 가장 작은 정점을 선택
2. v의 실제 최단 경로 상의 parent를 u라고 하면, `δ(S,v) = δ(S,u) + 1`
3. v가 가장 작은 최단 거리를 가진 오류 정점이므로, u는 올바른 거리를 가짐: `u.d = δ(S,u)`
4. BFS 알고리즘 절차를 분석하면:
   - **v가 white일 때**: u를 처리할 때 `v.d = u.d + 1 = δ(S,v)`로 올바르게 설정됨 → 모순
   - **v가 black일 때**: v가 u보다 먼저 처리됨 → `v.d ≤ u.d` → 모순
   - **v가 gray일 때**: v가 더 일찍 발견됨 → `v.d ≤ u.d + 1 = δ(S,v)` → 모순

모든 경우에서 모순이 발생하므로 BFS는 항상 최단 거리를 올바르게 계산한다.

#### 1-8 최단 경로 복원

predecessor 정보를 이용해 실제 최단 경로를 복원할 수 있다.

```java
void printPath(Vertex s, Vertex v) {
    if (v == s) {
        System.out.println(s);
    } else if (v.π == null) {
        System.out.println("경로 없음");
    } else {
        printPath(s, v.π);
        System.out.println(v);
    }
}
```

이 재귀 함수는 parent chain을 따라 역순으로 경로를 복원한다.

> 💡 **BFS의 주요 특징**
>
> - **거리 순서 보장**: 항상 거리 증가 순서로 방문
> - **최단 경로 보장**: unweighted graph에서 최단 경로 탐색
> - **효율성**: `O(V + E)` 시간 복잡도
> - **완전성**: 출발점에서 reachable한 모든 정점 탐색

## 2️⃣ DFS (Depth-First Search)

#### 2-1 DFS의 개념

`DFS`는 그래프를 **깊이(depth)** 기준으로 탐색하는 알고리즘이다. 한 정점에서 가능한 한 깊이 들어간 후, 더 이상 갈 곳이 없으면 되돌아오는 방식이다.

**BFS와의 차이점**

- **자료구조**: 큐 대신 재귀 호출 스택 사용
- **출력 구조**: 단일 트리가 아닌 **forest(포레스트)** 생성 가능
- **시작점**: 하나의 고정된 source가 없음
- **기록 정보**: 거리 대신 `discovery time`과 `finish time` 기록

#### 2-2 DFS가 제공하는 정보

**`v.d` (discovery time)**

- v를 처음 발견한 시점
- 탐색 시작 시 증가하는 타임스탬프

**`v.f` (finish time)**

- v의 탐색이 완료된 시점
- 항상 `v.f > v.d`

**`v.π` (predecessor)**

- DFS 트리에서 v의 부모 정점

#### 2-3 DFS 알고리즘

```java
// 메인 함수
void DFS(Graph G) {
    for (Vertex u : G.V) {
        u.color = WHITE;
        u.π = null;
    }
    int time = 0;

    for (Vertex u : G.V) {
        if (u.color == WHITE) {
            DFS_VISIT(G, u);
        }
    }
}

// 재귀적 방문
void DFS_VISIT(Graph G, Vertex u) {
    time = time + 1;
    u.d = time;          // discovery time 기록
    u.color = GRAY;

    for (Vertex v : G.Adj[u]) {
        if (v.color == WHITE) {
            v.π = u;
            DFS_VISIT(G, v);
        }
    }

    u.color = BLACK;
    time = time + 1;
    u.f = time;          // finish time 기록
}
```

#### 2-4 DFS 작동 방식

**재귀적 탐색**

- 큐를 사용하지 않고 재귀 호출 스택 활용
- 한 경로를 끝까지 탐색한 후 백트래킹
- discovery time과 finish time을 보존하며 탐색

**색상의 의미**

- `gray`: 방문했지만 완료되지 않은 상태(현재 탐색 중인 경로 상의 정점)
- `black`: 해당 정점 관련 모든 탐색 완료
- finish time 기록 시점은 더 이상 탐색할 곳이 없음을 의미

#### 2-5 시간 복잡도

**정점 방문**: `Θ(V)`

- 각 정점은 정확히 한 번 방문

**간선 스캔**: `Θ(E)`

- 각 간선은 정확히 한 번 확인

**최종 시간 복잡도: `Θ(V + E)`**

> 💡 **BFS vs DFS 비교**
>
> | 특성        | BFS               | DFS                   |
> | ----------- | ----------------- | --------------------- |
> | 자료구조    | 큐(Queue)         | 스택(Stack) 또는 재귀 |
> | 탐색 방식   | 너비 우선(레벨별) | 깊이 우선(경로별)     |
> | 출력 구조   | 단일 트리         | 포레스트              |
> | 기록 정보   | 거리(distance)    | discovery/finish time |
> | 최단 경로   | 보장              | 보장 안 함            |
> | 시간 복잡도 | O(V + E)          | Θ(V + E)              |

## 3️⃣ DAG와 Topological Sort

### DAG

#### 3-1 DAG의 개념

`DAG(Directed Acyclic Graph)`는 **방향 그래프이며 사이클이 없는** 그래프이다.

**특징과 활용**

- 사이클이 없으므로 **의존성(dependency)** 표현에 적합
- 작업 순서, 컴파일 순서, 강의 선수과목 등 모델링

**예시: 옷 입는 순서**

```
속옷 → 바지 → 벨트
양말 → 신발
셔츠 → 넥타이
셔츠 → 재킷
```

각 화살표는 "이것을 먼저 입어야 한다"는 의존성을 나타낸다.

### Topological Sort

#### 3-2 Topological Sort 정의

DAG의 정점들을 **선형 순서로 나열**하되, 모든 간선 (u → v)에 대해 **u가 v보다 앞에 오도록** 정렬하는 것을 `Topological Sort`라고 한다.

#### 3-3 In-degree 기반 방법

```java
List<Vertex> topologicalSort(Graph G) {
    List<Vertex> result = new ArrayList<>();

    while (G에 정점이 남아있음) {
        Vertex v = 진입 차수가 0인 정점 선택;
        result.add(v);
        G에서 v와 v에서 나가는 모든 간선 제거;
    }

    return result;
}
```

**문제점**

- 매 단계마다 in-degree가 0인 정점을 찾는 비용이 큼
- adjacency list 전체 탐색 필요 → `O(V + E)` per deletion
- 전체 수행 시간 = **`O(V² + VE)`** → 비효율적

#### 3-4 DFS 기반 Topological Sort

**핵심 아이디어**

DFS의 finish time을 활용한다. finish time이 기록되는 순간은 그 정점으로부터 나가는 모든 경로를 이미 방문 완료했음을 의미한다.

따라서 **finish time이 큰 정점일수록 선형 순서의 앞쪽에 배치**되어야 한다.

**알고리즘**

```java
List<Vertex> topologicalSort(Graph G) {
    List<Vertex> result = new ArrayList<>();

    // DFS 수행하며 finish time 순으로 정점 수집
    DFS_with_topological(G, result);

    return result;
}

void DFS_VISIT_with_topological(Graph G, Vertex u, List<Vertex> result) {
    time = time + 1;
    u.d = time;
    u.color = GRAY;

    for (Vertex v : G.Adj[u]) {
        if (v.color == WHITE) {
            v.π = u;
            DFS_VISIT_with_topological(G, v, result);
        }
    }

    u.color = BLACK;
    time = time + 1;
    u.f = time;
    result.add(0, u);  // 앞에 삽입 (finish time 큰 것부터)
}
```

#### 3-5 시간 복잡도

- DFS 실행: `Θ(V + E)`
- 추가 비용: `O(1)` (각 정점의 finish 시 리스트 앞에 삽입)
- **최종 시간 복잡도: `Θ(V + E)`**

in-degree 기반 방법보다 훨씬 효율적이다.

#### 3-6 비결정성과 정확성

**DFS 결과의 비결정성**

DFS 결과는 유일하지 않다.

- 시작 정점 선택 순서
- adjacency list 내부 정점 순서

에 따라 discovery time과 finish time이 달라진다.

**Topological Sort의 정확성**

하지만 **topological sort 결과는 순서가 달라도 언제나 valid**하다.

- finish time ordering은 상대적 순서를 보존
- 간선 (u → v)에 대해 u가 v보다 먼저 finish되는 경우는 없음
- 어떤 DFS 수행 결과든 올바른 topological order 생성

**예시:**

```
A → C
B → C

가능한 topological orders:
- A, B, C
- B, A, C
```

두 순서 모두 "C보다 A와 B가 앞에 온다"는 조건을 만족한다.

> 💡 **Topological Sort 응용**
>
> - **작업 스케줄링**: 작업 간 의존성을 고려한 실행 순서 결정
> - **컴파일 순서**: 모듈 간 의존성을 고려한 컴파일 순서
> - **선수과목 체계**: 강의 수강 순서 결정
> - **Makefile 의존성**: 파일 빌드 순서 결정
