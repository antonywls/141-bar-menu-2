import { useState, useEffect } from "react";

type Lang = "en" | "zh" | "ko" | "ja";
type Tab = "specials" | "cocktails" | "soju";

interface Item {
  names: Record<Lang, string>;
  price: string;
  ingredients?: Record<Lang, string>;
  note?: Record<Lang, string>;
}

const ui: Record<string, Record<Lang, string>> = {
  specials: { en: "Specials", zh: "特調", ko: "스페셜", ja: "スペシャル" },
  cocktails: { en: "Cocktails & Shots", zh: "調酒 & 烈酒", ko: "칵테일 & 샷", ja: "カクテル & ショット" },
  soju: { en: "Soju & Beer", zh: "燒酒 & 啤酒", ko: "소주 & 맥주", ja: "焼酎 & ビール" },
  classicCocktails: { en: "Classic Cocktails", zh: "經典調酒", ko: "클래식 칵테일", ja: "クラシックカクテル" },
  shots: { en: "Shots", zh: "Shot 盤", ko: "샷", ja: "ショット" },
  soLabel: { en: "Soju", zh: "燒酒", ko: "소주", ja: "焼酎" },
  beerLabel: { en: "Beer", zh: "啤酒", ko: "맥주", ja: "ビール" },
};

const specialsItems: Item[] = [
  {
    names: { en: "Spiked Milk Tea", zh: "成年人的奶茶", ko: "어른들의 밀크티", ja: "大人のミルクティー" },
    price: "280",
    ingredients: { en: "milk tea · milk liqueur", zh: "奶茶 · 奶酒", ko: "밀크티 · 밀크 리큐어", ja: "ミルクティー · ミルクリキュール" },
  },
  {
    names: { en: "I'm Only Nice Because I'm Drunk", zh: "溫柔都是酒裝的", ko: "취해야 착한 나", ja: "お酒のおかげで優しい" },
    price: "280",
    ingredients: { en: "green milk tea · milk liqueur", zh: "奶綠 · 奶酒", ko: "그린 밀크티 · 밀크 리큐어", ja: "グリーンミルクティー · ミルクリキュール" },
  },
  {
    names: { en: "Wakey Wakey", zh: "姊妹醒醒", ko: "일어나 언니", ja: "目を覚ませ" },
    price: "250",
    ingredients: { en: "strawberry yogurt liqueur", zh: "草莓優酪乳奶酒", ko: "딸기 요거트 리큐어", ja: "ストロベリーヨーグルトリキュール" },
  },
  {
    names: { en: "Girl's Secret", zh: "少女心事", ko: "소녀의 비밀", ja: "乙女の秘密" },
    price: "250",
    ingredients: { en: "peach yogurt liqueur", zh: "水蜜桃優酪乳奶酒", ko: "복숭아 요거트 리큐어", ja: "ピーチヨーグルトリキュール" },
  },
  {
    names: { en: "It's Complicated", zh: "曖昧保鮮期", ko: "썸의 유통기한", ja: "曖昧な関係" },
    price: "230",
    ingredients: { en: "passion fruit · green tea cocktail", zh: "百香綠茶調酒", ko: "패션프루트 · 녹차 칵테일", ja: "パッションフルーツ · 緑茶カクテル" },
  },
  {
    names: { en: "Secret Menu", zh: "隱藏版", ko: "숨겨진 메뉴", ja: "隠しメニュー" },
    price: "?",
    ingredients: { en: "bartender's mood", zh: "bartender's mood", ko: "바텐더 기분대로", ja: "バーテンダー次第" },
  },
];

const classicItems: Item[] = [
  {
    names: { en: "Around the World", zh: "環遊世界", ko: "세계 일주", ja: "世界一周" },
    price: "370",
    ingredients: { en: "white rum · tequila · gin · whiskey · vodka · blue curaçao · lemon juice · grenadine", zh: "白朗姆 · 龍舌蘭 · 金酒 · 威士忌 · 伏特加 · 藍橙力嬌酒 · 檸檬汁 · 紅石榴", ko: "화이트 럼 · 데킬라 · 진 · 위스키 · 보드카 · 블루 큐라소 · 레몬주스 · 그레나딘", ja: "ホワイトラム · テキーラ · ジン · ウイスキー · ウォッカ · ブルーキュラソー · レモンジュース · グレナデン" },
  },
  {
    names: { en: "See You Tomorrow", zh: "明天見", ko: "내일 봐", ja: "また明日" },
    price: "370",
    ingredients: { en: "rum · tequila · gin · vodka · blue curaçao · sprite · lemon", zh: "朗姆 · 龍舌蘭 · 金酒 · 伏特加 · 藍橙利口酒 · 雪碧 · 檸檬", ko: "럼 · 데킬라 · 진 · 보드카 · 블루 큐라소 · 사이다 · 레몬", ja: "ラム · テキーラ · ジン · ウォッカ · ブルーキュラソー · スプライト · レモン" },
  },
  {
    names: { en: "Long Island Iced Tea", zh: "長島冰茶", ko: "롱아일랜드 아이스티", ja: "ロングアイランド" },
    price: "350",
    ingredients: { en: "5 classic spirits · lemon juice · cola", zh: "經典基酒5種 · 檸檬汁 · 可樂", ko: "5가지 클래식 스피리츠 · 레몬주스 · 콜라", ja: "クラシックベース5種 · レモンジュース · コーラ" },
  },
  {
    names: { en: "Godfather", zh: "教父", ko: "대부", ja: "ゴッドファーザー" },
    price: "270",
    ingredients: { en: "whiskey · amaretto", zh: "威士忌 · 杏仁", ko: "위스키 · 아마레토", ja: "ウイスキー · アマレット" },
  },
  {
    names: { en: "Whiskey Sour", zh: "威士忌酸", ko: "위스키 사워", ja: "ウイスキーサワー" },
    price: "270",
    ingredients: { en: "whiskey · lemon juice", zh: "威士忌 · 檸檬汁", ko: "위스키 · 레몬주스", ja: "ウイスキー · レモンジュース" },
  },
  {
    names: { en: "Cuba Libre", zh: "自由古巴", ko: "쿠바 리브레", ja: "キューバリブレ" },
    price: "270",
    ingredients: { en: "rum · cola · lemon", zh: "蘭姆 · 可樂 · 檸檬", ko: "럼 · 콜라 · 레몬", ja: "ラム · コーラ · レモン" },
  },
  {
    names: { en: "Sex on the Beach", zh: "性感沙灘", ko: "섹스 온 더 비치", ja: "セックス・オン・ザ・ビーチ" },
    price: "270",
    ingredients: { en: "vodka · peach liqueur · orange juice · cranberry juice", zh: "伏特加 · 桃子利口酒 · 柳橙汁 · 蔓越莓汁", ko: "보드카 · 피치 리큐어 · 오렌지주스 · 크랜베리주스", ja: "ウォッカ · ピーチリキュール · オレンジジュース · クランベリージュース" },
  },
  {
    names: { en: "Martini", zh: "馬丁尼", ko: "마티니", ja: "マティーニ" },
    price: "200",
    ingredients: { en: "gin · sweet vermouth", zh: "琴酒 · 甘味美思", ko: "진 · 스위트 베르무트", ja: "ジン · スイートベルモット" },
  },
  {
    names: { en: "Screwdriver", zh: "螺絲起子", ko: "스크루드라이버", ja: "スクリュードライバー" },
    price: "200",
    ingredients: { en: "vodka · orange juice", zh: "伏特加 · 柳橙汁", ko: "보드카 · 오렌지주스", ja: "ウォッカ · オレンジジュース" },
  },
  {
    names: { en: "Gin Tonic", zh: "琴通寧", ko: "진 토닉", ja: "ジントニック" },
    price: "200",
    ingredients: { en: "gin · tonic water", zh: "琴酒 · 通寧水", ko: "진 · 토닉워터", ja: "ジン · トニックウォーター" },
  },
  {
    names: { en: "Jägerbomb", zh: "野格炸彈", ko: "예거밤", ja: "イエガーボム" },
    price: "200",
    ingredients: { en: "jägermeister · red bull", zh: "野格 · Red Bull", ko: "예거마이스터 · 레드불", ja: "イエガーマイスター · レッドブル" },
  },
  {
    names: { en: "Vodka Lime", zh: "伏特加萊姆", ko: "보드카 라임", ja: "ウォッカライム" },
    price: "200",
    ingredients: { en: "vodka · lime", zh: "伏特加 · 萊姆", ko: "보드카 · 라임", ja: "ウォッカ · ライム" },
  },
  {
    names: { en: "Whiskey Coke", zh: "威士忌可樂", ko: "위스키 콜라", ja: "ウイスキーコーク" },
    price: "200",
    ingredients: { en: "whiskey · cola", zh: "威士忌 · 可樂", ko: "위스키 · 콜라", ja: "ウイスキー · コーラ" },
  },
  {
    names: { en: "Tequila Sunrise", zh: "龍舌蘭日出", ko: "데킬라 선라이즈", ja: "テキーラサンライズ" },
    price: "250",
    ingredients: { en: "tequila · orange juice", zh: "龍舌蘭 · 柳橙汁", ko: "데킬라 · 오렌지주스", ja: "テキーラ · オレンジジュース" },
  },
];

const shotItems: Item[] = [
  {
    names: { en: "Shots — Set of 6", zh: "SHOT 盤（6杯）", ko: "샷 세트 (6잔)", ja: "ショットセット（6杯）" },
    price: "500",
  },
  {
    names: { en: "Cocktail Shots — Set of 6", zh: "調酒 SHOT 盤（6杯）", ko: "칵테일 샷 세트 (6잔)", ja: "カクテルショットセット（6杯）" },
    price: "500",
  },
];

const sojuItems: Item[] = [
  { names: { en: "Litchi", zh: "荔枝", ko: "리치", ja: "ライチ" }, price: "220" },
  { names: { en: "Plum", zh: "梅子", ko: "자두", ja: "梅" }, price: "220" },
  { names: { en: "Guava", zh: "芭樂", ko: "구아바", ja: "グアバ" }, price: "220" },
  { names: { en: "Passion Fruit", zh: "百香果", ko: "패션프루트", ja: "パッションフルーツ" }, price: "220" },
  {
    names: { en: "Any 2 Bottles", zh: "燒酒任選兩瓶", ko: "소주 2병 선택", ja: "焼酎 2本セット" },
    price: "400",
    note: { en: "mix & match", zh: "自由搭配", ko: "자유 선택", ja: "自由に選べる" },
  },
  {
    names: { en: "6 Bottles + 2 Free Beers", zh: "燒酒任選六瓶 贈啤酒兩瓶", ko: "소주 6병 + 맥주 2병 무료", ja: "焼酎 6本 + ビール 2本無料" },
    price: "1300",
    note: { en: "best value", zh: "超值優惠", ko: "최고의 가성비", ja: "お得なセット" },
  },
];

const beerItems: Item[] = [
  {
    names: { en: "Budweiser", zh: "百威", ko: "버드와이저", ja: "バドワイザー" },
    price: "100 / 500",
    note: { en: "1 bottle / 6 bottles", zh: "1瓶 / 6瓶", ko: "1병 / 6병", ja: "1本 / 6本" },
  },
  {
    names: { en: "Heineken", zh: "海尼根", ko: "하이네켄", ja: "ハイネケン" },
    price: "100 / 500",
    note: { en: "1 bottle / 6 bottles", zh: "1瓶 / 6瓶", ko: "1병 / 6병", ja: "1本 / 6本" },
  },
  {
    names: { en: "Heineken Silver", zh: "星銀", ko: "하이네켄 실버", ja: "ハイネケンシルバー" },
    price: "100 / 500",
    note: { en: "1 bottle / 6 bottles", zh: "1瓶 / 6瓶", ko: "1병 / 6병", ja: "1本 / 6本" },
  },
];

const tabColors: Record<Tab, string> = {
  specials: "#b8888a",
  cocktails: "#a85e3a",
  soju: "#9e8e78",
};

const langLabels: Record<Lang, string> = {
  en: "EN",
  zh: "繁中",
  ko: "한국어",
  ja: "日本語",
};

// Generate noise texture once and return a data URL
function buildNoiseDataUrl(): string {
  const canvas = document.createElement("canvas");
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(200, 200);
  for (let i = 0; i < img.data.length; i += 4) {
    // Center noise around 128 (neutral for soft-light) with small variance → very subtle grain
    const v = Math.floor(128 + (Math.random() + Math.random() - 1) * 15);
    img.data[i] = v;
    img.data[i + 1] = v;
    img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL("image/png");
}

let noiseUrl: string | null = null;

function applyBackground(color: string, animate = true) {
  if (!noiseUrl) noiseUrl = buildNoiseDataUrl();
  const style = document.documentElement.style;
  style.transition = animate ? "background-color 500ms ease" : "none";
  style.backgroundColor = color;
  style.backgroundImage = `url(${noiseUrl})`;
  style.backgroundRepeat = "repeat";
  style.backgroundSize = "200px 200px";
  style.backgroundBlendMode = "soft-light";
  document.body.style.backgroundColor = "transparent";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", color);
}

function ItemRow({ item, lang }: { item: Item; lang: Lang }) {
  return (
    <div className="py-4 border-b border-white/20 last:border-0">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-white font-medium text-base leading-snug">
            {item.names[lang]}
          </div>
          {item.ingredients && (
            <div className="text-white/60 text-sm mt-1 font-light tracking-wide leading-relaxed">
              {item.ingredients[lang]}
            </div>
          )}
          {item.note && (
            <div className="text-white/50 text-xs mt-0.5 uppercase tracking-widest font-light">
              {item.note[lang]}
            </div>
          )}
        </div>
        <div className="text-white font-semibold text-base tabular-nums whitespace-nowrap pt-0.5">
          {item.price}
          <span className="text-white/50 text-xs font-light ml-0.5">NT$</span>
        </div>
      </div>
    </div>
  );
}

function SectionBlock({ heading, items, lang }: { heading: string; items: Item[]; lang: Lang }) {
  return (
    <div className="mb-8">
      <h2 className="text-white/40 text-xs uppercase tracking-[0.25em] font-medium mb-1 pb-2 border-b border-white/15">
        {heading}
      </h2>
      {items.map((item, i) => (
        <ItemRow key={i} item={item} lang={lang} />
      ))}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>("zh");
  const [tab, setTab] = useState<Tab>("specials");

  const bg = tabColors[tab];

  useEffect(() => {
    applyBackground(bg);
  }, [bg]);

  // Apply on first render without animation
  useEffect(() => {
    applyBackground(tabColors["specials"], false);
  }, []);

  return (
    <div
      className="flex flex-col"
      style={{
        minHeight: "100dvh",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
        backgroundColor: "transparent",
      }}
    >
      {/* Language Switcher */}
      <div className="flex justify-end gap-1 px-5 pt-5 pb-2">
        {(["en", "zh", "ko", "ja"] as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`text-xs px-2.5 py-1 rounded-full transition-all duration-200 ${
              lang === l
                ? "bg-white text-black font-semibold"
                : "text-white/60 hover:text-white"
            }`}
          >
            {langLabels[l]}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="px-6 pt-3 pb-5">
        <h1 className="text-white text-4xl font-semibold tracking-tight leading-none">
          {ui[tab][lang].split(" & ")[0]}
          {ui[tab][lang].includes(" & ") && (
            <span className="text-white/40"> & {ui[tab][lang].split(" & ")[1]}</span>
          )}
        </h1>
      </div>

      {/* Tab Bar */}
      <div className="flex px-6 gap-6 border-b border-white/20 pb-0 mb-6">
        {(["specials", "cocktails", "soju"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-sm pb-3 transition-all duration-200 border-b-2 -mb-px whitespace-nowrap ${
              tab === t
                ? "text-white border-white font-medium"
                : "text-white/40 border-transparent hover:text-white/70"
            }`}
          >
            {ui[t][lang].split(" & ")[0]}
            {ui[t][lang].includes(" & ") && (
              <span className="opacity-60"> & {ui[t][lang].split(" & ")[1]}</span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-12 overflow-y-auto">
        {tab === "specials" && (
          <SectionBlock heading={ui.specials[lang]} items={specialsItems} lang={lang} />
        )}

        {tab === "cocktails" && (
          <>
            <SectionBlock heading={ui.classicCocktails[lang]} items={classicItems} lang={lang} />
            <SectionBlock heading={ui.shots[lang]} items={shotItems} lang={lang} />
          </>
        )}

        {tab === "soju" && (
          <>
            <SectionBlock heading={ui.soLabel[lang]} items={sojuItems} lang={lang} />
            <SectionBlock heading={ui.beerLabel[lang]} items={beerItems} lang={lang} />
          </>
        )}

        <div className="text-white/20 text-xs text-center tracking-widest uppercase mt-6">
          {tab === "specials" ? "SPECIALS" : tab === "cocktails" ? "COCKTAILS & SHOTS" : "SOJU & BEER"}
        </div>
      </div>
    </div>
  );
}
