# Socratic: 프론트엔드 보완 사항 검토

- ID: 2026-07-24-0949-frontend-gap-review
- 상태: 완료
- 관련 Handoff: [2026-07-24-0949-frontend-gap-review](../handoff/2026-07-24-0949-frontend-gap-review.md)

## 질문과 확인된 사실

| 질문 | 답 | 상태 | 근거 |
| --- | --- | --- | --- |
| 현재 고객 문의 입력은 기술 맥락을 충분히 수집하는가? | 제품·환경·리전·버전·오류·Request ID·영향·재현 절차·메시지를 입력받지만 첨부파일 입력은 없다. | 확인됨 | `src/app.js`의 `customerView`, `docs/goal/260723_relaydesk_product_goal.md` §4·§6 |
| 목록 검색은 연속 입력이 가능한가? | `input` 이벤트가 필터 변경 후 전체 `render()`를 호출하므로, DOM 교체에 따라 검색 입력의 포커스가 사라질 수 있다. | 추론 | `src/app.js`의 `document.addEventListener('input', ...)`, `render()` |
| 작은 화면에서 운영 메뉴에 접근할 수 있는가? | 760px 이하에서 agent nav, sidebar, context를 모두 숨기며 대체 메뉴가 없다. | 확인됨 | `styles.css`의 `@media (max-width:760px)` |
| SLA·운영 지표가 현재 시각을 반영하는가? | SLA 계산은 고정된 `NOW`를 기준으로 한다. | 확인됨 | `src/data.js`의 `NOW`, `src/app.js`의 `caseSla` |
| 데이터와 화면 책임이 충분히 분리됐는가? | 데이터·상태·행위는 모듈로 분리됐지만 모든 메뉴 뷰·이벤트 위임·렌더링은 `src/app.js`에 집중돼 있다. | 확인됨 | `src/app.js`, `src/actions.js`, `src/state.js`, `src/data.js`, `src/utils.js` |

## 판단

- 확인됨: Core flow(고객 문의, Inbox, Case, Customer, Organization, Incident, Knowledge, Analytics)는 현재 구현돼 있다.
- 추론: 다음 스프린트는 화면 수를 늘리기보다 입력 흐름의 완결성, 검색/모바일 접근성, 운영 데이터의 신뢰성을 우선하는 것이 제품 목표에 더 직접적이다.
- 미확인: 실제 브라우저에서 키보드 탐색, 화면 리플로우, 필터 연속 입력을 수동 검증하지 않았다.

## 다음 계획

1. 검색 입력의 DOM 교체·포커스 동작을 브라우저에서 확인하고 부분 업데이트 또는 포커스 복원으로 수정한다 — 근거/의존성: `src/app.js` — 확인 방법: 검색어를 연속 입력해 필터 결과와 포커스를 확인한다.
2. 모바일 운영 화면의 목록/상세 전환과 대체 내비게이션을 설계한다 — 근거/의존성: `styles.css` — 확인 방법: 760px 이하 뷰포트에서 모든 메뉴에 이동한다.
3. 첨부파일, 자동 분류/초안, 실제 시간·저장소 연동의 도입 순서를 제품 검증 목표와 함께 결정한다 — 근거/의존성: 제품 목표 문서 — 확인 방법: 우선순위 스프린트 정의.

## 중단 또는 방향 전환 조건

- 사용자 인터뷰에서 Case/Incident 흐름 이해가 주요 문제로 확인되면 자동화보다 해당 전환 경험의 안내·가시성을 우선한다.
