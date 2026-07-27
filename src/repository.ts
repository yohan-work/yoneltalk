import { supabase } from './supabase';
import type { Conversation, Incident, Message, SupportCase, WorkspaceData } from './types';

const key = 'relaydesk-demo-v1';
const demo: WorkspaceData = {
  conversations: [{ id: 'conv-demo-1', title: 'API requests returning 502 in EU-West', status: 'Open', priority: 'High', customer_name: 'Maya Chen', organization_name: 'Acme Corp', assignee_name: 'Alex Kim', technical: { product: 'Public API', environment: 'Production', region: 'EU-West', errorCode: '502', requestId: 'req_89a21' }, updated_at: new Date().toISOString() }],
  cases: [{ id: 'case-demo-1', conversation_id: 'conv-demo-1', title: 'API requests returning 502 in EU-West', status: 'Open', severity: 'S2', priority: 'High', incident_id: 'inc-demo-1', assignee_name: 'Alex Kim', updated_at: new Date().toISOString() }],
  incidents: [{ id: 'inc-demo-1', title: 'EU-West API latency', status: 'Investigating', severity: 'S2', updated_at: new Date().toISOString() }]
};

function local(): WorkspaceData { return JSON.parse(localStorage.getItem(key) || JSON.stringify(demo)); }
function save(data: WorkspaceData) { localStorage.setItem(key, JSON.stringify(data)); }

export async function loadWorkspace(): Promise<WorkspaceData> {
  if (!supabase) return local();
  const [conversations, cases, incidents] = await Promise.all([
    supabase.from('conversation_list').select('*').order('updated_at', { ascending: false }),
    supabase.from('case_list').select('*').order('updated_at', { ascending: false }),
    supabase.from('incidents').select('*').order('updated_at', { ascending: false })
  ]);
  if (conversations.error || cases.error || incidents.error) throw new Error(conversations.error?.message || cases.error?.message || incidents.error?.message || '데이터를 불러올 수 없습니다.');
  return { conversations: conversations.data as Conversation[], cases: cases.data as SupportCase[], incidents: incidents.data as Incident[] };
}

export async function loadMessages(conversationId: string): Promise<Message[]> {
  if (!supabase) return [{ id: 'msg-demo-1', conversation_id: conversationId, kind: 'customer', author_name: 'Maya Chen', body: '최근 배포 이후 API 요청에서 502 응답이 발생합니다.', created_at: new Date().toISOString() }];
  const { data, error } = await supabase.from('messages').select('id, conversation_id, kind, body, created_at, profiles!messages_author_id_fkey(display_name)').eq('conversation_id', conversationId).order('created_at');
  if (error) throw error;
  return data.map((item: any) => ({ ...item, author_name: item.profiles?.display_name || 'Customer' }));
}

export async function sendMessage(conversationId: string, body: string, kind: 'agent' | 'internal') {
  if (!supabase) return;
  const { error } = await supabase.rpc('add_message', { p_conversation_id: conversationId, p_body: body, p_kind: kind });
  if (error) throw error;
}
export async function createCase(conversation: Conversation) {
  if (!supabase) { const d = local(); if (!d.cases.some(c => c.conversation_id === conversation.id)) d.cases.unshift({ id: crypto.randomUUID(), conversation_id: conversation.id, title: conversation.title, status: 'New', severity: 'S3', priority: conversation.priority, assignee_name: null, updated_at: new Date().toISOString() }); save(d); return; }
  const { error } = await supabase.rpc('create_case_from_conversation', { p_conversation_id: conversation.id }); if (error) throw error;
}
export async function updateCase(id: string, patch: Partial<Pick<SupportCase, 'status' | 'severity' | 'incident_id'>>) {
  if (!supabase) { const d = local(); const item = d.cases.find(c => c.id === id); if (item) Object.assign(item, patch, { updated_at: new Date().toISOString() }); save(d); return; }
  const { error } = await supabase.from('cases').update(patch).eq('id', id); if (error) throw error;
}
