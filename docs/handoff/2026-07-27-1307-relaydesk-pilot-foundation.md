# Handoff: RelayDesk 파일럿 워크스페이스 전환

- ID: 2026-07-27-1307-relaydesk-pilot-foundation
- 상태: 부분 완료
- 기록 시각: 2026-07-27 13:07 KST
- 관련 Socratic: [2026-07-27-1307-relaydesk-pilot-foundation](../socratic/2026-07-27-1307-relaydesk-pilot-foundation.md)

## 목표와 결과

- 목표: 기존 프론트엔드 데모를 실제 내부 파일럿을 위한 영속 워크스페이스 기반으로 전환한다.
- 결과: React/TypeScript 앱, Supabase 스키마와 RLS, 로컬 데모 폴백, Case·메시지 작업, 단위 테스트와 배포 문서를 추가했다.

## 변경 사항

- `src/RelayDeskApp.tsx`, `src/repository.ts`: 로그인, Inbox, 메시지·내부 메모, Case·Incident 변경, 분석 화면을 추가했다.
- `supabase/migrations/202607270001_initial_workspace.sql`: 멀티 워크스페이스 데이터 모델, RLS, 메시지·Case RPC, 활동 이력을 추가했다.
- `package.json`, `README.md`: Vite 도구체인, 테스트, Supabase·Cloudflare Pages 파일럿 설정을 추가했다.

## 검증 증거

- `npm run test` → Vitest 1개 테스트 성공.
- `npm run build` → TypeScript 검사와 Vite 프로덕션 빌드 성공.
- `git diff --check` → 출력 없음.

## 미검증 및 차단 요인

- 실제 Supabase 프로젝트에 SQL을 적용하지 않았으므로 원격 RLS·RPC 동작은 미검증이다.
- 실제 파일럿 계정, Cloudflare Pages 배포, 브라우저 수동 사용성 검증은 실행하지 않았다.

## 다음 세션 재개 순서

1. `supabase/migrations/202607270001_initial_workspace.sql`을 프로젝트 SQL Editor에서 적용한다.
2. `README.md`의 Supabase 설정 절차대로 테스트 계정과 `.env.local`을 준비한다.
3. `npm run dev`로 로그인, 메시지 전송, Case 생성·상태 변경을 확인한다.
4. 성공 후 Cloudflare Pages에 `npm run build` / `dist` 설정으로 배포한다.
