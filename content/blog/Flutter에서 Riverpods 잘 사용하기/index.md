---
title: "Flutter에서 Riverpod '잘' 사용하기"
date: "2025-09-20"
description: "React에 익숙한 개발자 입장에서 Todo리스트를 구현하며 Flutter의 Riverpod 상태관리 라이브러리 사용법을 다뤄봅니다."
thumbnail: "./index.png"
pointColor: "#0468d7"
tags: ["Flutter", "Riverpod", "상태관리"]
---

> LG전자 산학 캡스톤에서 Flutter로 프로젝트를 진행하기 전 프리코스로 TODO 리스트 개발 과제가 주어졌다.

#### 📋 요구사항

```
- 투두리스트 기본적인 기능 구현
- Riverpod 상태 관리 구현
- DevTools 사용
```

그리고 따로 README 파일을 만들어서 상태 자료구조, widget 설명, DevTools에서 Inspector&Timeline&Memory&Performance 화면을 스크린샷해야 한다.

TODO 리스트 그냥 띡 만들어봐가 아닌 거 같아서, 나도 이에 부응해서 Flutter, Riverpod 공식문서를 살펴보면서 관련 내용을 학습하며 투두 리스트를 완성했다.
오늘은 이 과정 속 내가 학습한 내용에 대해 다뤄보고자 한다.

## 1️⃣ Riverpod 개념잡기

#### Riverpod이 뭘까?

Riverpod은 Flutter에서 사용하는 **반응형 상태 관리 라이브러리**다. Provider 패키지의 단점들을 개선하여 만들어진 차세대 상태 관리 솔루션이다.

**주요 특징:**

- **컴파일 타임 안전성**: 런타임 에러를 컴파일 타임에 잡아낼 수 있다
- **테스트 용이성**: Provider들을 쉽게 모킹하고 오버라이드할 수 있다
- **모듈성**: Provider들을 독립적으로 관리할 수 있다
- **DevTools 지원**: 상태 변화를 시각적으로 확인할 수 있다

#### 설치 방법

Flutter 프로젝트에서 패키지를 관리하는 방법은 두 가지가 있다.

**pubspec.yaml이란?**
`pubspec.yaml`은 Flutter 프로젝트의 **메타데이터와 의존성을 관리하는 파일**이다. Node.js의 `package.json`이나 Python의 `requirements.txt`와 같은 역할을 한다.

**방법 1: pubspec.yaml에 직접 추가**

프로젝트 루트의 `pubspec.yaml` 파일에 다음 의존성을 추가한다:

```yaml
dependencies:
  flutter_riverpod: ^2.4.9

dev_dependencies:
  riverpod_generator: ^2.3.9
  build_runner: ^2.4.7
```

그 다음 터미널에서 패키지를 설치한다:

```bash
flutter pub get
```

**방법 2: 터미널에서 직접 설치**

더 간편한 방법으로, 터미널에서 직접 설치할 수 있다:

```bash
# 메인 의존성 설치
flutter pub add flutter_riverpod

# 개발 의존성 설치 (코드 생성용)
flutter pub add --dev riverpod_generator build_runner
```

이 명령어들은 자동으로 `pubspec.yaml`을 업데이트하고 패키지를 설치한다.

#### 기존 Flutter 상태 관리와 다른 점

**기존 setState 방식:**

```dart
class _CounterState extends State<Counter> {
  int count = 0;

  void increment() {
    setState(() => count++);
  }
}
```

**Riverpod 방식:**

```dart
final counterProvider = StateProvider<int>((ref) => 0);

// UI에서 사용
final count = ref.watch(counterProvider);
ref.read(counterProvider.notifier).state++;
```

React와 유사한 패턴으로, **상태와 UI가 분리**되어 있다는 점이 큰 차이다.

#### Provider 패턴과 의존성 주입

Riverpod은 **의존성 주입(Dependency Injection)** 패턴을 기반으로 한다. Provider들이 상태를 제공하고, Widget들이 이를 구독하는 구조다.

```dart
// Provider 정의
final userProvider = Provider<User>((ref) => User());

// 다른 Provider에서 의존성 사용
final userRepositoryProvider = Provider<UserRepository>((ref) {
  final user = ref.watch(userProvider);
  return UserRepository(user);
});
```

## 2️⃣ 투두리스트 만들며 적용해보기

#### 프로젝트 기본 세팅

먼저 main.dart에서 `ProviderScope`로 앱을 감싸야 한다:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'app.dart';

void main() {
  runApp(
    const ProviderScope(
      child: App(),
    ),
  );
}
```

`ProviderScope`는 React의 Context Provider와 같은 역할을 한다. 이 안에서만 Provider들을 사용할 수 있다.

#### 모델 정의

먼저 Todo 모델을 정의한다:

```dart
class Todo {
  final String id;
  final String title;
  final bool isDone;

  const Todo({required this.id, required this.title, this.isDone = false});

  Todo copyWith({String? id, String? title, bool? isDone}) {
    return Todo(
      id: id ?? this.id,
      title: title ?? this.title,
      isDone: isDone ?? this.isDone,
    );
  }
}
```

`copyWith` 메서드는 불변성을 유지하면서 객체를 업데이트할 때 사용한다. React의 spread operator와 비슷한 역할이다.

### `Notifier`로 상태관리하기

#### TodoNotifier 작성 (addTodo, toggleTodo, removeTodo)

Riverpod 3.0부터는 `StateNotifier` 대신 `Notifier`를 사용한다:

```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/todo.dart';

class TodoNotifier extends Notifier<List<Todo>> {
  @override
  List<Todo> build() {
    // 초기 상태
    return [];
  }

  void add(String title) {
    final id = DateTime.now().millisecondsSinceEpoch.toString();
    state = [...state, Todo(id: id, title: title)];
  }

  void toggle(String id) {
    state = [
      for (final t in state)
        if (t.id == id) t.copyWith(isDone: !t.isDone) else t,
    ];
  }

  void remove(String id) {
    state = state.where((t) => t.id != id).toList();
  }
}
```

#### NotifierProvider 연결하기

```dart
final todoListProvider = NotifierProvider<TodoNotifier, List<Todo>>(
  TodoNotifier.new,
);
```

이제 이 Provider를 통해 어디서든 Todo 리스트 상태에 접근할 수 있다.

#### React의 useReducer와 비교

**React useReducer:**

```javascript
const [todos, dispatch] = useReducer(todoReducer, [])

// 액션 디스패치
dispatch({ type: "ADD_TODO", payload: { title: "New Todo" } })
```

**Riverpod Notifier:**

```dart
final todos = ref.watch(todoListProvider);
final notifier = ref.read(todoListProvider.notifier);

// 메서드 직접 호출
notifier.add('New Todo');
```

Riverpod이 더 직관적이고 타입 안전하다는 장점이 있다.

### UI 조각에서 `Provider`로 읽어오기

#### 기본 패턴

Widget에서 Provider를 사용하려면 `ConsumerWidget`을 상속받아야 한다:

```dart
class TodoList extends ConsumerWidget {
  const TodoList({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final todos = ref.watch(todoListProvider);

    if (todos.isEmpty) {
      return const Center(child: Text('아직 할 일이 없어요. + 버튼으로 추가!'));
    }

    return ListView.builder(
      itemCount: todos.length,
      itemBuilder: (_, i) => TodoItem(todo: todos[i]),
    );
  }
}
```

#### `ref.watch` vs `ref.read`

- **`ref.watch`**: 상태 변화를 구독하여 UI가 자동으로 리빌드된다
- **`ref.read`**: 일회성으로 값을 읽거나 메서드를 호출할 때 사용한다

```dart
// 상태 구독 - UI 리빌드됨
final todos = ref.watch(todoListProvider);

// 일회성 읽기 - UI 리빌드 안됨
final notifier = ref.read(todoListProvider.notifier);
```

### 애플리케이션 로직 구현

#### Todo 추가

```dart
class _TodoPageState extends ConsumerState<TodoPage> {
  final _controller = TextEditingController();

  void _submit() {
    final text = _controller.text.trim();
    if (text.isNotEmpty) {
      ref.read(todoListProvider.notifier).add(text);
      _controller.clear();
    }
  }

  // ... 나머지 코드
}
```

#### Todo 삭제 및 토글

```dart
class TodoItem extends ConsumerWidget {
  final Todo todo;
  const TodoItem({super.key, required this.todo});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return ListTile(
      leading: Checkbox(
        value: todo.isDone,
        onChanged: (_) => ref.read(todoListProvider.notifier).toggle(todo.id),
      ),
      title: Text(
        todo.title,
        style: TextStyle(
          decoration: todo.isDone ? TextDecoration.lineThrough : null,
        ),
      ),
      trailing: IconButton(
        icon: const Icon(Icons.delete),
        onPressed: () => ref.read(todoListProvider.notifier).remove(todo.id),
      ),
    );
  }
}
```

## 3️⃣ ⭐️ Best Practice 정리

### 1. Provider 네이밍 컨벤션

```dart
// ✅ Good
final userProvider = Provider<User>(...);
final todoListProvider = NotifierProvider<TodoNotifier, List<Todo>>(...);

// ❌ Bad
final user = Provider<User>(...);
final todos = NotifierProvider<TodoNotifier, List<Todo>>(...);
```

### 2. 상태와 로직 분리

```dart
// ✅ Good - 비즈니스 로직을 Notifier에 캡슐화
class TodoNotifier extends Notifier<List<Todo>> {
  void addTodo(String title) {
    if (title.trim().length < 3) return; // 유효성 검사
    // 로직 구현
  }
}

// ❌ Bad - Widget에서 직접 상태 조작
ref.read(provider.notifier).state = [...state, newTodo];
```

### 3. Provider 의존성 관리

```dart
// ✅ Good - 명시적 의존성
final filteredTodosProvider = Provider<List<Todo>>((ref) {
  final todos = ref.watch(todoListProvider);
  final filter = ref.watch(filterProvider);

  return todos.where((todo) => filter.apply(todo)).toList();
});
```

### 4. 에러 처리

```dart
// AsyncNotifier 사용 시
final todosProvider = AsyncNotifierProvider<TodosNotifier, List<Todo>>(
  TodosNotifier.new,
);

// UI에서
final todosAsync = ref.watch(todosProvider);

return todosAsync.when(
  data: (todos) => TodoList(todos),
  loading: () => CircularProgressIndicator(),
  error: (error, stack) => Text('Error: $error'),
);
```

### 5. 테스트 용이성을 위한 구조

```dart
// Provider를 오버라이드하여 테스트
testWidgets('Todo 추가 테스트', (tester) async {
  await tester.pumpWidget(
    ProviderScope(
      overrides: [
        todoListProvider.overrideWith(() => MockTodoNotifier()),
      ],
      child: MyApp(),
    ),
  );
});
```

Riverpod은 처음엔 복잡해 보이지만, 한번 익숙해지면 React의 상태 관리와 매우 유사하다는 걸 느낄 수 있다. 특히 **타입 안전성**과 **테스트 용이성** 면에서 큰 장점을 제공한다.

Flutter 프로젝트에서 상태 관리가 복잡해질 때 Riverpod을 고려해보자! 🚀
