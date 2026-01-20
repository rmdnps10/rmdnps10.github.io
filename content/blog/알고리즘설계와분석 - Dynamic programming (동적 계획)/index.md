---
title: 알고리즘설계와분석 - Dynamic Programming (동적 계획법)
slug: "algorithm-dynamic-programming"
date: 2025-12-07
description: Dynamic Programming의 개념부터 Rod Cutting, Optimal BST, LCS, BST 개수 세기 등 구체적인 예제와 함께 정리한다.
thumbnail: "./index.png"
pointColor: "#ffffff"
tags: ["알고리즘"]
keywords: "알고리즘, 동적 계획법, Dynamic Programming, DP, 메모이제이션, Memoization, 최적화, Rod Cutting, LCS, 최장 공통 부분 수열, 알고리즘 설계"
---

> 학부 수업 "알고리즘설계와분석"에서 배운 내용을 정리합니다.

## 1️⃣ Dynamic Programming의 핵심 개념

### DP는 언제 사용하는가?

Dynamic Programming은 다음 두 가지 조건을 만족할 때 적용할 수 있다.

- **최적 부분 구조(Optimal Substructure)**: 전체 문제의 최적해가 부분문제의 최적해로 구성된다
- **중복되는 부분문제(Overlapping Subproblems)**: 동일한 부분문제가 반복적으로 계산된다

이 두 조건이 만족되면, **부분문제의 결과를 저장(메모이제이션)하여 재사용**함으로써 지수시간 알고리즘을 `다항시간`으로 개선할 수 있다.

---

### DP vs Divide & Conquer

| 구분              | Divide & Conquer     | Dynamic Programming           |
| ----------------- | -------------------- | ----------------------------- |
| **하위문제 관계** | 독립적 (disjoint)    | 겹침 (overlapping)            |
| **결과 재사용**   | 불필요               | 필수                          |
| **대표 예시**     | MergeSort, QuickSort | Rod Cutting, LCS, Optimal BST |
| **접근 방식**     | 재귀적으로 분할      | 테이블로 누적 계산            |

---

### DP의 두 가지 접근 방식

#### 🔹 Top-down (Memoization)

- 재귀적으로 문제를 풀되, 이미 계산한 결과는 배열에 저장하여 재사용한다
- 필요한 부분문제만 계산한다
- 재귀 호출의 오버헤드가 있을 수 있다

#### 🔹 Bottom-up (Tabulation)

- 작은 문제부터 순서대로 테이블을 채워나간다
- 모든 부분문제를 계산한다
- 반복문 기반으로 구현이 간결하고 빠르다

---

### 간단한 예시: Fibonacci

**🔥 Naive 재귀 방식**

- `F(n) = F(n-1) + F(n-2)`를 그대로 구현
- 동일한 부분문제를 반복 계산
- 시간복잡도: **Θ(2ⁿ)**

**🔥 Bottom-up DP**

```python
def fibonacci(n):
    F = [0] * (n + 1)
    F[1] = 1
    F[2] = 1

    for i in range(3, n + 1):
        F[i] = F[i-1] + F[i-2]  # 이미 계산된 값 재사용

    return F[n]
```

- 각 `F[i]`를 한 번씩만 계산
- 시간복잡도: **O(n)**
- **지수시간 → 선형시간**으로 극적인 개선

---

## 2️⃣ Rod Cutting (막대 자르기)

### 문제 정의

길이 `n`인 막대를 여러 조각으로 잘라서 팔 때, **총 수익을 최대화**하는 절단 방법을 찾는 문제이다.

- 입력: 길이 `i`의 막대 가격 `p[i]` (i = 1, 2, ..., n)
- 출력: 최대 수익 `r[n]`

**🔥 예시**

가격표: `p[1]=1, p[2]=5, p[3]=8, p[4]=9`

- 길이 4를 안 자르면: `p[4] = 9`
- 길이 4를 2+2로 자르면: `p[2] + p[2] = 5 + 5 = 10`
- **최적 수익: 10** (2+2로 자르는 것이 유리)

---

### 완전 탐색의 비효율성

막대를 자를 수 있는 위치는 `n-1`곳이고, 각 위치마다 "자르기/안 자르기" 2가지 선택이 있다.

→ 가능한 경우의 수: **2^(n-1)** (지수시간)

---

### 최적 부분 구조와 점화식

첫 번째 조각의 길이를 `i`로 정하면:

- 첫 조각에서 얻는 수익: `p[i]`
- 남은 길이 `n-i`에서 얻을 수 있는 최대 수익: `r[n-i]`

따라서 다음과 같은 점화식이 성립한다:

```
r[n] = max(p[i] + r[n-i])  (i = 1, 2, ..., n)
r[0] = 0
```

이는 **최적 부분 구조**를 가지며, `r[n-1]`, `r[n-2]` 등의 부분문제가 **반복적으로 등장**한다.

---

### Naive 재귀 구현

```python
def CutRod(p, n):
    if n == 0:
        return 0

    q = -∞
    for i in range(1, n + 1):
        q = max(q, p[i] + CutRod(p, n - i))  # 중복 호출 발생

    return q
```

- 시간복잡도: **O(2ⁿ)** (부분문제가 지수적으로 증가)

---

### Top-down (Memoization)

```python
def MemoizedCutRod(p, n):
    r = [-∞ for _ in range(n + 1)]
    return MemoizedCutRodAux(p, n, r)

def MemoizedCutRodAux(p, n, r):
    if r[n] >= 0:  # 이미 계산된 경우
        return r[n]

    if n == 0:
        q = 0
    else:
        q = -∞
        for i in range(1, n + 1):
            q = max(q, p[i] + MemoizedCutRodAux(p, n - i, r))

    r[n] = q
    return q
```

- 단 한 줄 `if r[n] >= 0: return r[n]`으로 **지수시간 → 다항시간** 개선
- 시간복잡도: **O(n²)**

---

### Bottom-up 구현

```python
def BottomUpCutRod(p, n):
    r = [0] * (n + 1)

    for j in range(1, n + 1):
        q = -∞
        for i in range(1, j + 1):
            q = max(q, p[i] + r[j - i])
        r[j] = q

    return r[n]
```

- 작은 문제부터 순서대로 계산
- 시간복잡도: **O(n²)**
- 메모이제이션보다 구현이 간결하고 빠르다

---

### 절단 위치 복원

최대 수익뿐만 아니라 **실제 어디서 잘라야 하는지**도 알아내야 한다.

```python
def ExtendedBottomUpCutRod(p, n):
    r = [0] * (n + 1)
    s = [0] * (n + 1)  # s[j]: 길이 j에서 첫 번째 절단 길이

    for j in range(1, n + 1):
        q = -∞
        for i in range(1, j + 1):
            if q < p[i] + r[j - i]:
                q = p[i] + r[j - i]
                s[j] = i  # 최적 절단 길이 저장
        r[j] = q

    return r, s

def PrintCutRodSolution(p, n):
    r, s = ExtendedBottomUpCutRod(p, n)
    while n > 0:
        print(s[n])  # 절단 길이 출력
        n = n - s[n]
```

**🔥 예시**

길이 9인 막대의 경우:

| i   | s[i] (첫 절단) | r[i] (최대 수익) |
| --- | -------------- | ---------------- |
| 1   | 1              | 1                |
| 2   | 2              | 5                |
| 3   | 3              | 8                |
| 4   | 2              | 10               |
| 5   | 2              | 13               |
| 6   | 6              | 17               |
| 7   | 1              | 18               |
| 8   | 2              | 22               |
| 9   | 3              | 25               |

→ 최적 절단: `[3, 6]`, 총 수익: `25`

---

## 3️⃣ Optimal Binary Search Tree

### 문제 설정

단어(키) `k₁, k₂, ..., kₙ`을 BST에 저장할 때, **평균 검색 비용을 최소화**하는 트리 구조를 찾는 문제이다.

- 각 키 `kᵢ`의 검색 확률: `pᵢ`
- 존재하지 않는 키(dummy key) `dᵢ`의 검색 확률: `qᵢ`
- 제약: `Σpᵢ + Σqᵢ = 1`

---

### 비용 모델

각 노드의 검색 비용은 **깊이(depth) + 1**이다.

기대 검색 비용:

```
E[search cost] = Σ pᵢ × (depth(kᵢ) + 1) + Σ qᵢ × (depth(dᵢ) + 1)
```

이 값을 최소화하는 BST가 **Optimal BST**이다.

---

### 직관과 함정

**🔹 기본 직관**

- 자주 검색되는 키는 루트 가까이에 배치
- 드물게 검색되는 키는 잎 쪽에 배치

**🔹 주의할 점**

> "확률이 가장 높은 키를 루트에 둔다고 항상 최적은 아니다"
> "트리 높이가 최소라고 해서 최적 BST는 아니다"

---

### 예시

| 키  | 확률 |
| --- | ---- |
| k₁  | 0.15 |
| k₂  | 0.10 |
| k₃  | 0.05 |
| k₄  | 0.10 |
| k₅  | 0.20 |

- 트리 1의 평균 비용: 2.8
- 트리 2의 평균 비용: **2.75** (더 낮음)

→ 루트가 `k₂` (확률 0.10)이더라도 전체 평균 비용이 최소일 수 있다

---

### 탐색 공간의 크기

`n`개의 노드로 만들 수 있는 BST의 개수:

```
4ⁿ / n^(3/2) (지수적으로 증가)
```

완전 탐색은 불가능하지만, DP를 사용하면 **O(n³)** 시간에 최적 BST를 구할 수 있다.

---

## 4️⃣ LCS (Longest Common Subsequence)

### 문제 정의

두 문자열 `X`와 `Y`에서 **둘 다에 등장하며 순서가 유지되는 가장 긴 부분수열**을 찾는 문제이다.

**🔥 예시**

```
X = ABCBDAB
Y = BDCABA

LCS = BDAB (길이 4)
```

---

### Brute Force의 한계

- `X`의 부분수열 개수: `2ⁿ`
- `Y`의 부분수열 개수: `2ᵐ`
- 모든 쌍을 비교: **O(2^(n+m))** (지수시간)

---

### DP 점화식

`L[i][j]`: `X[1..i]`와 `Y[1..j]`의 LCS 길이

```
L[i][j] = {
    0                           if i = 0 or j = 0
    L[i-1][j-1] + 1            if X[i] = Y[j]
    max(L[i-1][j], L[i][j-1])  if X[i] ≠ Y[j]
}
```

**🔹 점화식 해석**

- 마지막 문자가 같으면: 이전 LCS에 1을 더한다
- 마지막 문자가 다르면: 한쪽 문자를 제외한 두 경우 중 최댓값을 선택한다

---

### Bottom-up 구현

```python
def LCS(X, Y):
    m = len(X)
    n = len(Y)
    L = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if X[i-1] == Y[j-1]:
                L[i][j] = L[i-1][j-1] + 1
            else:
                L[i][j] = max(L[i-1][j], L[i][j-1])

    return L[m][n]
```

- 시간복잡도: **O(nm)** (이중 루프)
- 공간복잡도: **O(nm)**

---

### LCS 문자열 복원

테이블 `L`을 채운 후, 역추적하여 실제 LCS를 구할 수 있다.

**🔹 역추적 규칙**

- `X[i] = Y[j]`이면: 이 문자를 포함하고 대각선(↖)으로 이동
- `L[i-1][j] > L[i][j-1]`이면: 위(↑)로 이동
- `L[i-1][j] ≤ L[i][j-1]`이면: 왼쪽(←)으로 이동

> 💡 **LCS는 유일하지 않을 수 있다**
>
> 동일한 길이의 LCS가 여러 개 존재할 수 있다. 예를 들어 `BCAB`, `BDAB` 모두 가능할 수 있다.

---

## 5️⃣ BST 개수 세기 (Catalan Numbers)

### 문제 정의

`n`개의 노드로 만들 수 있는 **서로 다른 BST의 개수**를 구하는 문제이다.

---

### 점화식 유도

루트를 `i`번째 노드로 고정하면:

- 왼쪽 서브트리: `i-1`개의 노드 → `T[i-1]`가지
- 오른쪽 서브트리: `n-i`개의 노드 → `T[n-i]`가지

따라서 다음 점화식이 성립한다:

```
T[n] = Σ T[i-1] × T[n-i]  (i = 1, 2, ..., n)

초기조건: T[0] = 1, T[1] = 1
```

---

### Catalan 수열

이 수열은 유명한 **Catalan Numbers**이다:

```
T[0] = 1
T[1] = 1
T[2] = 2
T[3] = 5
T[4] = 14
T[5] = 42
T[6] = 132
...
```

---

### Bottom-up 구현

```python
def CountBST(n):
    T = [0] * (n + 1)
    T[0] = 1
    T[1] = 1

    for k in range(2, n + 1):
        for i in range(1, k + 1):
            T[k] += T[i-1] * T[k-i]

    return T[n]
```

- 시간복잡도: **O(n²)**
- 완전 탐색(지수시간) 대비 큰 개선

---

## 6️⃣ DP 핵심 정리

### DP의 본질

| 구분                       | 내용                                     |
| -------------------------- | ---------------------------------------- |
| **핵심 원리**              | 중복되는 부분문제의 해를 저장하여 재활용 |
| **공간-시간 트레이드오프** | 약간의 메모리를 사용해 계산 시간을 절감  |
| **적용 조건**              | (1) 최적 부분구조 (2) 부분문제 중복 발생 |

---

### 대표 문제별 시간복잡도

| 문제            | Naive      | DP    | 개선 비율   |
| --------------- | ---------- | ----- | ----------- |
| **Fibonacci**   | O(2ⁿ)      | O(n)  | 지수 → 선형 |
| **Rod Cutting** | O(2ⁿ)      | O(n²) | 지수 → 이차 |
| **Optimal BST** | 지수적     | O(n³) | 지수 → 삼차 |
| **LCS**         | O(2^(n+m)) | O(nm) | 지수 → 이차 |
| **BST 개수**    | 지수적     | O(n²) | 지수 → 이차 |

---

### DP 적용 전략

**🔥 Bottom-up vs Top-down 선택 기준**

- **Bottom-up**: 부분문제 간 의존 관계가 명확하고 모든 부분문제를 풀어야 할 때
- **Top-down**: 일부 부분문제만 필요하거나 재귀 구조가 자연스러울 때

> 💡 **Fibonacci의 특수성**
>
> Fibonacci는 각 단계에서 완전히 새로운 부분문제만 생성되므로, Top-down 메모이제이션이 비효율적이다. 반면 Rod Cutting은 작은 부분문제가 반복 등장하므로 Top-down이 효과적이다.

---

### 공간 최적화

대부분의 DP 문제는 테이블 전체를 저장하지 않고 **일부만 유지**하여 공간복잡도를 줄일 수 있다.

- Fibonacci: `O(n)` → `O(1)` (직전 두 값만 저장)
- LCS: `O(nm)` → `O(min(n, m))` (한 행만 저장)
