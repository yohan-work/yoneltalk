export const NOW = new Date('2026-07-23T10:00:00Z');

export const data = {
  members: [
    { id: 'm-alex', name: 'Alex Kim', initials: 'AK' },
    { id: 'm-jamie', name: 'Jamie Park', initials: 'JP' },
  ],
  teams: [
    { id: 't-support', name: 'General Support' },
    { id: 't-platform', name: 'Platform Team' },
  ],
  organizations: [
    { id: 'o-acme', name: 'Acme Corp', plan: 'Enterprise', workspace: 'Acme Production' },
    { id: 'o-nimbus', name: 'Nimbus Labs', plan: 'Business', workspace: 'Nimbus Cloud' },
  ],
  customers: [
    { id: 'u-maya', organizationId: 'o-acme', name: 'Maya Chen', email: 'maya@acme.example', timezone: 'UTC+1' },
    { id: 'u-noah', organizationId: 'o-nimbus', name: 'Noah Patel', email: 'noah@nimbus.example', timezone: 'UTC-7' },
  ],
  conversations: [
    { id: 'conv-1048', customerId: 'u-maya', organizationId: 'o-acme', caseId: 'case-1048', incidentId: 'inc-203', title: 'API requests returning 502 in EU-West', type: 'Technical issue', status: 'Open', priority: 'High', assigneeId: 'm-alex', teamId: 't-platform', createdAt: '2026-07-23T09:42:00Z', technical: { product: 'Public API', environment: 'Production', region: 'EU-West', version: 'API v3', errorCode: '502', requestId: 'req_89a21', impact: 'EU customers cannot complete checkout.' }, messages: [{ from: 'Maya Chen', type: 'customer', time: '09:42', text: '최근 배포 이후 EU-West Public API 요청에서 502 응답이 발생하고 있습니다.' }, { from: 'Alex Kim', type: 'internal', time: '09:49', text: 'Platform Team에 오류 확인을 요청했습니다.' }] },
    { id: 'conv-1047', customerId: 'u-noah', organizationId: 'o-nimbus', caseId: null, incidentId: null, title: 'SCIM sync has stopped', type: 'Account and access', status: 'Waiting for team', priority: 'High', assigneeId: 'm-jamie', teamId: 't-platform', createdAt: '2026-07-23T09:12:00Z', technical: { product: 'Identity', environment: 'Production', region: 'US-East', version: 'v2', errorCode: '', requestId: '', impact: 'New employees are not provisioned.' }, messages: [{ from: 'Noah Patel', type: 'customer', time: '09:12', text: '토큰 교체 이후 SCIM 프로비저닝이 중단되었습니다.' }] },
  ],
  cases: [
    { id: 'case-1048', conversationId: 'conv-1048', customerId: 'u-maya', organizationId: 'o-acme', incidentId: 'inc-203', title: 'API requests returning 502 in EU-West', product: 'Public API', environment: 'Production', priority: 'High', severity: 'S2', status: 'Open', assigneeId: 'm-alex', teamId: 't-platform', slaDueAt: '2026-07-23T10:42:00Z', createdAt: '2026-07-23T09:42:00Z', activity: [{ time: '09:49', text: 'Platform Team에 에스컬레이션했습니다.' }, { time: '09:48', text: 'Case를 생성했습니다.' }] },
  ],
  incidents: [{ id: 'inc-203', title: 'EU-West API latency', status: 'Investigating', severity: 'S2', ownerTeamId: 't-platform' }],
};
