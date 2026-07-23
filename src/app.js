import { data, NOW } from './data.js';
import { state, setState } from './state.js';

const app = document.querySelector('#app');
const find = (items, id) => items.find((item) => item.id === id);
const esc = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;' })[char]);
const koStatus = (status) => ({ New:'신규', Open:'진행 중', Resolved:'해결됨', Closed:'종료됨', 'Waiting for customer':'고객 답변 대기', 'Waiting for team':'팀 답변 대기' }[status] || status);
const badge = (text, tone = 'blue') => '<span class="badge ' + tone + '">' + text + '</span>';
const menus = [['inbox','인박스'],['cases','케이스'],['customers','고객'],['organizations','조직'],['incidents','Incident'],['knowledge','지식'],['analytics','분석']];

function nav() {
  return '<nav class="nav">' + menus.map(([id, label]) => '<button class="nav-item ' + (state.activeAgentMenu === id ? 'active' : '') + '" data-action="menu" data-id="' + id + '">' + label + '</button>').join('') + '</nav>';
}
function shell(content) {
  return '<div class="app-shell"><header class="topbar"><div class="brand"><span class="brand-mark">R</span>RelayDesk</div><div class="mode-switch"><button class="' + (state.mode === 'customer' ? 'active' : '') + '" data-action="mode" data-id="customer">고객 화면</button><button class="' + (state.mode === 'agent' ? 'active' : '') + '" data-action="mode" data-id="agent">지원 워크스페이스</button></div><div class="avatar">AK</div></header>' + content + (state.toast ? '<div class="toast">' + state.toast + '</div>' : '') + '</div>';
}
function customerView() {
  if(state.customerStep==='form') return '<main class="customer-wrap"><button class="back" data-action="customer-step" data-id="home">← 이전</button><div class="eyebrow">TECHNICAL ISSUE</div><h1>Tell us what happened</h1><p class="muted">조사를 빠르게 진행할 수 있도록 워크스페이스 정보를 미리 입력했습니다.</p><div class="grid-2"><div class="field"><label>제품</label><input value="Public API"></div><div class="field"><label>환경</label><input value="Production"></div></div><div class="grid-2"><div class="field"><label>리전</label><input value="EU-West"></div><div class="field"><label>오류 코드</label><input value="502"></div></div><div class="field"><label>어떤 문제가 발생했나요?</label><textarea>최근 배포 이후 API 요청에서 502 응답이 발생합니다.</textarea></div><button class="primary" data-action="submit-request">문의 보내기</button></main>';
  if(state.customerStep==='chat') { const c=find(data.conversations,state.selectedConversationId); return '<main class="customer-wrap"><button class="back" data-action="customer-step" data-id="home">← 모든 대화</button><div class="eyebrow">NEW REQUEST</div><h1>'+esc(c.title)+'</h1><div class="message-status"><strong>'+koStatus(c.status)+'</strong> · 기술 지원팀이 확인 중입니다.</div><div class="chat">'+c.messages.filter((m)=>m.type!=='internal').map((m)=>'<div class="bubble customer">'+esc(m.text)+'</div><div class="message-meta">'+m.from+' · '+m.time+'</div>').join('')+'</div></main>'; }
  return '<main class="customer-wrap"><div class="eyebrow">RELAYDESK SUPPORT</div><h1>How can we help?</h1><p class="muted">워크스페이스, 제품 또는 계정에 관해 도움을 드립니다.</p><div class="card status-card"><span class="status-dot"></span><div><strong>모든 시스템이 정상 운영 중입니다</strong><span class="muted">현재 진행 중인 장애가 없습니다.</span></div></div><div class="section-title">추천 도움말</div><div class="card"><div class="article"><div><strong>API 서비스 상태 확인</strong><br><span>현재 장애 및 점검 일정</span></div><span>›</span></div></div><div class="customer-cta"><button class="primary" data-action="customer-step" data-id="form">지원팀에 문의하기</button></div></main>';
}
function inboxView() {
  const queue = state.inboxQueue === 'mine' ? data.conversations.filter((c) => c.assigneeId === 'm-alex') : data.conversations;
  const selected = queue.find((c) => c.id === state.selectedConversationId) || queue[0];
  const list = queue.map((c) => {
    const customer = find(data.customers, c.customerId);
    const org = find(data.organizations, c.organizationId);
    return '<button class="conversation ' + (c.id === selected.id ? 'active' : '') + '" data-action="conversation" data-id="' + c.id + '"><div class="row"><strong>' + customer.name + '</strong>' + badge(c.priority === 'High' ? '높음' : '보통', c.priority === 'High' ? 'red' : 'blue') + '</div><small>' + org.name + '</small><p>' + esc(c.title) + '</p><div class="row">' + badge(koStatus(c.status)) + '<small>' + (c.caseId ? c.caseId.toUpperCase() : '케이스 없음') + '</small></div></button>';
  }).join('');
  if (!selected) return '<main class="agent-shell"><aside class="sidebar">' + nav() + '</aside><aside class="sidebar"><div class="sidebar-head"><h2>Inbox</h2><div class="queue-tabs"><button data-action="inbox-queue" data-id="all">진행 중 전체</button><button class="active" data-action="inbox-queue" data-id="mine">내 담당</button></div><div class="empty-state"><strong>내 담당 대화가 없습니다</strong><p>새 대화를 나에게 배정하면 이곳에 표시됩니다.</p></div></div></aside><section class="detail"></section></main>';
  const customer = find(data.customers, selected.customerId);
  const org = find(data.organizations, selected.organizationId);
  const messages = selected.messages.map((m) => '<div class="thread-message ' + (m.type === 'internal' ? 'internal' : '') + '"><div class="avatar">' + m.from.split(' ').map((x) => x[0]).join('').slice(0,2) + '</div><div class="content"><strong>' + m.from + '</strong>' + (m.type === 'internal' ? '<span class="internal-label"> · 내부 메모</span>' : '') + '<p>' + esc(m.text) + '</p><span class="muted">' + m.time + '</span></div></div>').join('');
  return '<main class="agent-shell"><aside class="sidebar">' + nav() + '</aside><aside class="sidebar"><div class="sidebar-head"><div class="row"><h2>Inbox</h2><span class="muted">' + queue.length + '건</span></div><div class="queue-tabs"><button class="' + (state.inboxQueue === 'all' ? 'active' : '') + '" data-action="inbox-queue" data-id="all">진행 중 전체</button><button class="' + (state.inboxQueue === 'mine' ? 'active' : '') + '" data-action="inbox-queue" data-id="mine">내 담당</button></div></div>' + list + '</aside><section class="detail"><div class="detail-head"><h2>' + esc(selected.title) + '</h2><div class="meta">' + (selected.caseId ? '<button class="link-button" data-action="open-case" data-id="' + selected.caseId + '">' + selected.caseId.toUpperCase() + ' 보기</button>' : '<button class="link-button" data-action="create-case" data-id="' + selected.id + '">지원 케이스 생성</button>') + ' · ' + koStatus(selected.status) + '</div></div><div class="thread">' + messages + '</div><div class="composer-agent"><div class="composer-type"><button class="active">답장</button><button>내부 메모</button></div><textarea placeholder="답장을 입력하세요"></textarea><div class="composer-actions"><button class="link-button">매크로 사용</button><button class="send">답장 보내기</button></div></div></section><aside class="context"><div class="context-head"><h3>고객 컨텍스트</h3></div><div class="context-section"><h4>' + customer.name + '</h4><dl class="key-value"><dt>조직</dt><dd>' + org.name + '</dd><dt>플랜</dt><dd>' + org.plan + '</dd><dt>제품</dt><dd>' + selected.technical.product + '</dd><dt>리전</dt><dd>' + selected.technical.region + '</dd></dl></div><div class="context-section"><h4>연결된 작업</h4>' + (selected.caseId ? '<button class="linked" data-action="open-case" data-id="' + selected.caseId + '"><strong>' + selected.caseId.toUpperCase() + '</strong><span>케이스 상세 보기</span></button>' : '<button class="secondary" data-action="create-case" data-id="' + selected.id + '">지원 케이스 생성</button>') + '</div></aside></main>';
}
function caseSla(item) {
  const minutes = Math.round((new Date(item.slaDueAt) - NOW) / 60000);
  return minutes <= 60 ? [minutes + '분 남음','amber'] : [Math.ceil(minutes / 60) + '시간 남음','blue'];
}
function casesView() {
  const f = state.filters;
  const rows = data.cases.filter((item) => {
    const org = find(data.organizations, item.organizationId);
    const q = (item.id + ' ' + item.title + ' ' + org.name + ' ' + item.product).toLowerCase();
    return (!f.query || q.includes(f.query.toLowerCase())) && (!f.status || item.status === f.status) && (!f.severity || item.severity === f.severity) && (!f.incident || (f.incident === 'linked' ? item.incidentId : !item.incidentId));
  }).sort((a,b) => (a.severity + a.slaDueAt).localeCompare(b.severity + b.slaDueAt));
  const selected = rows.find((item) => item.id === state.selectedCaseId) || rows[0];
  const filters = '<input class="search-input" data-filter="query" value="' + esc(f.query) + '" placeholder="Case ID, 제목, 조직, 제품 검색"><div class="filter-row"><select data-filter="status"><option value="">모든 상태</option>' + ['New','Open','Waiting for customer','Waiting for team','Resolved','Closed'].map((v) => '<option value="' + v + '"' + (f.status===v?' selected':'') + '>' + koStatus(v) + '</option>').join('') + '</select><select data-filter="severity"><option value="">모든 심각도</option>' + ['S1','S2','S3','S4'].map((v) => '<option' + (f.severity===v?' selected':'') + '>' + v + '</option>').join('') + '</select><select data-filter="incident"><option value="">Incident 전체</option><option value="linked"' + (f.incident==='linked'?' selected':'') + '>연결됨</option><option value="unlinked"' + (f.incident==='unlinked'?' selected':'') + '>미연결</option></select></div>';
  const list = rows.length ? rows.map((item) => { const org=find(data.organizations,item.organizationId); const clock=caseSla(item); return '<button class="entity-row ' + (selected.id===item.id?'active':'') + '" data-action="case" data-id="' + item.id + '"><div class="row"><strong>' + item.id.toUpperCase() + '</strong>' + badge(item.severity,item.severity==='S1'||item.severity==='S2'?'red':'amber') + '</div><p>' + esc(item.title) + '</p><small>' + org.name + ' · ' + item.product + '</small><div class="row">' + badge(koStatus(item.status)) + badge(clock[0],clock[1]) + '</div></button>'; }).join('') : '<div class="empty-state"><strong>검색 결과가 없습니다</strong><p>검색어 또는 필터를 변경해 보세요.</p><button class="secondary" data-action="clear-filters">필터 초기화</button></div>';
  return '<main class="agent-shell case-shell">' + nav() + '<aside class="entity-list"><div class="entity-list-head"><div class="row"><h2>케이스</h2><span class="muted">' + rows.length + '건</span></div>' + filters + '</div>' + list + '</aside><section class="entity-detail">' + (selected ? caseDetail(selected) : '') + '</section></main>';
}
function caseDetail(item) {
  const conversation=find(data.conversations,item.conversationId), customer=find(data.customers,item.customerId), org=find(data.organizations,item.organizationId), incident=find(data.incidents,item.incidentId), member=find(data.members,item.assigneeId), team=find(data.teams,item.teamId), clock=caseSla(item);
  const t = conversation.technical;
  return '<div class="entity-detail-head"><div><div class="eyebrow">' + item.id.toUpperCase() + '</div><h2>' + esc(item.title) + '</h2><div class="meta">' + badge(koStatus(item.status)) + badge(item.severity,item.severity==='S1'||item.severity==='S2'?'red':'amber') + badge('SLA '+clock[0],clock[1]) + '</div></div><div class="detail-actions"><select data-case-field="status"><option value="">상태 변경</option>' + ['New','Open','Waiting for customer','Waiting for team','Resolved','Closed'].map((v)=>'<option value="'+v+'">'+koStatus(v)+'</option>').join('') + '</select><select data-case-field="severity"><option value="">심각도 변경</option>' + ['S1','S2','S3','S4'].map((v)=>'<option>'+v+'</option>').join('') + '</select></div></div><div class="entity-detail-body"><section class="detail-block"><h3>케이스 개요</h3><dl class="detail-grid"><dt>우선순위</dt><dd>' + (item.priority==='High'?'높음':'보통') + '</dd><dt>담당자</dt><dd>' + (member?.name || '미배정') + '</dd><dt>담당 팀</dt><dd>' + (team?.name || '미배정') + '</dd><dt>SLA</dt><dd>' + clock[0] + '</dd></dl></section><section class="detail-block"><h3>기술 정보</h3><dl class="detail-grid"><dt>제품</dt><dd>'+t.product+'</dd><dt>환경</dt><dd>'+t.environment+'</dd><dt>리전</dt><dd>'+t.region+'</dd><dt>버전</dt><dd>'+t.version+'</dd><dt>오류 코드</dt><dd>'+ (t.errorCode||'—') +'</dd><dt>Request ID</dt><dd>'+ (t.requestId||'—') +'</dd><dt>고객 영향</dt><dd>'+t.impact+'</dd></dl></section><section class="detail-block"><h3>연결된 항목</h3><div class="relationship-grid"><button data-action="open-conversation" data-id="'+conversation.id+'">대화<br><strong>'+esc(conversation.title)+'</strong></button><button data-action="toast" data-id="고객 메뉴는 다음 단계에서 구현합니다.">고객<br><strong>'+customer.name+'</strong></button><button data-action="toast" data-id="조직 메뉴는 다음 단계에서 구현합니다.">조직<br><strong>'+org.name+'</strong></button>' + (incident ? '<button data-action="toast" data-id="Incident 메뉴는 다음 단계에서 구현합니다.">Incident<br><strong>'+incident.id.toUpperCase()+' · '+incident.title+'</strong></button>' : '<button data-action="link-incident" data-id="'+item.id+'">Incident<br><strong>연결하기</strong></button>') + '</div></section><section class="detail-block"><h3>활동</h3><ul class="timeline">'+item.activity.map((a)=>'<li><strong>'+a.time+'</strong> · '+esc(a.text)+'</li>').join('')+'</ul></section></div>';
}
function render() {
  const content = state.mode==='customer' ? customerView() : state.activeAgentMenu==='cases' ? casesView() : inboxView();
  app.innerHTML = shell(content);
  decorateComposer();
}
function decorateComposer() {
  const composer=app.querySelector('.composer-agent');
  if(!composer) return;
  const internal=state.composerMode==='internal';
  composer.innerHTML='<div class="composer-type"><button class="'+(!internal?'active':'')+'" data-action="composer-mode" data-id="reply">답장</button><button class="'+(internal?'active':'')+'" data-action="composer-mode" data-id="internal">내부 메모</button></div><textarea data-composer-input placeholder="'+(internal?'내부 메모를 작성하세요…':'고객에게 답장하기…')+'">'+esc(state.composerText)+'</textarea><div class="composer-actions"><button class="link-button" data-action="use-macro">매크로 사용</button><button class="send" data-action="send-message">'+(internal?'메모 추가':'답장 보내기')+'</button></div>';
}
function notify(message) {
  setState({toast:message}); render(); window.setTimeout(() => { if(state.toast===message) { setState({toast:''}); render(); } }, 2200);
}
function createCase(conversationId) {
  const c=find(data.conversations,conversationId);
  if(c.caseId){ setState({activeAgentMenu:'cases',selectedCaseId:c.caseId}); return; }
  const id='case-'+Date.now();
  data.cases.unshift({id,conversationId:c.id,customerId:c.customerId,organizationId:c.organizationId,incidentId:c.incidentId,title:c.title,product:c.technical.product,environment:c.technical.environment,priority:c.priority,severity:'S3',status:'New',assigneeId:c.assigneeId,teamId:c.teamId,slaDueAt:'2026-07-23T14:00:00Z',createdAt:NOW.toISOString(),activity:[{time:'방금',text:'Inbox 대화에서 케이스를 생성했습니다.'}]});
  c.caseId=id; setState({activeAgentMenu:'cases',selectedCaseId:id}); notify('지원 케이스를 생성했습니다.');
}
function submitRequest() {
  const id='conv-'+Date.now();
  data.conversations.unshift({id,customerId:'u-maya',organizationId:'o-acme',caseId:null,incidentId:null,title:'API requests returning 502 in EU-West',type:'Technical issue',status:'New',priority:'High',assigneeId:null,teamId:'t-support',createdAt:NOW.toISOString(),technical:{product:'Public API',environment:'Production',region:'EU-West',version:'API v3',errorCode:'502',requestId:'req_89a21',impact:'EU customers cannot complete checkout.'},messages:[{from:'Maya Chen',type:'customer',time:'방금',text:'최근 배포 이후 API 요청에서 502 응답이 발생합니다.'}]});
  setState({selectedConversationId:id,customerStep:'chat'}); notify('기술 지원팀에 문의를 보냈습니다.');
}
function sendMessage() {
  const text=state.composerText.trim();
  if(!text) { notify('메시지를 먼저 작성하세요.'); return; }
  const c=find(data.conversations,state.selectedConversationId);
  const internal=state.composerMode==='internal';
  c.messages.push({from:'Alex Kim',type:internal?'internal':'agent',time:'방금',text});
  if(!internal) c.status='Waiting for customer';
  setState({composerText:''});
  notify(internal?'내부 메모를 추가했습니다.':'답장을 보냈습니다.');
}
function useMacro() {
  const macro='제보 감사합니다. 현재 담당 팀에서 문제를 조사하고 있으며, 새로운 정보가 확인되는 대로 안내해 드리겠습니다.';
  setState({composerText:state.composerText ? state.composerText+'\n\n'+macro : macro});
}
document.addEventListener('click',(event)=>{
  const el=event.target.closest('[data-action]'); if(!el)return;
  const action=el.dataset.action, id=el.dataset.id;
  if(action==='menu') { if(['inbox','cases'].includes(id)) setState({activeAgentMenu:id}); else notify('이 메뉴는 케이스 단계 완료 후 순서대로 구현합니다.'); }
  if(action==='mode')setState({mode:id});
  if(action==='inbox-queue')setState({inboxQueue:id});
  if(action==='customer-step')setState({customerStep:id});
  if(action==='submit-request')submitRequest();
  if(action==='composer-mode')setState({composerMode:id});
  if(action==='use-macro')useMacro();
  if(action==='send-message')sendMessage();
  if(action==='conversation')setState({selectedConversationId:id});
  if(action==='case')setState({selectedCaseId:id});
  if(action==='open-case')setState({activeAgentMenu:'cases',selectedCaseId:id});
  if(action==='open-conversation')setState({activeAgentMenu:'inbox',selectedConversationId:id});
  if(action==='create-case')createCase(id);
  if(action==='link-incident'){const item=find(data.cases,id), c=find(data.conversations,item.conversationId); item.incidentId='inc-203'; c.incidentId='inc-203'; item.activity.unshift({time:'방금',text:'INC-203 Incident를 연결했습니다.'}); notify('INC-203 Incident를 연결했습니다.');}
  if(action==='clear-filters')setState({filters:{query:'',status:'',severity:'',incident:''}});
  if(action==='toast')notify(id);
  render();
});
document.addEventListener('input',(event)=>{const el=event.target;if(el.dataset.composerInput!==undefined){setState({composerText:el.value});return;}if(!el.dataset.filter)return;setState({filters:{...state.filters,[el.dataset.filter]:el.value}});render();});
document.addEventListener('change',(event)=>{const el=event.target;if(el.dataset.filter){setState({filters:{...state.filters,[el.dataset.filter]:el.value}});render();}if(el.dataset.caseField&&el.value){const item=find(data.cases,state.selectedCaseId);item[el.dataset.caseField]=el.value;item.activity.unshift({time:'방금',text:'케이스 정보를 변경했습니다.'});notify('케이스 정보를 변경했습니다.');}});
render();
