import { describe, expect, it } from 'vitest';
import { workspaceMetrics } from './metrics';

describe('workspaceMetrics', () => {
  it('counts only active cases and incidents', () => {
    expect(workspaceMetrics({ conversations: [], cases: [{ id: 'a', conversation_id: 'a', title: 'A', status: 'Open', severity: 'S2', priority: 'High', incident_id: 'i', updated_at: '' }, { id: 'b', conversation_id: 'b', title: 'B', status: 'Resolved', severity: 'S4', priority: 'Low', updated_at: '' }], incidents: [{ id: 'i', title: 'I', status: 'Investigating', severity: 'S2', updated_at: '' }] })).toEqual({ openCases: 1, activeIncidents: 1, incidentLinkedCases: 1, criticalCases: 1 });
  });
});
