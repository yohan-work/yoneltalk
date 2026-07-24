import { data, NOW } from './data.js';
import { find } from './utils.js';

export function createCaseFromConversation(conversationId) {
  const conversation = find(data.conversations, conversationId);
  if (conversation.caseId) return conversation.caseId;
  const id = `case-${Date.now()}`;
  data.cases.unshift({
    id, conversationId: conversation.id, customerId: conversation.customerId,
    organizationId: conversation.organizationId, incidentId: conversation.incidentId,
    title: conversation.title, type: conversation.type, product: conversation.technical.product,
    environment: conversation.technical.environment, priority: conversation.priority,
    severity: 'S3', status: 'New', assigneeId: conversation.assigneeId,
    teamId: conversation.teamId, slaDueAt: '2026-07-23T14:00:00Z', resolution: '',
    createdAt: NOW.toISOString(), updatedAt: NOW.toISOString(),
    activity: [{ time: '방금', text: 'Alex Kim이 Inbox 대화에서 Case를 생성했습니다.' }],
  });
  conversation.caseId = id;
  return id;
}

export function updateCase(caseId, field, value) {
  const item = find(data.cases, caseId);
  const previous = item[field];
  item[field] = value;
  item.updatedAt = NOW.toISOString();
  const label = { status: '상태', severity: '심각도', assigneeId: '담당자' }[field] || field;
  item.activity.unshift({ time: '방금', text: `Alex Kim이 ${label}를 ${previous || '미배정'} → ${value}로 변경했습니다.` });
}

export function setCaseIncident(caseId, incidentId) {
  const item = find(data.cases, caseId);
  const conversation = find(data.conversations, item.conversationId);
  item.incidentId = incidentId;
  conversation.incidentId = incidentId;
  item.activity.unshift({ time: '방금', text: `Alex Kim이 ${incidentId ? incidentId.toUpperCase() : 'Incident'} 연결을 ${incidentId ? '변경했습니다.' : '해제했습니다.'}` });
}
