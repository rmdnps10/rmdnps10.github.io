---
title: 알고리즘설계와분석 - Binary Search Tree (이진 탐색 트리)
slug: "algorithm-binary-search-tree"
date: 2025-12-05
description: Binary Search Tree(이진 탐색 트리) 의 정의, 핵심 연산, 그리고 시간 복잡도에 관한 모든 것에 대해 알아보자.
thumbnail: "./index.png"
pointColor: "#ffffff"
tags: ["알고리즘"]
keywords: "알고리즘, 이진 탐색 트리, Binary Search Tree, BST, 자료구조, 트리, Tree, 탐색, 삽입, 삭제, 시간 복잡도"
---

> 학부 수업 "알고리즘설계와분석" 내용을 정리합니다.

Binary Search Tree는 데이터를 효율적으로 탐색하고 정렬하기 위한 트리 구조다. BST의 핵심 규칙과 주요 연산들을 이해하고, 트리의 높이가 성능에 미치는 영향을 살펴본다.

## 1️⃣ Binary Search Tree란?

### BST의 정의

`Binary Search Tree(BST)`는 각 노드가 특정 규칙을 만족하는 이진 트리다.

> 💡 **이진 트리란?**
>
> 이진 트리는 각 노드가 최대 2개의 자식 노드를 가지는 트리 구조다. 이진 트리는 탐색, 삽입, 삭제 등의 연산을 효율적으로 수행할 수 있는 자료구조로 자주 사용된다.

#### 1-1 BST의 핵심 규칙

**🔑 BST 속성**

모든 노드 `i`에 대해 다음 조건을 만족해야 한다:

- 왼쪽 서브트리의 모든 값 < `i`의 값
- 오른쪽 서브트리의 모든 값 ≥ `i`의 값

이 규칙이 **모든 노드**에 대해 재귀적으로 성립해야 BST가 된다.

```python
# BST 예시
#       12
#      /  \
#     8    14
#    / \     \
#   5   9    20

# 노드 12: 왼쪽(8,5,9) < 12 ≤ 오른쪽(14,20) ✓
# 노드 8: 왼쪽(5) < 8 ≤ 오른쪽(9) ✓
# 노드 14: 왼쪽(없음), 오른쪽(20) ≥ 14 ✓
```

#### 1-2 BST의 구조적 특성

**📍 최소값과 최대값의 위치**

BST의 구조적 특성 덕분에 최소값과 최대값을 `O(h)` 시간 복잡도로 쉽게 찾을 수 있다:

- **최소값**: 루트에서 왼쪽 자식으로 계속 이동하여 더 이상 왼쪽이 없을 때의 노드
- **최대값**: 루트에서 오른쪽 자식으로 계속 이동하여 더 이상 오른쪽이 없을 때의 노드

---

## 2️⃣ BST의 기본 연산

BST에서 제공하는 주요 연산들은 다음과 같다:

| 연산             | 의미                    | 시간 복잡도 |
| ---------------- | ----------------------- | ----------- |
| `Search(T, k)`   | 키 k를 가진 노드 탐색   | O(h)        |
| `Insert(T, k)`   | 트리에 k 삽입           | O(h)        |
| `Delete(T, k)`   | 노드 삭제               | O(h)        |
| `Min(T)`         | 최소값 반환             | O(h)        |
| `Max(T)`         | 최대값 반환             | O(h)        |
| `Successor(x)`   | x보다 큰 값 중 최소값   | O(h)        |
| `Predecessor(x)` | x보다 작은 값 중 최대값 | O(h)        |

> 💡 **높이(h)란?**
>
> 트리의 `높이(height)`는 루트에서 가장 먼 리프 노드까지의 경로 길이다. BST의 모든 연산은 트리의 높이에 비례하므로, 높이를 낮게 유지하는 것이 핵심이다.

### 탐색(Search)

#### 2-1 Search 알고리즘

**🔍 탐색 과정**

`Search` 연산은 재귀적으로 정의된다. 현재 노드의 값과 비교하여 왼쪽 또는 오른쪽으로만 이동한다.

```python
def BST_Search(x, k):
    # x가 null이거나 찾는 값이면 반환
    if x == None or k == x.key:
        return x

    # k가 현재 노드보다 작으면 왼쪽으로
    if k < x.key:
        return BST_Search(x.left, k)
    # k가 현재 노드보다 크면 오른쪽으로
    else:
        return BST_Search(x.right, k)
```

한 단계마다 탐색 공간이 절반으로 줄어들기 때문에, 균형 잡힌 트리에서는 매우 효율적이다.
그렇다면 균형이 잡히지 않은 트리에서는.. 시간 복잡도가 최악의 경우 `O(n)`이 될 수 있다는 것이다.

### 삽입(Insert)

#### 2-2 Insert 알고리즘

**➕ 삽입 과정**

새로운 값을 삽입할 때는 `Search`처럼 적절한 위치를 찾아 내려간다:

1. 트리가 비어있으면 새 노드를 루트로 설정
2. 그렇지 않으면 삽입할 값과 현재 노드를 비교
   - 삽입 값 < 현재 노드: 왼쪽으로 이동
   - 삽입 값 ≥ 현재 노드: 오른쪽으로 이동
3. `null` 위치에 도달하면 해당 위치에 새 노드 삽입

```python
def BST_Insert(T, k):
    new_node = Node(k)
    parent = None
    current = T.root

    # 삽입 위치 찾기
    while current != None:
        parent = current
        if k < current.key:
            current = current.left
        else:
            current = current.right

    # 부모 노드에 연결
    new_node.parent = parent
    if parent == None:
        T.root = new_node  # 트리가 비어있었음
    elif k < parent.key:
        parent.left = new_node
    else:
        parent.right = new_node
```

#### 2-3 삽입 과정 예시

**📝 14를 삽입하는 과정**

다음 트리에 15를 삽입한다고 가정하자:

```python
#       12
#      /  \
#     8    14
#          \
#          20
#          /
#        15
```

1. 루트 12와 비교: 15 ≥ 12 → 오른쪽으로
2. 노드 14와 비교: 15 ≥ 14 → 오른쪽으로
3. 노드 20과 비교: 15 < 20 → 왼쪽으로
4. 왼쪽이 `null`이므로 해당 위치에 삽입

**중요한 특성**: 삽입은 항상 리프 노드의 자식 위치에서 발생한다.

### 최소값과 최대값

#### 2-4 Min과 Max 찾기

**⬅️ 최소값 찾기**

```python
def BST_Min(x):
    # 왼쪽 자식이 없을 때까지 이동
    while x.left != None:
        x = x.left
    return x
```

**➡️ 최대값 찾기**

```python
def BST_Max(x):
    # 오른쪽 자식이 없을 때까지 이동
    while x.right != None:
        x = x.right
    return x
```

두 연산 모두 트리의 높이만큼만 이동하므로 `O(h)` 시간이 소요된다.

---

## 3️⃣ 순회(Traversal)

### In-order Traversal

#### 3-1 In-order Traversal

**🔄 정렬된 출력**

`In-order Traversal`은 BST를 **오름차순**으로 출력하는 방법이다.

```python
def Inorder(x):
    if x != None:
        Inorder(x.left)    # 왼쪽 서브트리 먼저
        print(x.key)       # 현재 노드 출력
        Inorder(x.right)   # 오른쪽 서브트리
```

**왜 오름차순이 보장되는가?**

- 왼쪽 서브트리의 모든 값 < 현재 노드 < 오른쪽 서브트리의 모든 값
- 따라서 왼쪽 → 자신 → 오른쪽 순서로 방문하면 자동으로 정렬된다

```python
# 예시 트리
#       12
#      /  \
#     8    14
#    / \     \
#   5   9    20
# In-order 출력: 5 → 8 → 9 → 12 → 14 → 20
```

**⏱️ 시간 복잡도**

각 노드를 정확히 한 번씩 방문하므로 `Θ(n)`이다. 모든 노드를 출력해야 하므로 이는 최적이다.

### Pre-order와 Post-order Traversal

#### 3-2 Pre-order와 Post-order Traversal

**📋 다른 순회 방법들**

- **Pre-order**: 자신 → 왼쪽 → 오른쪽
  - 트리 복제, 직렬화 등에 유용
- **Post-order**: 왼쪽 → 오른쪽 → 자신
  - 하위 구조부터 처리/삭제할 때 유용

```python
def Preorder(x):
    if x != None:
        print(x.key)
        Preorder(x.left)
        Preorder(x.right)

def Postorder(x):
    if x != None:
        Postorder(x.left)
        Postorder(x.right)
        print(x.key)
```

BST에서 **정렬된 출력**이 필요한 경우에는 반드시 `In-order`를 사용해야 한다.

---

## 4️⃣ 전임자와 후임자

#### 4-1 Predecessor와 Successor 개념

**🔢 순서상 이웃 찾기**

어떤 노드의 값을 기준으로:

- **Predecessor(전임자)**: 현재 노드보다 작은 값들 중 최대값
- **Successor(후임자)**: 현재 노드보다 큰 값들 중 최소값

이들은 `In-order Traversal`에서 해당 노드의 직전/직후 노드에 해당한다.

#### 4-2 서브트리가 있을 때

**⬇️ 서브트리로 내려가기**

노드 `v`에 대해:

**Successor 찾기** (오른쪽 서브트리가 있을 때)

1. 오른쪽 자식으로 한 칸 이동
2. 왼쪽으로 끝까지 이동

```python
def BST_Successor_WithSubtree(x):
    if x.right != None:
        # 오른쪽 서브트리의 최소값
        return BST_Min(x.right)
```

**Predecessor 찾기** (왼쪽 서브트리가 있을 때)

1. 왼쪽 자식으로 한 칸 이동
2. 오른쪽으로 끝까지 이동

```python
def BST_Predecessor_WithSubtree(x):
    if x.left != None:
        # 왼쪽 서브트리의 최대값
        return BST_Max(x.left)
```

#### 4-3 서브트리가 없을 때

**⬆️ 부모로 올라가기**

해당 방향 서브트리가 없는 경우, 부모 노드들을 따라 올라가며 찾는다.

**Successor 찾기** (오른쪽 서브트리가 없을 때)

1. 현재 노드가 부모의 오른쪽 자식인 동안 계속 부모로 올라간다
2. 처음으로 왼쪽 자식이 되는 순간, 그 부모가 `Successor`

```python
def BST_Successor_NoSubtree(x):
    y = x.parent
    # x가 부모의 오른쪽 자식인 동안 올라감
    while y != None and x == y.right:
        x = y
        y = y.parent
    return y  # x가 왼쪽 자식이 되는 순간의 부모
```

**Predecessor 찾기** (왼쪽 서브트리가 없을 때)

1. 현재 노드가 부모의 왼쪽 자식인 동안 계속 부모로 올라간다
2. 처음으로 오른쪽 자식이 되는 순간, 그 부모가 `Predecessor`

> 💡 **왜 이렇게 동작하는가?**
>
> 오른쪽 서브트리가 없으면, 현재 노드보다 큰 값은 "위쪽"에만 존재한다. 현재 노드가 어떤 조상의 **왼쪽 가지**에 속해있다면, 그 조상이 처음으로 만나는 더 큰 값이다.

**📝 예시**

```python
#        12
#       /  \
#      8    14
#       \
#        9

# Successor(9) 찾기:
# 1. 9는 오른쪽 자식이 없음
# 2. 9는 8의 오른쪽 자식 → 올라감
# 3. 8은 12의 왼쪽 자식 → 멈춤
# 4. Successor(9) = 12
```

---

## 5️⃣ 삭제(Delete)

BST에서 노드 삭제는 자식의 개수에 따라 세 가지 경우로 나뉜다.

#### 5-1 자식이 0개인 경우

**🍃 리프 노드 삭제**

가장 간단한 경우다. 해당 노드를 그냥 제거하면 된다.

```python
# 부모의 해당 자식 포인터를 null로 설정
if node == node.parent.left:
    node.parent.left = None
else:
    node.parent.right = None
```

#### 5-2 자식이 1개인 경우

**🔗 자식을 부모와 연결**

삭제할 노드를 건너뛰고, 부모와 유일한 자식을 직접 연결한다.

```python
# 자식을 부모에게 직접 연결
if node.left != None:
    child = node.left
else:
    child = node.right

if node == node.parent.left:
    node.parent.left = child
else:
    node.parent.right = child
child.parent = node.parent
```

#### 5-3 자식이 2개인 경우

**🔄 Successor로 치환**

가장 복잡한 경우다. 삭제할 노드의 값을 `Successor`의 값으로 대체한 후, `Successor` 노드를 삭제한다.

**왜 Successor를 사용하는가?**

- `Successor`는 오른쪽 서브트리의 최소값이므로, 왼쪽 서브트리보다 크고 나머지 오른쪽 서브트리보다 작다.
- 오른쪽 서브트리의 최소값은 항상 왼쪽 자식이 없다 (리프 또는 오른쪽 자식만 존재).
- 따라서 `Successor` 삭제는 케이스 1 또는 2로 귀착된다.

```python
def BST_Delete_TwoChildren(node):
    # 1. Successor 찾기 (오른쪽 서브트리의 최소값)
    successor = BST_Min(node.right)

    # 2. 노드의 값을 Successor의 값으로 교체
    node.key = successor.key

    # 3. Successor 삭제 (자식 0개 또는 1개)
    # Successor는 왼쪽 자식이 없으므로 간단히 삭제
    if successor.right != None:
        # 자식 1개 케이스
        successor.parent.left = successor.right
        successor.right.parent = successor.parent
    else:
        # 자식 0개 케이스
        successor.parent.left = None
```

**📝 삭제 과정 예시**

```python
# 노드 12 삭제 (자식 2개)
#       12              14
#      /  \            /  \
#     8    14   →     8    20
#    / \     \       / \
#   5   9    20     5   9

# 1. Successor(12) = 14 찾기
# 2. 12의 값을 14로 교체
# 3. 원래 14 노드 삭제 (자식 1개 케이스)
```

모든 삭제 연산의 시간 복잡도는 `O(h)`다.

---

## 6️⃣ 시간 복잡도와 효율성

#### 6-1 높이(Height)의 중요성

**📊 높이가 성능을 결정한다**

BST의 모든 주요 연산은 트리의 높이 `h`에 비례한다:

- `Search`, `Insert`, `Delete`: O(h)
- `Min`, `Max`: O(h)
- `Predecessor`, `Successor`: O(h)

따라서 **높이를 낮게 유지하는 것이 BST 성능의 핵심**이다.

#### 6-2 균형 트리 vs 편향 트리

**⚖️ 트리의 형태에 따른 성능 차이**

노드가 `n`개일 때:

| 트리 형태     | 높이     | 연산 시간 복잡도 | 예시                            |
| ------------- | -------- | ---------------- | ------------------------------- |
| **균형 트리** | Θ(log n) | O(log n)         | 완전 이진 트리                  |
| **편향 트리** | Θ(n)     | O(n)             | 연결 리스트처럼 한쪽으로 치우침 |

```python
# 균형 트리
#       12
#      /  \
#     8    16
#    / \   / \
#   4  10 14  20
# 높이 = 2 (log₂7 ≈ 2.8)

# 편향 트리 (최악)
#   4
#    \
#     8
#      \
#      10
#       \
#       12
# 높이 = 3 (선형)
```

**🎲 평균 케이스**

입력 키를 무작위 순서로 삽입하면:

- 평균 높이는 `Θ(log n)`
- 평균적으로는 효율적이지만, 최악의 경우 `O(n)`이 될 수 있다

> 💡 **균형 유지 방법**
>
> 높이를 항상 `O(log n)`으로 보장하기 위해 **자가 균형 트리(Self-Balancing Tree)** 가 사용된다. 대표적으로 `AVL Tree`, `Red-Black Tree` 등이 있으며, 삽입/삭제 시 자동으로 트리를 재구성하여 균형을 유지한다.

---

## 정리

`Binary Search Tree`는 효율적인 탐색과 정렬을 제공하는 자료구조임

- BST의 **핵심 규칙**은 왼쪽 < 노드 ≤ 오른쪽
- 모든 주요 연산의 시간 복잡도는 **O(h)**
- `In-order Traversal`은 자동으로 **정렬된 출력** 제공
- **높이를 낮게 유지**하는 것이 성능의 핵심
- 균형 잡힌 트리에서는 `O(log n)`, 편향 트리에서는 `O(n)`
