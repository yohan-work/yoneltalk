export const NOW = new Date('2026-07-23T10:00:00Z');

export const data = {
  members: [
    { id: 'm-alex', name: 'Alex Kim', initials: 'AK', role: 'Support engineer', teamIds: ['t-support', 't-platform'] },
    { id: 'm-jamie', name: 'Jamie Park', initials: 'JP', role: 'Support engineer', teamIds: ['t-platform'] },
  ],
  teams: [{ id: 't-support', name: 'General Support' }, { id: 't-platform', name: 'Platform Team' }],
  organizations: [
    { id: 'o-acme', name: 'Acme Corp', domain: 'acme.example', industry: 'Commerce', country: 'Germany', plan: 'Enterprise', contractTier: 'Premier', csmName: 'Sofia Lee', workspaceNames: ['Acme Production'], productNames: ['Public API', 'Identity'], monthlyUsage: '18.4M requests', accountStatus: 'Active' },
    { id: 'o-nimbus', name: 'Nimbus Labs', domain: 'nimbus.example', industry: 'Developer tools', country: 'United States', plan: 'Business', contractTier: 'Standard', csmName: 'Sofia Lee', workspaceNames: ['Nimbus Cloud'], productNames: ['Identity'], monthlyUsage: '2.1M requests', accountStatus: 'Active' },
  ],
  customers: [
    { id: 'u-maya', organizationId: 'o-acme', name: 'Maya Chen', email: 'maya@acme.example', role: 'Platform engineer', language: 'English', timezone: 'UTC+1', userId: 'maya-184', joinedAt: '2025-04-03', lastSeenAt: '2026-07-23T09:42:00Z' },
    { id: 'u-noah', organizationId: 'o-nimbus', name: 'Noah Patel', email: 'noah@nimbus.example', role: 'IT administrator', language: 'English', timezone: 'UTC-7', userId: 'noah-682', joinedAt: '2025-11-15', lastSeenAt: '2026-07-23T09:12:00Z' },
  ],
  conversations: [
    { id: 'conv-1048', customerId: 'u-maya', organizationId: 'o-acme', caseId: 'case-1048', incidentId: 'inc-203', engineeringIssueId: 'prod-1842', title: 'API requests returning 502 in EU-West', type: 'Technical issue', status: 'Open', priority: 'High', assigneeId: 'm-alex', teamId: 't-platform', tagIds: ['api', 'eu-west'], createdAt: '2026-07-23T09:42:00Z', updatedAt: '2026-07-23T09:49:00Z', technical: { product: 'Public API', environment: 'Production', region: 'EU-West', version: 'API v3', errorCode: '502', requestId: 'req_89a21', occurredAt: '2026-07-23T09:28:00Z', impact: 'EU customers cannot complete checkout.', reproductionSteps: 'POST /v3/checkout returns 502.' }, messages: [{ from: 'Maya Chen', type: 'customer', time: '09:42', text: '최근 배포 이후 EU-West Public API 요청에서 502 응답이 발생하고 있습니다.' }, { from: 'Alex Kim', type: 'internal', time: '09:49', text: 'Platform Team에 오류 확인을 요청했습니다.' }] },
    { id: 'conv-1047', customerId: 'u-noah', organizationId: 'o-nimbus', caseId: null, incidentId: null, title: 'SCIM sync has stopped', type: 'Account and access', status: 'Waiting for team', priority: 'High', assigneeId: 'm-jamie', teamId: 't-platform', tagIds: ['scim'], createdAt: '2026-07-23T09:12:00Z', updatedAt: '2026-07-23T09:12:00Z', technical: { product: 'Identity', environment: 'Production', region: 'US-East', version: 'v2', errorCode: '', requestId: '', occurredAt: '2026-07-23T08:50:00Z', impact: 'New employees are not provisioned.', reproductionSteps: 'Rotate SCIM token, then run sync.' }, messages: [{ from: 'Noah Patel', type: 'customer', time: '09:12', text: '토큰 교체 이후 SCIM 프로비저닝이 중단되었습니다.' }] },
  ],
  cases: [{ id: 'case-1048', conversationId: 'conv-1048', customerId: 'u-maya', organizationId: 'o-acme', incidentId: 'inc-203', engineeringIssueId: 'prod-1842', title: 'API requests returning 502 in EU-West', type: 'Technical issue', product: 'Public API', environment: 'Production', priority: 'High', severity: 'S2', status: 'Open', assigneeId: 'm-alex', teamId: 't-platform', slaDueAt: '2026-07-23T10:42:00Z', resolution: '', createdAt: '2026-07-23T09:42:00Z', updatedAt: '2026-07-23T09:49:00Z', activity: [{ time: '09:49', text: 'Alex Kim이 Platform Team에 에스컬레이션했습니다.' }, { time: '09:48', text: 'Alex Kim이 Case를 생성했습니다.' }] }],
  incidents: [{ id: 'inc-203', title: 'EU-West API latency', status: 'Investigating', severity: 'S2', affectedProducts: ['Public API'], affectedRegions: ['EU-West'], ownerTeamId: 't-platform', startedAt: '2026-07-23T09:28:00Z', resolvedAt: null, updates: [{ id: 'upd-1', status: 'Investigating', message: 'EU-West에서 API 오류율 증가를 조사하고 있습니다.', createdAt: '2026-07-23T09:45:00Z', authorId: 'm-alex' }] }],
  articles: [
    { id: 'art-api-5xx', title: 'API 5xx troubleshooting', summary: 'API 5xx 오류의 초기 점검 절차', body: 'Request ID, 리전, 발생 시각을 수집하고 상태 페이지를 확인합니다.', category: 'Troubleshooting', language: 'English', relatedProducts: ['Public API'], visibility: 'Public', url: 'https://help.relaydesk.example/api-5xx', updatedAt: '2026-07-20', authorId: 'm-alex' },
    { id: 'art-scim', title: 'SCIM token rotation runbook', summary: 'SCIM 토큰 교체 후 점검 순서', body: '새 토큰의 권한과 동기화 로그를 확인합니다.', category: 'Product guide', language: 'English', relatedProducts: ['Identity'], visibility: 'Internal', url: 'https://help.relaydesk.example/scim-runbook', updatedAt: '2026-07-18', authorId: 'm-jamie' },
    { id: 'art-release', title: 'API v3 release notes draft', summary: '다음 API 배포 초안', body: 'Draft release notes.', category: 'Release notes', language: 'English', relatedProducts: ['Public API'], visibility: 'Draft', url: 'https://help.relaydesk.example/api-v3-draft', updatedAt: '2026-07-22', authorId: 'm-alex' },
  ],
  analyticsBenchmarks: { firstResponse: '12분', resolution: '4.2시간', slaCompliance: '94%' },
};
