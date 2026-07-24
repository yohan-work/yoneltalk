export const find = (items, id) => items.find((item) => item.id === id);

export const esc = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
})[char]);

export const status = (value) => ({
  New: '신규', Open: '진행 중', Resolved: '해결됨', Closed: '종료됨',
  'Waiting for customer': '고객 답변 대기', 'Waiting for team': '팀 답변 대기',
  Investigating: '조사 중', Identified: '원인 확인', Monitoring: '모니터링',
  Triage: '분류 대기', Planned: '개발 예정', Fixed: '수정 완료', Released: '배포 완료',
}[value] || value);

export const openCase = (item) => !['Resolved', 'Closed'].includes(item.status);

export const latestUpdate = (incident) => incident?.updates?.slice()
  .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];

export const sla = (item, now) => {
  if (!openCase(item)) return ['완료', 'blue'];
  const minutes = Math.round((new Date(item.slaDueAt) - now) / 60000);
  if (minutes < 0) return [`${Math.abs(minutes)}분 초과`, 'red'];
  if (minutes <= 60) return [`${minutes}분 남음`, 'amber'];
  return [`${Math.ceil(minutes / 60)}시간 남음`, 'blue'];
};
