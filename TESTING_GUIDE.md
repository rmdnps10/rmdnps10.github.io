# Supabase 방문자수 추적 테스트 가이드

## 1. 환경 변수 확인

`.env.development` 파일이 올바르게 설정되어 있는지 확인하세요:

```env
GATSBY_SUPABASE_URL=https://your-project-id.supabase.co
GATSBY_SUPABASE_ANON_KEY=your_publishable_key
```

⚠️ **주의**: 
- `GATSBY_SUPABASE_URL`은 **HTTP API URL**이어야 합니다 (예: `https://xxxxx.supabase.co`)
- PostgreSQL 연결 문자열(`postgresql://...`)이 아닙니다!
- Supabase 대시보드 → Settings → API → Project URL에서 확인하세요

## 2. Supabase 테이블 확인

Supabase 대시보드에서 다음을 확인하세요:

1. **Table Editor** → `visits` 테이블이 존재하는지 확인
2. 테이블 구조:
   - `id` (BIGSERIAL, PRIMARY KEY)
   - `visit_date` (DATE, NOT NULL)
   - `created_at` (TIMESTAMP)
3. **RLS 정책** 확인:
   - SELECT 정책: 모든 사용자 읽기 가능
   - INSERT 정책: 모든 사용자 삽입 가능

## 3. 개발 서버 실행

```bash
npm run develop
```

## 4. 브라우저에서 확인

1. 브라우저에서 `http://localhost:8000` 접속
2. **개발자 도구 열기** (F12 또는 Cmd+Option+I)
3. **Console 탭** 확인:
   - 에러가 없어야 합니다
   - `Error tracking visitors:` 메시지가 없어야 합니다

## 5. 방문자수 표시 확인

- Bio 컴포넌트에서 "Today"와 "Total" 숫자가 표시되는지 확인
- 처음 방문 시 "Today"는 1, "Total"은 1 이상이어야 합니다
- 로딩 중에는 "..." 표시

## 6. Supabase 대시보드에서 데이터 확인

1. Supabase 대시보드 → **Table Editor** → `visits` 테이블
2. 페이지를 새로고침하면 새로운 행이 추가되는지 확인
3. 같은 날짜에 여러 번 새로고침해도 **한 번만** 추가되어야 합니다 (localStorage로 중복 방지)

## 7. 문제 해결

### 방문자수가 표시되지 않는 경우

1. **환경 변수 확인**:
   ```bash
   # Gatsby는 빌드 시 환경 변수를 읽으므로 서버 재시작 필요
   npm run develop
   ```

2. **브라우저 콘솔 확인**:
   - `Supabase environment variables are not set` 경고가 있는지 확인
   - 네트워크 에러가 있는지 확인

3. **Supabase 연결 확인**:
   - Supabase 대시보드 → Settings → API에서 URL과 Key가 올바른지 확인
   - 테이블이 존재하는지 확인

### 에러 메시지 확인

브라우저 콘솔에서 다음 에러들을 확인하세요:

- `Error tracking visitors:` - Supabase 연결 문제
- `relation "visits" does not exist` - 테이블이 생성되지 않음
- `new row violates row-level security policy` - RLS 정책 문제

## 8. 테스트 시나리오

### 시나리오 1: 첫 방문
1. 브라우저를 완전히 닫고 다시 열기
2. 또는 시크릿 모드에서 접속
3. 방문자수가 증가하는지 확인

### 시나리오 2: 같은 날 재방문
1. 같은 브라우저에서 페이지 새로고침
2. 방문자수가 증가하지 않아야 함 (localStorage로 중복 방지)

### 시나리오 3: 다른 날 방문
1. 다음 날 다시 접속
2. "Today"는 1로 리셋되고, "Total"은 계속 증가해야 함

## 9. 네트워크 요청 확인

개발자 도구 → **Network 탭**에서:
- `rest/v1/visits` 요청이 보이는지 확인
- 요청이 성공(200)하는지 확인
- POST 요청(INSERT)과 GET 요청(SELECT)이 모두 있는지 확인

