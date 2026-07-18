// 멍냥계산기 공통 로직 — 수의학 표준 공식 기반 (참고용)
function num(id){ return parseFloat(String(document.getElementById(id).value).replace(/,/g,'')) || 0; }
function show(id){ document.getElementById(id).classList.add('show'); }
function fmt(n,d=0){ return n.toLocaleString('ko-KR',{maximumFractionDigits:d}); }

// RER(기초 에너지 요구량) = 70 × 체중(kg)^0.75
function rer(kg){ return 70 * Math.pow(kg, 0.75); }

// 강아지 나이 → 사람 나이 (크기별 환산표 기반)
// 1년차 15살, 2년차 +9살, 이후 소형 +4 / 중형 +5 / 대형 +6 / 초대형 +7
function dogAge(years, size){
  const perYear = {small:4, medium:5, large:6, giant:7}[size];
  if (years <= 0) return 0;
  if (years <= 1) return 15 * years;
  if (years <= 2) return 15 + 9 * (years - 1);
  return 24 + perYear * (years - 2);
}

// 고양이 나이: 1년차 15살, 2년차 +9살, 이후 +4/년
function catAge(years){
  if (years <= 0) return 0;
  if (years <= 1) return 15 * years;
  if (years <= 2) return 15 + 9 * (years - 1);
  return 24 + 4 * (years - 2);
}

// 초콜릿 테오브로민 함량 (mg per g)
const THEOBROMINE = { white: 0.01, milk: 2.0, dark: 5.5, baking: 14.0 };

// 강아지 접종 스케줄 (생후 주차, 표준 6회 프로그램)
const DOG_VACCINES = [
  {week:6,  name:'1차 — 종합백신(DHPPL) + 코로나 장염'},
  {week:8,  name:'2차 — 종합백신(DHPPL) + 코로나 장염'},
  {week:10, name:'3차 — 종합백신(DHPPL) + 켄넬코프'},
  {week:12, name:'4차 — 종합백신(DHPPL) + 켄넬코프'},
  {week:14, name:'5차 — 종합백신(DHPPL) + 인플루엔자'},
  {week:16, name:'6차 — 인플루엔자 + 광견병'},
  {week:18, name:'항체가 검사 (접종 완료 확인)'}
];
const CAT_VACCINES = [
  {week:8,  name:'1차 — 종합백신(FVRCP)'},
  {week:11, name:'2차 — 종합백신 + 백혈병'},
  {week:14, name:'3차 — 종합백신 + 백혈병'},
  {week:16, name:'광견병'},
  {week:18, name:'항체가 검사 (접종 완료 확인)'}
];

function addWeeks(date, w){ const d = new Date(date); d.setDate(d.getDate() + w*7); return d; }
function kdate(d){ return d.getFullYear() + '.' + String(d.getMonth()+1).padStart(2,'0') + '.' + String(d.getDate()).padStart(2,'0'); }
