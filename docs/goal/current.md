# 현재 목표

- 상태: 부분 완료
- 마지막 갱신: 2026-07-27 13:07 KST
- 현재 작업 단위: RelayDesk 파일럿 워크스페이스 전환

## 목표와 성공 기준

- 목표: 메모리 기반 지원 데모를 내부 테스트 계정용 영속 지원 워크스페이스 기반으로 전환한다.
- 성공 기준: React 앱이 빌드되고, Supabase 스키마/RLS와 Inbox·Case·Incident 핵심 흐름이 구현되며, 파일럿 설정 방법이 문서화된다.

## 범위와 확정된 결정

- 포함: React/TypeScript 전환, Supabase Auth·Postgres·RLS, 로컬 데모 폴백, Case/메시지 영속화, Cloudflare Pages 설정 문서.
- 제외: 고객 로그인, 실시간 구독, 첨부 파일, 실제 Slack/Jira 연동, 실제 Supabase 프로젝트 생성·배포.
- 결정: 첫 파일럿은 내부 지원팀과 가상 데이터만 사용하며, 환경 변수가 없을 때만 브라우저 로컬 데모로 동작한다.

## 현재 상태

- 완료: 앱 기반, SQL 마이그레이션, 단위 테스트, 프로덕션 빌드, 파일럿 운영 문서를 추가했다.
- 진행 중: 실제 Supabase 프로젝트에 마이그레이션과 파일럿 계정을 적용해야 한다.
- 차단 요인 또는 미검증: 실제 Supabase 연결·RLS 정책 실행과 브라우저 수동 사용성 검증은 프로젝트 자격 증명이 없어 실행하지 않았다.

## 마지막 체크포인트

- Handoff: [2026-07-27-1307-relaydesk-pilot-foundation](../handoff/2026-07-27-1307-relaydesk-pilot-foundation.md)
- Socratic: [2026-07-27-1307-relaydesk-pilot-foundation](../socratic/2026-07-27-1307-relaydesk-pilot-foundation.md)

## 재개 지점

1. Supabase 프로젝트에 `supabase/migrations/202607270001_initial_workspace.sql`을 적용한다.
2. 내부 파일럿 사용자에 `profiles`와 `memberships`를 부여하고 `.env.local`을 설정한다.
3. `npm run dev`에서 로그인, 메시지, Case 상태·Incident 연결을 수동 검증한다.
