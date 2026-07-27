export type Role = 'admin' | 'agent';
export type CaseStatus = 'New' | 'Open' | 'Waiting for customer' | 'Waiting for team' | 'Resolved' | 'Closed';
export type Conversation = { id: string; title: string; status: CaseStatus; priority: 'High' | 'Medium' | 'Low'; customer_name: string; organization_name: string; technical: Record<string, string>; assignee_name?: string | null; updated_at: string };
export type Message = { id: string; conversation_id: string; body: string; kind: 'customer' | 'agent' | 'internal'; author_name: string; created_at: string };
export type SupportCase = { id: string; conversation_id: string; title: string; status: CaseStatus; severity: 'S1' | 'S2' | 'S3' | 'S4'; priority: 'High' | 'Medium' | 'Low'; incident_id?: string | null; assignee_name?: string | null; updated_at: string };
export type Incident = { id: string; title: string; status: 'Investigating' | 'Identified' | 'Monitoring' | 'Resolved'; severity: 'S1' | 'S2' | 'S3' | 'S4'; updated_at: string };
export type WorkspaceData = { conversations: Conversation[]; cases: SupportCase[]; incidents: Incident[] };
