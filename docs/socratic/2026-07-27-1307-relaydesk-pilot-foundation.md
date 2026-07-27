# Socratic: RelayDesk 파일럿 워크스페이스 전환

- ID: 2026-07-27-1307-relaydesk-pilot-foundation
- 상태: 부분 완료
- 관련 Handoff: [2026-07-27-1307-relaydesk-pilot-foundation](../handoff/2026-07-27-1307-relaydesk-pilot-foundation.md)

## 질문과 확인된 사실

| 질문 | 답 | 상태 | 근거 |
| --- | --- | --- | --- |
| 기존 앱이 실제 데이터를 보존하는가? | 아니다. 기존 상태는 `src/data.js`의 메모리 데이터였다. | 확인됨 | `README.md`, 기존 `src/data.js` |
| 파일럿에 필요한 최소 업무 흐름은 무엇인가? | Inbox 메시지, 내부 메모, Case 생성·상태 변경, Incident 연결, 집계 지표다. | 확인됨 | `docs/goal/260723_relaydesk_product_goal.md` |
| 새 앱이 빌드되는가? | React/TypeScript 프로덕션 빌드가 성공했다. | 확인됨 | `npm run build` |
| Supabase 정책이 실제 프로젝트에서 동작하는가? | 아직 실제 Supabase 프로젝트에 적용하지 않았다. | 미확인 | 자격 증명 미제공 |

## 판단

- 확인됨: `src/RelayDeskApp.tsx`와 `src/repository.ts`는 설정된 Supabase와 로컬 데모를 분리한다.
- 추론: 내부 테스트 계정과 가상 데이터를 사용하는 파일럿에는 이메일 발송·고객 포털을 먼저 만들지 않는 편이 적절하다.
- 미확인: SQL 마이그레이션의 원격 적용, RLS 격리, 실제 브라우저 흐름이다.

## 다음 계획

1. Supabase SQL을 적용하고 테스트 사용자·워크스페이스를 생성한다 — 의존성: Supabase 프로젝트 — 확인 방법: 로그인 및 다른 워크스페이스 접근 차단 확인.
2. 대표 EU-West API 502 흐름을 수동 점검한다 — 의존성: `.env.local` — 확인 방법: `npm run dev`.
3. 파일럿 피드백으로 고객 포털·실시간 갱신·첨부 중 다음 우선순위를 결정한다 — 확인 방법: 2~5명 지원팀 사용 관찰.

## 중단 또는 방향 전환 조건

- 내부 파일럿에서 Case·Incident 연결이 사용되지 않으면 범용 메신저 기능 확장보다 지원 워크플로우의 가치 가설을 재검토한다.
