import type { SupportCase, WorkspaceData } from './types';

export function workspaceMetrics(data: WorkspaceData) {
  const open = (item: SupportCase) => !['Resolved', 'Closed'].includes(item.status);
  return { openCases: data.cases.filter(open).length, activeIncidents: data.incidents.filter(item => item.status !== 'Resolved').length, incidentLinkedCases: data.cases.filter(item => item.incident_id).length, criticalCases: data.cases.filter(item => ['S1', 'S2'].includes(item.severity)).length };
}
