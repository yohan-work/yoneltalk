# RelayDesk pilot workspace

RelayDesk는 글로벌 IT 지원팀을 위한 내부 파일럿 워크스페이스입니다. 고객 문의를 Inbox,
내부 메모, Support Case, Incident, 개발 이관 흐름으로 연결합니다.

## Run locally

```bash
npm install
npm run dev
```

Supabase를 연결하지 않으면 안전한 로컬 데모 모드로 시작합니다.

## Supabase 파일럿 설정

1. 무료 Supabase 프로젝트를 만들고 SQL Editor 또는 Supabase CLI로 `supabase/migrations/202607270001_initial_workspace.sql`을 적용합니다.
2. Auth에서 내부 파일럿 계정을 사전 생성하고, 각 계정에 `profiles`와 `memberships` 행을 추가합니다. `memberships.workspace_id`는 해당 워크스페이스 ID를 사용합니다.
3. `.env.example`을 `.env.local`로 복사해 `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`를 채웁니다. 서비스 역할 키는 절대 브라우저 환경 변수에 넣지 않습니다.
4. `npm run dev`로 로그인·Inbox·Case 변경을 확인합니다.

첫 파일럿은 가상 데이터만 사용합니다. 고객 로그인, 공개 가입, 첨부 파일, 실시간 구독과 외부 메신저/Jira 연동은 아직 제공하지 않습니다.

## 배포

Cloudflare Pages에서 저장소를 연결하고 Build command는 `npm run build`, output directory는 `dist`로 설정합니다. 환경 변수는 Pages 대시보드에만 넣고 Git에 커밋하지 않습니다.

## 파일럿 경계

- Supabase 연결 전의 로컬 데모 상태는 브라우저에만 저장됩니다.
- Supabase 연결 후에는 워크스페이스 단위 RLS 정책이 데이터를 분리합니다.
- 실시간 메시지와 고객 포털은 다음 검증 단계의 범위입니다.
