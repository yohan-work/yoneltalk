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

export function createEngineeringIssue(caseId, input) {
  const item = find(data.cases, caseId);
  if (item.engineeringIssueId) return item.engineeringIssueId;
  const conversation = find(data.conversations, item.conversationId);
  const id = `prod-${Date.now()}`;
  const messages = conversation.messages.filter((message) => (message.type === 'internal' ? input.includeInternal : input.includeCustomer));
  data.engineeringIssues.unshift({
    id, caseId, conversationId: conversation.id, incidentId: item.incidentId,
    title: input.title, status: 'Triage', priority: input.priority, teamId: input.teamId,
    assigneeId: null, technicalSnapshot: { ...conversation.technical },
    includedMessageIds: messages.filter((message) => message.type !== 'internal').map((message) => message.time),
    includedInternalNoteIds: messages.filter((message) => message.type === 'internal').map((message) => message.time),
    activity: [{ time: '방금', text: 'Alex Kim이 Support Case에서 개발 이슈를 생성했습니다.' }],
    createdAt: NOW.toISOString(), updatedAt: NOW.toISOString(),
  });
  item.engineeringIssueId = id;
  conversation.engineeringIssueId = id;
  item.activity.unshift({ time: '방금', text: `Alex Kim이 ${id.toUpperCase()} 개발 이슈를 생성했습니다.` });
  return id;
}

export function updateEngineeringIssue(issueId, field, value) {
  const item = find(data.engineeringIssues, issueId);
  const previous = item[field];
  item[field] = value;
  item.updatedAt = NOW.toISOString();
  const label = { status: '상태', assigneeId: '담당자', priority: '우선순위' }[field] || field;
  item.activity.unshift({ time: '방금', text: `Jamie Park이 ${label}를 ${previous || '미배정'} → ${value}로 변경했습니다.` });
  const supportCase = find(data.cases, item.caseId);
  supportCase.activity.unshift({ time: '방금', text: `${item.id.toUpperCase()} 개발 이슈의 ${label}가 변경되었습니다.` });
}
