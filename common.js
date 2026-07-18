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

// ── 고양이 위험 음식·식물 데이터 (수의학 문헌 기반, 참고용) ──
const CAT_HAZARDS = {
  lily:      {name:'백합·나리류(꽃/잎/꽃가루/물)', level:4, why:'고양이에게 가장 치명적. 꽃가루나 꽃병 물만 핥아도 급성 신부전으로 사망할 수 있습니다.'},
  onion:     {name:'양파·마늘·파·부추', level:4, why:'적혈구를 파괴해 용혈성 빈혈을 일으킵니다. 익힌 것, 가루, 국물도 위험.'},
  xylitol:   {name:'자일리톨(무설탕 껌·사탕)', level:4, why:'소량도 급성 저혈당·간 손상을 유발할 수 있는 응급 상황.'},
  grape:     {name:'포도·건포도', level:4, why:'급성 신부전 위험. 양과 무관하게 위험할 수 있습니다.'},
  chocolate: {name:'초콜릿·카카오', level:3, why:'테오브로민 중독. 고양이는 단맛을 못 느껴 잘 안 먹지만, 먹으면 위험합니다.'},
  caffeine:  {name:'커피·에너지음료(카페인)', level:3, why:'심장 박동 이상, 떨림, 발작을 유발할 수 있습니다.'},
  alcohol:   {name:'알코올(술·발효반죽)', level:4, why:'소량도 치명적. 구토, 호흡곤란, 혼수로 이어질 수 있습니다.'},
  rawfish:   {name:'생선회·날생선 다량', level:2, why:'날생선의 티아미나아제가 비타민 B1을 파괴해, 지속 급여 시 신경 문제를 일으킬 수 있습니다.'},
  milk:      {name:'우유·유제품', level:1, why:'대부분 유당불내증이라 설사·구토. 치명적이진 않지만 피하는 게 좋아요.'},
  dogfood:   {name:'강아지 사료(지속 급여)', level:2, why:'고양이 필수 영양소(타우린)가 부족해, 오래 먹으면 심장·시력 문제가 생깁니다.'},
};
