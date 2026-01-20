---
title: 알고리즘설계와분석 - MST (최소신장트리)
slug: "algorithm-minimum-spanning-tree"
date: 2025-12-12
description: 최소 비용으로 모든 정점을 연결하는 MST의 개념과 Kruskal, Prim 알고리즘을 정리한다.
thumbnail: "./index.png"
pointColor: "#ffffff"
tags: ["알고리즘"]
keywords: "알고리즘, 최소신장트리, MST, Minimum Spanning Tree, Kruskal, Prim, 그래프, Graph, 그리디, 자료구조"
---

> 학부 수업 "알고리즘설계와분석"에서 배운 MST(Minimum Spanning Tree)의 핵심 개념과 알고리즘, 증명을 정리한다.

## 1️⃣ MST의 기본 개념

#### 1-1 MST의 정의

`Minimum Spanning Tree(MST)`는 가중치 그래프에서 모든 정점을 연결하면서 전체 가중치 합이 최소가 되는 트리이다.

🎯 **MST의 조건**

- **Spanning**: 모든 정점을 포함한다
- **Tree**: Cycle이 없다
- **Minimum**: 간선 가중치의 합이 최소이다

MST는 정확히 `|V| - 1`개의 간선을 가진다.

## 2️⃣ MST의 핵심 성질

#### 2-1 Cycle Property

MST는 cycle을 가지지 않는다. Cycle이 있다면 그 cycle 중 가장 무거운 간선을 제거하여 더 가벼운 트리를 만들 수 있으므로 MST가 아니다.

#### 2-2 Cut Property

**Cut Property**는 MST 알고리즘의 정당성을 증명하는 가장 중요한 이론이다.

그래프를 두 집합 `S`와 `V-S`로 나누어 Cut을 만들 때, 이 Cut을 가로지르는 간선 중 **가장 가벼운(light) 간선은 반드시 MST에 포함된다**.

> 💡 **Cut Property 증명**
>
> 1. MST는 반드시 `S`와 `V-S`를 잇는 간선을 하나 포함해야 한다.
> 2. 그 간선이 가장 가벼운 간선이 아니라면, 더 가벼운 간선으로 교체하여 더 낮은 가중치의 spanning tree를 만들 수 있다.
> 3. 이는 기존 MST 가정과 모순이므로, Cut을 건너는 최소 가중치 간선은 **Safe Edge(안전한 간선)**이다.

#### 2-3 MST의 유일성

- 가중치가 중복될 경우 여러 MST가 존재할 수 있다
- **모든 간선 가중치가 서로 다르면 MST는 유일하다**

## 3️⃣ Kruskal 알고리즘

#### 3-1 핵심 아이디어

`Kruskal 알고리즘`은 **간선 중심**의 접근 방식으로 MST를 구성한다.

- 모든 간선을 가중치 오름차순으로 정렬한다
- 순서대로 간선을 검사하며 cycle을 만들지 않으면 채택한다
- Cycle 생성 여부는 `Union-Find(Disjoint Set)` 구조로 판단한다

#### 3-2 알고리즘 동작 과정

🔥 **알고리즘 절차**

1. 모든 정점을 독립된 집합으로 초기화 (`Make-Set`)
2. 간선을 가중치 기준으로 정렬
3. 각 간선 `(u, v)`에 대해:
   - `Find(u) ≠ Find(v)`이면 서로 다른 컴포넌트
   - 이 간선은 `Safe Edge`이므로 MST에 추가하고 `Union(u, v)` 수행
   - `Find(u) = Find(v)`이면 같은 컴포넌트이므로 cycle 발생, 간선 버림
4. 간선이 총 `V-1`개가 될 때까지 반복

```python
def kruskal(graph):
    # graph.edges = [(weight, u, v), ...]
    edges = sorted(graph.edges)  # 가중치 기준 정렬
    parent = {v: v for v in graph.vertices}  # Union-Find 초기화
    mst = []

    for weight, u, v in edges:
        if find(u, parent) != find(v, parent):  # 다른 컴포넌트면
            mst.append((u, v, weight))  # MST에 추가
            union(u, v, parent)  # 두 컴포넌트 합치기

        if len(mst) == len(graph.vertices) - 1:  # V-1개 간선 확보
            break

    return mst
```

#### 3-3 시간 복잡도

- 간선 정렬: `O(E log E) = O(E log V)`
- Find/Union 연산: 거의 상수 시간 (Inverse Ackermann 함수 `α(V)`)
- **전체: O(E log V)**

`Sparse graph`(간선이 적은 그래프)에서 특히 효율적이다.

## 4️⃣ Prim 알고리즘

#### 4-1 핵심 아이디어

`Prim 알고리즘`은 **정점 중심**의 접근 방식으로, `Dijkstra 알고리즘`과 유사하게 동작한다.

- 시작 정점 하나에서 출발한다
- 현재 트리에 연결되는 가장 가벼운 간선을 계속 추가한다
- 매 단계에서 Cut `(S, V-S)`를 만들고 light edge를 선택하는 구조이다

#### 4-2 알고리즘 동작 과정

🔥 **초기화**

- `key[v] = ∞` (모든 정점)
- `parent[v] = NULL`
- 시작 정점 `r`의 `key[r] = 0`
- 모든 정점을 Min-Heap에 삽입

🔥 **반복 과정**

1. Min-Heap에서 `key`가 가장 작은 정점 `u`를 Extract
2. `u`를 방문 처리 (`visited[u] = true`)
3. `u`의 모든 인접 정점 `v`에 대해:
   - `visited[v] = false`이고 `weight(u,v) < key[v]`이면
   - `key[v]`를 `weight(u,v)`로 갱신 (Decrease-Key)
   - `parent[v] = u`로 업데이트
4. 모든 정점이 Heap에서 빠질 때까지 반복

```python
def prim(graph, start):
    import heapq

    key = {v: float('inf') for v in graph.vertices}
    parent = {v: None for v in graph.vertices}
    visited = set()
    key[start] = 0

    heap = [(0, start)]  # (key 값, 정점)

    while heap:
        curr_key, u = heapq.heappop(heap)

        if u in visited:  # 이미 처리된 정점
            continue

        visited.add(u)  # MST에 포함 확정

        for v, weight in graph.adj[u]:
            if v not in visited and weight < key[v]:
                key[v] = weight
                parent[v] = u
                heapq.heappush(heap, (weight, v))

    return parent
```

🎯 **핵심 포인트**

`visited[v]`가 `true`가 되는 순간 `parent[v]`는 MST에서 확정된다. visited 되기 전에는 더 짧은 간선이 발견될 때마다 parent가 계속 바뀔 수 있다.

#### 4-3 시간 복잡도

- Extract-Min: `V`번 → `O(V log V)`
- Decrease-Key: `E`번 가능 → `O(E log V)`
- **전체: O(E log V)**

Kruskal과 동일한 등급의 효율을 가지며, `Dense graph`(간선이 많은 그래프)에서 강하다.

> 💡 **Prim 알고리즘이 MST를 만드는 이유**
>
> Prim은 매번 Cut `(S, V-S)`를 respect하며 light edge를 선택한다.
>
> 어떤 Cut `(S, V-S)`에 대해 crossing edges 중 가장 가벼운 edge는 `Cut Property`에 의해 MST에 항상 포함되므로, Prim도 Kruskal처럼 항상 **Safe Edge**를 선택한다.

## 5️⃣ Kruskal vs Prim

두 알고리즘 모두 `Cut Property` 기반으로 `Safe Edge`를 선택하여 MST를 구성한다.

| 알고리즘    | 철학      | 자료구조          | 시간복잡도 | 적합한 그래프 |
| ----------- | --------- | ----------------- | ---------- | ------------- |
| **Kruskal** | 간선 중심 | 정렬 + Union-Find | O(E log V) | Sparse graph  |
| **Prim**    | 정점 중심 | Min-Heap          | O(E log V) | Dense graph   |

## 6️⃣ MST 알고리즘 심화

#### 6-1 Reverse-Delete 알고리즘

`Reverse-Delete 알고리즘`은 Kruskal의 반대 방향 버전으로, **MST를 정확히 반환한다**.

🔥 **알고리즘 절차**

1. 간선을 가중치 내림차순으로 정렬 (가장 큰 가중치 먼저)
2. `T = E` (모든 간선을 일단 선택)
3. 정렬된 순서대로 각 간선 `e`에 대해:
   - `T - {e}`가 그래프를 여전히 connected 상태로 유지하면
   - `T = T - {e}` (간선 제거)
4. `T` 반환

🔥 **정당성 증명**

**Step 1: 반환하는 T는 Tree이다**

- 삭제하면 연결성이 깨지는 간선은 남긴다
- 삭제해도 연결성이 유지되는 간선은 제거한다
- 따라서 cycle은 모두 제거되고 연결성은 유지되므로, 결과는 **Spanning Tree**이다

**Step 2: T는 MST이다 (Cut Property 사용)**

- Reverse-Delete는 가장 무거운 간선부터 제거한다
- 간선 `e`가 남아 있다는 것은 `e`를 제거하면 그래프가 disconnected 된다는 의미
- 즉, `e`는 어떤 Cut `(S, V-S)`를 잇는 유일한 light edge이다
  - `e`보다 무거운 간선들은 이미 제거됨
  - `e`를 제거하면 연결이 끊긴다 = `e`보다 가벼운 간선 중 이 cut을 잇는 간선이 없음
- `Cut Property`에 의해 `e`는 Safe Edge이므로 MST에 포함되어야 한다

#### 6-2 임의 순서 알고리즘의 문제점

다음 알고리즘은 **MST를 항상 반환하지 않는다**.

```
1. T = ∅
2. 간선들을 아무 순서로나 본다
3. 각 간선 e에 대해:
       if T ∪ {e}가 cycle을 만들지 않으면
               T = T ∪ {e}
4. return T
```

얼핏 보면 Kruskal과 유사하지만, **간선을 가중치 순으로 정렬하지 않는다**는 점이 결정적 차이다.

🔥 **반례**

3개 정점 `x, y, z`와 간선:

- `w(x,y) = 1`
- `w(y,z) = 1`
- `w(x,z) = 2`

**MST**: `{(x,y), (y,z)}`, 총 가중치 = 2

**임의 순서 알고리즘**:

- 만약 첫 간선이 `(x,z) = 2`이면 T에 포함됨
- 이후 `(x,y)` 또는 `(y,z)` 중 하나만 추가
- 결과: `{(x,z), (x,y)}` 또는 `{(x,z), (y,z)}`, 총 가중치 = 3

따라서 이 알고리즘은 간선을 가중치 순으로 보장하지 않아 heavy edge를 먼저 넣는 경우가 발생하므로 **MST를 항상 반환하지 않는다**.

## 7️⃣ MST 유일성 증명

#### 7-1 Unique MST 조건

**정리**: 모든 Cut마다 유일한 light edge가 존재하면 MST는 유일하다.

🔥 **증명 (모순법)**

**가정**: 모든 Cut마다 light edge가 unique하다.

**반대로 가정**: MST가 두 개 `T, T'`라고 가정한다.

1. `T ≠ T'`이므로 `T`에는 있는데 `T'`에는 없는 간선 `e`가 있다
2. `T`에서 `e`를 제거하면 `(S, V-S)`라는 Cut이 생긴다
3. `e`는 이 Cut을 가로지르는 **unique light edge**이다
4. `T'`에서도 `S-(V-S)`를 연결해야 하므로, crossing edge `e'`가 있어야 한다
   - 하지만 `e'`는 `e`보다 반드시 무겁다 (unique light edge 조건)
5. `T'`에서 `e'`를 제거하고 `e`를 넣으면 `T'`보다 더 가벼운 spanning tree가 생긴다
6. 이는 `T'`가 MST라는 가정과 모순이다

따라서 MST는 유일하다.

🎯 **결론**

모든 edge weight가 distinct이면, 각 Cut의 최소 간선이 자동으로 유일하므로 **MST는 항상 유일하다**.

#### 7-2 Second Best MST

**MST는 unique할 수 있으나, Second Best MST는 unique할 필요가 없다.**

