# Supabase 방문자수 추적 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 가입하고 새 프로젝트를 생성합니다.

## 2. 데이터베이스 테이블 생성

Supabase 대시보드에서 SQL Editor를 열고 다음 SQL을 실행하세요:

```sql
-- visits 테이블 생성
CREATE TABLE visits (
  id BIGSERIAL PRIMARY KEY,
  visit_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 인덱스 생성 (조회 성능 향상)
CREATE INDEX idx_visits_date ON visits(visit_date);
CREATE INDEX idx_visits_created_at ON visits(created_at);

-- RLS (Row Level Security) 정책 설정
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽기 가능하도록 설정
CREATE POLICY "Allow public read access" ON visits
  FOR SELECT USING (true);

-- 모든 사용자가 삽입 가능하도록 설정
CREATE POLICY "Allow public insert access" ON visits
  FOR INSERT WITH CHECK (true);
```

## 3. 환경 변수 설정

프로젝트 루트에 `.env.development` 파일을 생성하고 다음 내용을 추가하세요:

```env
GATSBY_SUPABASE_URL=your_supabase_project_url
GATSBY_SUPABASE_ANON_KEY=your_supabase_anon_key
```

또는 `.env.production` 파일에도 동일하게 추가하세요.

### Supabase URL과 Key 찾는 방법:

1. Supabase 대시보드에서 프로젝트 선택
2. Settings → API 메뉴로 이동
3. `Project URL`을 `GATSBY_SUPABASE_URL`에 복사
4. **Publishable key**를 `GATSBY_SUPABASE_ANON_KEY`에 복사

> 💡 **참고**: Supabase가 최근 API 키 시스템을 업데이트했습니다.
>
> - **Publishable key** = 이전의 `anon` key (클라이언트에서 사용)
> - **Secret key** = 이전의 `service_role` key (서버에서만 사용)

### GATSBY_SUPABASE_ANON_KEY란?

`GATSBY_SUPABASE_ANON_KEY`는 Supabase의 **Publishable key (공개 키)**입니다.

- **Publishable key**: 클라이언트 사이드(브라우저)에서 사용하는 공개 키
- **공개적으로 노출되어도 안전**: 이 키는 공개되어도 괜찮습니다. 보안은 **Row Level Security (RLS)** 정책으로 관리됩니다
- **Gatsby에서 사용**: `GATSBY_` 접두사가 붙은 환경 변수는 Gatsby 빌드 시 클라이언트 번들에 포함됩니다

⚠️ **주의**:

- **Secret key**는 절대 클라이언트에 노출하면 안 됩니다 (서버 사이드에서만 사용)
- 우리는 **Publishable key**만 사용하므로 안전합니다
- RLS 정책을 통해 데이터 접근 권한을 제어합니다

## 4. 환경 변수 파일을 Git에 추가하지 않도록 설정

`.gitignore` 파일에 다음이 이미 포함되어 있는지 확인하세요:

```
.env*
```

## 5. 배포 환경 설정

GitHub Pages나 다른 호스팅 서비스를 사용하는 경우, 환경 변수를 설정해야 합니다:

- **GitHub Actions**: Repository Settings → Secrets → Actions에서 환경 변수 추가
- **Netlify/Vercel**: 대시보드에서 Environment Variables 설정

## 6. 테스트

개발 서버를 실행하여 방문자수가 제대로 표시되는지 확인하세요:

```bash
npm run develop
```

## 참고사항

- 방문자수는 같은 날짜에 같은 브라우저에서 한 번만 카운트됩니다 (localStorage 사용)
- 새로고침해도 같은 세션에서는 카운트되지 않습니다
- 날짜가 바뀌면 새로운 방문으로 카운트됩니다
