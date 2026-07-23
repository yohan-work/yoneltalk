export const state = {
  mode: 'agent',
  customerStep: 'home',
  activeAgentMenu: 'inbox',
  inboxQueue: 'all',
  selectedConversationId: 'conv-1048',
  selectedCaseId: 'case-1048',
  filters: { query: '', status: '', severity: '', incident: '' },
  composerMode: 'reply',
  composerText: '',
  toast: '',
};

export const setState = (patch) => Object.assign(state, patch);
