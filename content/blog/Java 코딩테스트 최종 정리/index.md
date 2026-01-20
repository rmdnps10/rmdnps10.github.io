---
title: "Java 코딩테스트 문법 최종 정리"
slug: "java-coding-test-grammer"
date: "2026-01-08"
description: "Java로 코딩테스트를 준비하며 자주 사용하는 문법과 메서드들을 다~ 정리해보자."
thumbnail: "./index.png"
pointColor: "#ed8b00"
tags: ["알고리즘"]
keywords: "Java, 코딩테스트, 알고리즘, 문법, Collection, Stream, String, StringBuilder"
---

> Java 코딩테스트를 준비하는 데 있어서 자주 사용하는 문법과 메서드들을 모두 정리해보자!

## 1️⃣ 형변환

Java에서 자주 사용하는 형변환 방법을 정리한다.

#### 1-1. Wrapper 클래스의 toString

`toString()`은 기본적으로 `Object`의 메서드다. 모든 Java 클래스는 `Object` 클래스를 상속하므로 기본적으로 `toString()` 메서드를 사용할 수 있다.

```java
Integer num = 100;
System.out.println(num.toString()); // "100"

Double d = 12.34;
System.out.println(d.toString()); // "12.34"

Boolean bool = true;
System.out.println(bool.toString()); // "true"
```

**원시 타입 char의 toString**

원시 타입은 `toString()`을 직접 사용할 수 없으므로 `Character.toString()`을 사용한다.

```java
char a = 'a';
Character.toString(a); // "a"
```

#### 1-2. 문자열과 숫자 간 변환

**문자열 → 숫자 변환**

```java
Integer.parseInt("100"); // 문자열 "100"을 숫자 100으로 변환
Long.parseLong(str); // 문자열을 long으로 변환 (int 범위를 넘을 때 사용)
```

**숫자 → 문자열 변환**

```java
Integer.toString(100); // 숫자 100을 문자열 "100"으로 변환
int b = Integer.parseInt(10 + ""); // 숫자 + 빈 문자열로 문자열 변환 가능
```

#### 1-3. 진수 변환

10진수를 다른 진수로 변환할 수 있다.

```java
int decimalNumber = 25;

// 10진수를 2진수로 변환
String binary = Integer.toBinaryString(decimalNumber);
System.out.println("2진수: " + binary); // "11001"

// 10진수를 8진수로 변환
String octal = Integer.toOctalString(decimalNumber);
System.out.println("8진수: " + octal); // "31"

// 10진수를 16진수로 변환
String hex = Integer.toHexString(decimalNumber);
System.out.println("16진수: " + hex); // "19"
```

## 2️⃣ String

`String`은 한번 만들어지면 문자 추가, 삭제가 불가능하다. 변경이 필요하면 `StringBuilder`를 사용한다.

#### 2-1. 기본 메서드

**길이와 빈 문자열 확인**

```java
String str = "java";

str.length(); // 4
str.isEmpty(); // false
```

**문자 찾기**

```java
str.charAt(0); // 해당하는 인덱스의 문자 반환 -> 'j'
str.indexOf("a"); // 해당하는 문자의 인덱스 반환 -> 1
str.lastIndexOf("a"); // 해당하는 문자의 마지막 인덱스 반환 -> 3
```

**문자 자르기**

```java
str.substring(0, 2); // 인덱스 0이상 2 미만의 문자열 반환 -> "ja"
str.substring(2); // 인덱스 2부터 문자열 반환 -> "va"
```

**문자 치환**

`replace` 메서드는 원본 문자열을 변경하지 않는다. 변경된 값을 사용하려면 새로운 변수에 저장해야 한다.

```java
str.replace('a', 'i'); // 모든 'a'를 'i'로 치환 -> "jivi"
str.replaceAll(".", "/"); // 정규식 사용, 모든 문자를 "/"로 치환 -> "////"
str.replaceFirst("j", "a"); // 첫번째로 등장하는 "j"를 "a"로 치환 -> "aava"
```

#### 2-2. 문자열 비교

**동일 여부 판단**

`String`은 reference 객체이기 때문에 `==`로 비교하면 주소값을 비교한다. 따라서 `equals()`를 사용한다.

```java
str.equals("java"); // true
```

**사전순 비교**

```java
str.compareTo("jbva"); // -1 (str이 사전순으로 앞서면 음수)
str.compareTo("javc"); // -2 (마지막 문자 차이 반환)
```

- `str < 비교문자열`: 음수 반환
- `str > 비교문자열`: 양수 반환
- `str == 비교문자열`: 0 반환

**문자열 포함 여부**

```java
str.contains("ja"); // true
```

#### 2-3. 문자열 분리

```java
String[] arr1 = str.split(" "); // 공백 기준으로 분리
String[] arr2 = str.split(""); // 모든 문자를 개별 요소로 분리 -> ["j", "a", "v", "a"]
```

**배열 출력 방법**

```java
// 방법 1: 반복문
for (int i = 0; i < arr1.length; i++) {
    System.out.println(arr1[i]);
}

// 방법 2: for-each문
for (String value : arr1) {
    System.out.println(value);
}

// 방법 3: Arrays.toString
System.out.println(Arrays.toString(arr1)); // arr1.toString()은 주소값 출력
```

#### 2-4. 기타 유용한 메서드

```java
str.trim(); // 앞뒤 공백 제거 (문자열 사이 공백은 제거하지 않음)
str.startsWith("abc"); // 접두어 확인
str.endsWith("adc"); // 접미어 확인
```

## 3️⃣ StringBuilder

`String`과 달리 값을 계속 변경할 수 있다.

```java
StringBuilder sb = new StringBuilder();

// 문자열 추가
sb.append("java"); // "java"

// 특정 인덱스에 문자 삽입
sb.insert(2, "v"); // 2번 인덱스에 "v" 삽입 -> "javva"

// 문자열 삭제
sb.delete(0, 1); // 0~1 문자열 삭제 -> "avva"
sb.deleteCharAt(0); // 특정 인덱스의 문자 삭제 -> "vva"

// 특정 인덱스의 문자 변경
sb.setCharAt(0, 'j'); // 특정 인덱스의 문자 하나만 변경 (큰따옴표 사용 불가)

// 문자열 뒤집기
sb.reverse(); // "avj"

// 문자열 길이 조절
sb.setLength(2); // 길이를 2로 줄이기 -> "av"
sb.setLength(4); // 길이를 4로 늘리기 -> "av  " (공백으로 채워짐)

// StringBuilder -> String 변환
sb.toString();
```

## 4️⃣ Collection Framework

컬렉션 프레임워크는 `List`, `Set`, `Queue`로 크게 3가지 상위 인터페이스로 분류된다. `Map`은 `Collection` 인터페이스를 상속받지 않지만 컬렉션으로 분류된다.

#### 4-1. List

`List` 인터페이스는 순서 있는 저장 공간으로 `LinkedList`, `Stack`, `Vector`, `ArrayList`의 상위 인터페이스다.

**기본 선언**

```java
List<String> list = new ArrayList<>();
List<String> list2 = new Stack<>();
List<String> list3 = new Vector<>();
List<String> list4 = new LinkedList<>();
```

**요소 삽입**

```java
list.add("one"); // 요소 추가
list.add(0, "zero"); // 특정 인덱스에 요소 삽입
list.addAll(merge_list); // 리스트 병합 (추가되는 리스트가 뒤로 감)
```

**요소 찾기**

```java
list.indexOf("zero"); // 특정 요소의 첫번째 인덱스 반환 -> 0
list.lastIndexOf("zero"); // 특정 요소의 마지막 인덱스 반환 -> 0
```

**요소 삭제**

```java
list.remove(0); // 특정 인덱스 값 삭제 (값 기준 아님)
list.remove(Integer.valueOf(20)); // 특정 '값' 삭제
list.remove("one"); // 특정 요소의 첫번째 값 삭제
list.removeAll(merge_list); // 리스트 차집합 (list에서 merge_list에 있는 값 삭제)
list.retainAll(merge_list); // 리스트 교집합 (list에서 merge_list에 있는 값을 제외한 모든 값 삭제)
list.removeIf(x -> x.equals("one")); // 람다식 사용하여 요소 제거
```

**기타 메서드**

```java
list.clear(); // 리스트 비우기
list.isEmpty(); // 리스트 비었는지 체크
list.size(); // 리스트 길이
list.contains("one"); // 특정 요소 포함 여부 체크
list.containsAll(merge_list); // 리스트에 다른 리스트 요소가 전부 포함되어 있는지 여부 체크
System.out.println(list); // 리스트 출력 (배열과 달리 바로 출력 가능)
```

#### 4-2. Array ↔ List 변환

**문자열 타입 Array → List**

```java
String[] str_arr = {"ah", "jip", "gago", "sipda"};
List<String> str_list = new ArrayList<>(Arrays.asList(str_arr));
```

**List → 문자열 Array**

```java
List<String> str_list2 = new ArrayList<>();
String[] str_arr2 = str_list2.toArray(new String[str_list2.size()]);
```

**int Array → Integer List**

`List`는 primitive 타입을 담을 수 없으므로 `Integer`로 박싱해야 한다.

```java
int[] int_arr = {1, 2, 3, 4};
List<Integer> list1 = Arrays.stream(int_arr)
    .boxed()
    .collect(Collectors.toList()); // ArrayList로 받으면 에러 발생
```

**Integer List → int Array**

```java
List<Integer> list = new ArrayList<>();
int[] int_arr2 = list.stream()
    .mapToInt(x -> x)
    .toArray();
```

#### 4-3. Collections 메서드

**최대, 최솟값 구하기**

```java
List<Integer> array_list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
List<Integer> list2 = new Vector<>();
List<Integer> list3 = new LinkedList<>();
List<Integer> list4 = new Stack<>();

Collections.max(array_list); // 최댓값
Collections.min(array_list); // 최솟값
```

**정렬하기**

```java
// Collection 타입 정렬
Collections.sort(array_list); // 오름차순
Collections.sort(array_list, Collections.reverseOrder()); // 내림차순

// Array 타입 오름차순 정렬
Arrays.sort(array); // 오름차순

// int array 내림차순 정렬 (박싱 필요)
Integer[] boxing_int = Arrays.stream(array)
    .boxed()
    .toArray(Integer[]::new);
Arrays.sort(boxing_int, Collections.reverseOrder()); // reverseOrder 사용
Arrays.sort(boxing_int, (a, b) -> b - a); // 람다식 사용

// 참조 타입 배열 내림차순 정렬
String[] str_array = {"a", "b", "c"};
Arrays.sort(str_array, Collections.reverseOrder()); // 박싱 불필요
```

**기타 Collections 메서드**

```java
Collections.reverse(array_list); // collection 뒤집기
Collections.frequency(array_list, 2); // 원소 2의 개수 반환
Collections.binarySearch(array_list, 2); // 이진탐색으로 원소 2의 위치(인덱스) 반환
```

#### 4-4. Stack

> `Deque`(ArrayDeque)를 사용하는 것이 더 빠르고 권장됩니다.**

```java
// ✅ 권장: Deque 사용 (ArrayDeque가 가장 빠름)
Deque<Integer> stack = new ArrayDeque<>();

stack.push(1);        // 요소 추가
stack.pop();          // 요소 제거
stack.peek();         // 최상단 요소 확인
stack.isEmpty();      // 스택 비어있는지 확인
stack.size();         // 스택 크기
stack.clear();        // 스택 비우기
stack.contains(1);    // 특정 요소 존재 확인

// ❌ 비권장: Stack 클래스 (Vector 기반, 동기화 오버헤드)
// Stack<Integer> oldStack = new Stack<>();
```

#### 4-5. Queue

> `Queue`는 `ArrayDeque`를 사용하는 것이 `LinkedList`보다 빠르다.

```java
// ✅ 권장: ArrayDeque 사용 (가장 빠름, 메모리 효율적)
Deque<Integer> queue = new ArrayDeque<>();
// 또는
Queue<Integer> queue = new ArrayDeque<>();

// ❌ 비권장: LinkedList (느림, 메모리 오버헤드 큼)
// Queue<Integer> queue = new LinkedList<>();
```

**요소 추가/제거**

문제 상황에서 예외를 발생시키는 메서드와 `false`/`null`을 반환하는 메서드가 있다.

```java
// 요소 추가
queue.add(1);      // 큐 끝에 추가 (실패시 예외)
queue.offer(2);    // 큐 끝에 추가 (실패시 false)

// 요소 제거
queue.remove();    // 큐 앞 제거 (비었으면 예외)
queue.poll();      // 큐 앞 제거 (비었으면 null)

// 최전방 요소 확인
queue.element();   // 큐 앞 확인 (비었으면 예외)
queue.peek();      // 큐 앞 확인 (비었으면 null)
```

**우선순위 큐**

```java
PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> b - a); // 내림차순
PriorityQueue<Integer> pq2 = new PriorityQueue<>(Collections.reverseOrder()); // 내림차순
```

#### 4-6. HashSet

- `HashSet`: 중복 허용 X, 순서 X
- `TreeSet`: 중복 허용 X, 순서 O (삽입순)
- `LinkedHashSet`: 중복 허용 X, 이진탐색트리 형태로 데이터 저장 (정렬 가능)

```java
HashSet<Integer> hs = new HashSet<>();
HashSet<Integer> hs2 = new HashSet<>();
Set<Integer> s3 = new HashSet<>(); // 업캐스팅

hs.add(1); // 요소 추가
hs.remove(1); // 요소 삭제
hs.removeAll(hs2); // 차집합 (hs의 요소 중 hs2와 중복되는 요소 삭제)
hs.retainAll(hs2); // 교집합 (hs의 요소 중 hs2와 중복된 요소만 남기고 삭제)
hs.clear(); // 데이터 초기화
hs.size(); // 사이즈 확인
hs.contains(1); // 특정 요소 포함 여부 확인

// 요소 전체 출력
for (Integer i : hs) {
    System.out.println(i);
}
```

#### 4-7. HashMap

`Map`은 `<key, value>`의 자료구조다.

- `HashMap`: value의 중복 허용 O
- `TreeMap`: key 순서가 오름차순으로 정렬
- `LinkedHashMap`: value의 중복 허용 O, key 순서가 존재 (삽입순)

```java
HashMap<Integer, Integer> hm = new HashMap<>();

hm.put(0, 0); // 요소 추가
hm.put(1, 1);
hm.put(2, 2);

hm.remove(1); // 요소 삭제
hm.clear(); // 전체 삭제

hm.containsKey(1); // key 포함 여부 반환
hm.containsValue(1); // value 포함 여부 반환
hm.get(1); // value 조회
hm.getOrDefault(1, 0); // key에 맞는 value 조회하되, 없으면 default값 반환

// key-value 출력
// 방법 1: keySet() 메서드 사용
for (Integer key : hm.keySet()) {
    System.out.println(key + " " + hm.get(key));
}

// 방법 2: entrySet() 메서드 사용
for (Map.Entry<Integer, Integer> entry : hm.entrySet()) {
    System.out.println(entry.getKey() + " " + entry.getValue());
}
```

## 5️⃣ Math

자주 사용하는 수학 메서드를 정리한다.

```java
Math.abs(-1); // 절댓값 반환 -> 1

Math.min(-1, 1); // 최솟값 -> -1
Math.max(-1, 1); // 최댓값 -> 1

Math.round(2.4); // 반올림, 정수 반환 -> 2
Math.round(2.5); // 3

Math.rint(2.4); // 반올림, double 반환 -> 2.0
Math.rint(-1.7); // -2.0

Math.ceil(-1.3); // 올림, double 반환 -> -1.0
Math.ceil(1.2); // 2.0

Math.floor(3.9); // 버림, double 반환 -> 3.0
Math.floor(-3.6); // -4.0

Math.sqrt(9); // 제곱근 구함 -> 3.0
Math.pow(2, 3); // n제곱 구함 -> 8.0
```

**타입 변환 주의사항**

`round()`를 제외하고는 모두 `double`을 반환한다. `int`로 변환이 필요할 때는 캐스팅하거나 `round()`를 사용한다.

```java
return (int) Math.pow(a, 2); // 캐스팅
return Math.round(Math.pow(a, 2)); // round() 사용 (int 반환)
```

**소수점 둘째자리까지 출력**

```java
// 방법 1: Math.round() 사용
Math.round(value * 100.0) / 100.0; // 26.67

// 방법 2: String.format() 사용 (항상 같은 포맷 유지)
String.format("%.2f", value); // "45.00"
```

## 6️⃣ Stream

스트림은 유용하지만 메서드가 많아 자주 쓰는 것들만 정리한다.

#### 6-1. Array ↔ List 변환

```java
// Integer List -> int Array
list.stream().mapToInt(x -> x).toArray();

// int Array -> Integer List
Arrays.stream(list).boxed().collect(Collectors.toList());

// int array -> Integer Queue 변환 (ArrayDeque 권장)
Queue<Integer> queue = Arrays.stream(progresses)
    .boxed()
    .collect(Collectors.toCollection(ArrayDeque::new));
```

#### 6-2. 특정 값 찾기

```java
boolean found = Arrays.stream(a).anyMatch(value -> value == target);
```

#### 6-3. 모든 값 매핑하여 Array로 저장

```java
Arrays.stream(array).map(e -> e * 2).toArray();
```

## 7️⃣ 기타 유용한 문법

#### 7-1. 정적 배열

정적 배열은 메서드가 없어 `remove`, `add`가 불가능하다. 요소 추가가 자유롭지 않다.

```java
int[] a = {1, 2, 3, 4, 5};
int[] b = new int[5];

Arrays.sort(a); // 오름차순 정렬
Arrays.sort(a, Collections.reverseOrder()); // 내림차순 정렬 (참조 타입만 가능)
```

#### 7-2. 커스텀 클래스 정렬

```java
class Pair {
    int y;
    int x;

    public Pair(int y, int x) {
        this.y = y;
        this.x = x;
    }
}

// 1순위: y 오름차순, 2순위: x 내림차순
Pair[] a = {new Pair(1, 2), new Pair(2, 3)};
Arrays.sort(a, (p1, p2) -> (p1.y == p2.y)
    ? Integer.compare(p2.x, p1.x)
    : Integer.compare(p1.y, p2.y));
```

#### 7-3. 배열 복사

```java
System.arraycopy(source, 0, arr, 0, 5);
// 소스 배열의 0번째 인덱스부터 원본 배열의 0번째 인덱스에 5개를 복사
```

#### 7-4. 그래프 탐색 변수 선언

```java
private static List<List<Integer>> adj; // 인접 리스트
private static boolean[] visited; // DFS용 (boolean)
private static int[] visited2; // BFS용 (int)
```

**DFS vs BFS**

- **DFS**: `visited`를 `boolean` 타입으로 사용
- **BFS**: `visited`를 `int` 타입으로 사용 (거리 정보 저장 가능)

#### 7-5. 문자열 순회

문자열을 순회할 때는 `toCharArray()`를 사용한다.

```java
char[] chars = str.toCharArray();
for (char c : chars) {
    // 처리
}
```


#### 7-6. 문자열 알파벳 카운트

```java
// 소문자 알파벳 카운트
String str = "hello world";
int[] count = new int[26];
for (char c : str.toCharArray()) {
    if (c >= 'a' && c <= 'z') {
        count[c - 'a']++;
    }
}

// 대소문자 모두 카운트 (소문자로 변환)
String str2 = "Hello World";
int[] count2 = new int[26];
for (char c : str2.toLowerCase().toCharArray()) {
    if (c >= 'a' && c <= 'z') {
        count2[c - 'a']++;
    }
}

// 결과 출력 예시
for (int i = 0; i < 26; i++) {
    if (count[i] > 0) {
        System.out.println((char)('a' + i) + ": " + count[i]);
    }
}
```
