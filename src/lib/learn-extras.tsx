import {
  Scroll, Books, Globe, Drop, Waves, Snowflake, Bank, Cube, MapTrifold,
} from "@phosphor-icons/react";
import type { Lang } from "./i18n";

export interface ExtraSection { h: string; body: string; }
export interface ExtraHighlight { v: string; l: string; }
export interface ExtraLink { label: string; href: string; }
export interface ExtraFact { text: string; source: string; href: string; }

export interface ExtraTab {
  key: "policy" | "intl" | "refs" | "basins";
  emoji: string;
  tKey: string;
  Icon: typeof Drop;
  color: string;
  bg: string;
  title: string;
  intro: string;
  highlights: ExtraHighlight[];
  sections: ExtraSection[];
  links?: ExtraLink[];
  facts?: ExtraFact[];
}

const policy: Record<Lang, ExtraTab> = {
  en: {
    key: "policy", emoji: "🏛️", tKey: "learn.tab.policy", Icon: Scroll,
    color: "text-primary", bg: "bg-primary-soft",
    title: "Water Sector Development Programs",
    intro: "Tajikistan's national framework for water management combines long-term strategy, sectoral programs, and a binding legal code aligned with international commitments.",
    highlights: [
      { v: "2040", l: "National Target — 100% clean water" },
      { v: "73.4%", l: "current safe-water access (2024)" },
      { v: "1993", l: "Water Code of Tajikistan" },
      { v: "MEWR", l: "lead ministry" },
    ],
    sections: [
      { h: "National Water Strategy", body: "Strategic framework for integrated water resources management (IWRM) — covering drinking water, irrigation, hydropower, and ecosystem flows. Anchors Tajikistan's commitments under UN-Water, the SDGs (especially SDG 6), and the Dushanbe Water Process." },
      { h: "State Development Programs", body: "Sectoral programs target (1) expansion of public water supply to rural districts, (2) drinking-water quality improvement (WHO-aligned standards), and (3) modernization of Soviet-era irrigation networks across Khatlon and Sughd to reduce conveyance losses." },
      { h: "National Target 2040", body: "Goal: 100% population access to safe drinking water by 2040. Current baseline 73.4% (2024). Implementation plan staggers investments across 5-year phases, with rural districts prioritized for the first cycle." },
      { h: "Legal Framework", body: "Water Code of the Republic of Tajikistan governs all water relations. Ministry of Energy and Water Resources (MEWR) regulations set licensing, tariffs, and water-quality enforcement. Environmental protection law sets discharge and ecosystem-flow standards." },
    ],
    links: [
      { label: "Ministry of Energy and Water Resources (MEWR)", href: "https://mewr.tj/" },
      { label: "Government of Tajikistan", href: "https://www.president.tj/" },
      { label: "Committee for Environmental Protection", href: "https://www.tajnature.tj/" },
      { label: "UN-Water · Tajikistan country profile", href: "https://www.unwater.org/" },
    ],
    facts: [
      { text: "National Water Strategy targets 100% safe drinking water access by 2040.", source: "MEWR Tajikistan", href: "https://mewr.tj/" },
      { text: "Water Code of Tajikistan (1993, amended) is the binding legal basis for all water relations.", source: "Government of Tajikistan", href: "https://www.president.tj/" },
    ],
  },
  ru: {
    key: "policy", emoji: "🏛️", tKey: "learn.tab.policy", Icon: Scroll,
    color: "text-primary", bg: "bg-primary-soft",
    title: "Государственные программы развития водного сектора",
    intro: "Национальная система управления водными ресурсами Таджикистана объединяет долгосрочную стратегию, секторальные программы и Водный кодекс, согласованный с международными обязательствами.",
    highlights: [
      { v: "2040", l: "Национальная цель — 100% чистой воды" },
      { v: "73,4%", l: "текущий доступ (2024)" },
      { v: "1993", l: "Водный кодекс РТ" },
      { v: "МЭВР", l: "ведущее министерство" },
    ],
    sections: [
      { h: "Национальная водная стратегия", body: "Стратегические рамки интегрированного управления водными ресурсами (ИУВР) — питьевое водоснабжение, ирригация, гидроэнергетика и экологические стоки. Согласована с ЦУР 6 ООН и Процессом «Вода Душанбе»." },
      { h: "Государственные программы развития", body: "Программы охватывают: (1) расширение водоснабжения в сельской местности, (2) улучшение качества питьевой воды по стандартам ВОЗ, (3) модернизацию советских ирригационных систем в Хатлоне и Согде для сокращения потерь." },
      { h: "Национальная цель 2040", body: "Цель: 100% доступ населения к безопасной питьевой воде к 2040 году. Текущий уровень — 73,4% (2024). План реализации разделён на 5-летние этапы, приоритет — сельские районы." },
      { h: "Правовая база", body: "Водный кодекс Республики Таджикистан регулирует все водные отношения. Министерство энергетики и водных ресурсов (МЭВР) определяет лицензирование, тарифы и стандарты качества. Закон об охране окружающей среды устанавливает нормы сбросов и экологического стока." },
    ],
    links: [
      { label: "Министерство энергетики и водных ресурсов (МЭВР)", href: "https://mewr.tj/" },
      { label: "Правительство Республики Таджикистан", href: "https://www.president.tj/" },
      { label: "Комитет охраны окружающей среды", href: "https://www.tajnature.tj/" },
      { label: "UN-Water — профиль страны", href: "https://www.unwater.org/" },
    ],
    facts: [
      { text: "Национальная стратегия предусматривает 100% доступ к питьевой воде к 2040 году.", source: "МЭВР Таджикистан", href: "https://mewr.tj/" },
      { text: "Водный кодекс РТ (1993, с поправками) — основополагающий документ.", source: "Правительство РТ", href: "https://www.president.tj/" },
    ],
  },
  tj: {
    key: "policy", emoji: "🏛️", tKey: "learn.tab.policy", Icon: Scroll,
    color: "text-primary", bg: "bg-primary-soft",
    title: "Барномаҳои давлатии рушди сектори об",
    intro: "Низоми миллии идоракунии захираҳои об дар Тоҷикистон стратегияи дарозмуддат, барномаҳои соҳавӣ ва Кодекси обро бо ӯҳдадориҳои байналмилалӣ муттаҳид мекунад.",
    highlights: [
      { v: "2040", l: "Мақсади давлатӣ — 100% оби тоза" },
      { v: "73,4%", l: "дастрасии ҷорӣ (2024)" },
      { v: "1993", l: "Кодекси оби ҶТ" },
      { v: "ВЭРО", l: "вазорати масъул" },
    ],
    sections: [
      { h: "Стратегияи миллии об", body: "Чаҳорчӯбаи идоракунии муттаҳидаи захираҳои об (IWRM) — оби нӯшокӣ, обёрӣ, нерӯи барқобӣ ва ҷараёнҳои экосистемавӣ. Бо SDG 6 ва Раёни Об-и Душанбе ҳамоҳанг шудааст." },
      { h: "Барномаҳои давлатии рушди", body: "Барномаҳо: (1) тавсеаи обтаъминкунӣ дар деҳот, (2) беҳтарсозии сифати оби нӯшокӣ мутобиқи стандартҳои ТУТ, (3) навсозии шабакаҳои обёрии замони Шӯравӣ дар Хатлон ва Суғд." },
      { h: "Мақсади давлатӣ 2040", body: "Мақсад: то соли 2040 100% аҳолӣ ба оби нӯшокии бехатар дастрасӣ дошта бошанд. Сатҳи ҷорӣ — 73,4% (2024). Нақшаи иҷроиш ба марҳилаҳои 5-сола тақсим шудааст; деҳот афзалият дорад." },
      { h: "Асоси қонунӣ", body: "Кодекси оби Ҷумҳурии Тоҷикистон ҳамаи муносибатҳои обро танзим мекунад. ВЭРО иҷозатнома, тарифҳо ва меъёрҳои сифатро муайян мекунад. Қонуни ҳифзи муҳити зист меъёрҳои партовҳо ва ҷараёнро муқаррар мекунад." },
    ],
    links: [
      { label: "Вазорати энергетика ва захираҳои оби (ВЭРО)", href: "https://mewr.tj/" },
      { label: "Ҳукумати Ҷумҳурии Тоҷикистон", href: "https://www.president.tj/" },
      { label: "Кумитаи ҳифзи муҳити зист", href: "https://www.tajnature.tj/" },
      { label: "UN-Water — нимрухи кишвар", href: "https://www.unwater.org/" },
    ],
    facts: [
      { text: "Стратегияи миллӣ 100% дастрасӣ ба оби нӯшокиро то соли 2040 пешбинӣ мекунад.", source: "ВЭРО Тоҷикистон", href: "https://mewr.tj/" },
      { text: "Кодекси оби ҶТ (1993, бо тағйирот) — ҳуҷҷати асосии ҳуқуқӣ.", source: "Ҳукумати ҶТ", href: "https://www.president.tj/" },
    ],
  },
};

const intl: Record<Lang, ExtraTab> = {
  en: {
    key: "intl", emoji: "🌐", tKey: "learn.tab.intl", Icon: Globe,
    color: "text-info", bg: "bg-info/10",
    title: "Dushanbe Water Process 2026",
    intro: "International conference on water security in Central Asia — anchoring transboundary water management, cooperation, and water diplomacy.",
    highlights: [
      { v: "2026", l: "Next conference (Dushanbe)" },
      { v: "UN", l: "co-organised with UN-Water" },
      { v: "5", l: "Central Asian basin states" },
      { v: "2025", l: "UN Year of Glaciers' Preservation" },
    ],
    sections: [
      { h: "About the Process", body: "The Dushanbe Water Process is Tajikistan's flagship water diplomacy initiative, recognised by the UN General Assembly. It convenes governments, scientists, and civil society around shared water challenges in Central Asia and beyond." },
      { h: "2026 Conference", body: "The Third High-Level International Conference on the International Decade for Action 'Water for Sustainable Development, 2018–2028' will be hosted in Dushanbe in 2026 — focused on transboundary cooperation, glacier preservation, and climate-resilient water management." },
      { h: "Focus Areas", body: "Transboundary water management · regional cooperation across the Amu Darya and Syr Darya basins · glacier and snowpack preservation · climate adaptation finance · SDG 6 implementation · water-energy-food nexus." },
      { h: "Cultural Programme", body: "The official conference programme includes a cultural track showcasing Central Asia's water heritage — traditional irrigation systems, mountain communities, and shared rivers." },
    ],
    links: [
      { label: "Dushanbe Water Process 2026 — Cultural Events", href: "https://conf2026.dushanbewaterprocess.org/ru/events/cultural" },
      { label: "Dushanbe Water Process (official)", href: "https://dushanbewaterprocess.org/" },
      { label: "UN Water for Sustainable Development Decade", href: "https://www.un.org/en/observances/water-decade" },
    ],
    facts: [
      { text: "On Tajikistan's initiative, the UN declared 2025 the International Year of Glaciers' Preservation.", source: "UN General Assembly", href: "https://www.un.org/" },
      { text: "The 2026 Dushanbe conference is the third UN High-Level event of the Water Decade.", source: "Dushanbe Water Process", href: "https://conf2026.dushanbewaterprocess.org/" },
    ],
  },
  ru: {
    key: "intl", emoji: "🌐", tKey: "learn.tab.intl", Icon: Globe,
    color: "text-info", bg: "bg-info/10",
    title: "Процесс «Вода Душанбе 2026»",
    intro: "Международная конференция по водной безопасности в Центральной Азии — площадка для трансграничного управления, сотрудничества и водной дипломатии.",
    highlights: [
      { v: "2026", l: "Следующая конференция (Душанбе)" },
      { v: "ООН", l: "при поддержке UN-Water" },
      { v: "5", l: "стран бассейна ЦА" },
      { v: "2025", l: "Год сохранения ледников ООН" },
    ],
    sections: [
      { h: "О процессе", body: "Процесс «Вода Душанбе» — флагманская инициатива Таджикистана в области водной дипломатии, признанная Генеральной Ассамблеей ООН. Объединяет правительства, учёных и общественность вокруг общих водных задач." },
      { h: "Конференция 2026", body: "Третья Международная конференция высокого уровня по Десятилетию действий «Вода для устойчивого развития, 2018–2028» пройдёт в Душанбе в 2026 году — трансграничное сотрудничество, сохранение ледников и климатически устойчивое управление." },
      { h: "Ключевые темы", body: "Управление трансграничными водами · региональное сотрудничество по Амударье и Сырдарье · сохранение ледников и снежного покрова · финансирование адаптации · ЦУР 6 · связка вода-энергия-продовольствие." },
      { h: "Культурная программа", body: "Официальная программа включает культурный трек, посвящённый водному наследию Центральной Азии — традиционным ирригационным системам, горным сообществам и общим рекам." },
    ],
    links: [
      { label: "Душанбе 2026 — Культурные мероприятия", href: "https://conf2026.dushanbewaterprocess.org/ru/events/cultural" },
      { label: "Процесс «Вода Душанбе» (офиц.)", href: "https://dushanbewaterprocess.org/" },
      { label: "Десятилетие действий ООН «Вода»", href: "https://www.un.org/en/observances/water-decade" },
    ],
    facts: [
      { text: "По инициативе Таджикистана ООН объявила 2025 год Международным годом сохранения ледников.", source: "Генассамблея ООН", href: "https://www.un.org/" },
      { text: "Конференция 2026 — третье мероприятие высокого уровня в рамках Водного десятилетия ООН.", source: "Процесс «Вода Душанбе»", href: "https://conf2026.dushanbewaterprocess.org/" },
    ],
  },
  tj: {
    key: "intl", emoji: "🌐", tKey: "learn.tab.intl", Icon: Globe,
    color: "text-info", bg: "bg-info/10",
    title: "Раёни Об-и Душанбе 2026",
    intro: "Конференсияи байналмилалӣ оид ба амнияти об дар Осиёи Марказӣ — майдоне барои идоракунии трансмарзӣ, ҳамкорӣ ва дипломатияи об.",
    highlights: [
      { v: "2026", l: "Конференсияи навбатӣ (Душанбе)" },
      { v: "СММ", l: "бо дастгирии UN-Water" },
      { v: "5", l: "кишвари ҳавзаи Осиёи Марказӣ" },
      { v: "2025", l: "Соли ҳифзи пиряхҳои СММ" },
    ],
    sections: [
      { h: "Дар бораи раён", body: "Раёни Об-и Душанбе ташаббуси флагмани Тоҷикистон дар дипломатияи об аст ва аз ҷониби Маҷмаи Умумии СММ эътироф шудааст. Ҳукуматҳо, олимон ва ҷомеаро гирд меорад." },
      { h: "Конференсияи 2026", body: "Конференсияи сеюми сатҳи баланд оид ба Даҳсолаи 'Об барои рушди устувор, 2018–2028' соли 2026 дар Душанбе баргузор мегардад — ҳамкории трансмарзӣ, ҳифзи пиряхҳо ва идоракунии тобовари иқлимӣ." },
      { h: "Самтҳои асосӣ", body: "Идоракунии обҳои трансмарзӣ · ҳамкорӣ дар ҳавзаҳои Амударё ва Сирдарё · ҳифзи пиряхҳо ва барф · маблағгузории мутобиқшавӣ · SDG 6 · робитаи об-нерӯ-озуқа." },
      { h: "Барномаи фарҳангӣ", body: "Барномаи расмии конференсия трек фарҳангиро дар бар мегирад: системаҳои анъанавии обёрӣ, ҷамоаҳои кӯҳӣ ва дарёҳои муштарак." },
    ],
    links: [
      { label: "Душанбе 2026 — Чорабиниҳои фарҳангӣ", href: "https://conf2026.dushanbewaterprocess.org/ru/events/cultural" },
      { label: "Раёни Об-и Душанбе (расмӣ)", href: "https://dushanbewaterprocess.org/" },
      { label: "Даҳсолаи СММ 'Об'", href: "https://www.un.org/en/observances/water-decade" },
    ],
    facts: [
      { text: "Бо ташаббуси Тоҷикистон СММ соли 2025-ро Соли байналмилалии ҳифзи пиряхҳо эълон кард.", source: "Маҷмаи Умумии СММ", href: "https://www.un.org/" },
      { text: "Конференсияи 2026 — чорабинии сеюми сатҳи баланд дар доираи Даҳсолаи Об.", source: "Раёни Об-и Душанбе", href: "https://conf2026.dushanbewaterprocess.org/" },
    ],
  },
};

const refs: Record<Lang, ExtraTab> = {
  en: {
    key: "refs", emoji: "📚", tKey: "learn.tab.refs", Icon: Books,
    color: "text-accent-foreground", bg: "bg-accent/40",
    title: "Sources & References",
    intro: "A curated catalogue of every government, international, scientific and legal source used in AquaMap TJ.",
    highlights: [
      { v: "4", l: "Official government bodies" },
      { v: "5", l: "International organisations" },
      { v: "4", l: "Scientific institutions" },
      { v: "4+", l: "Legal documents & treaties" },
    ],
    sections: [
      { h: "Official Government Sources", body: "Ministry of Energy & Water Resources (MEWR, mewr.tj) — sector lead. Committee for Environmental Protection (tajnature.tj) — ecosystem & water-quality. National Water Information System (NWIS, planned Q3 2025) — gauging & telemetry. State Committee on Land and Geodesy — cadastre & land cover." },
      { h: "International Organisations", body: "UNEP (Atlas of Environmental Change for Tajikistan, 2025) · FAO AQUASTAT (water statistics, annual) · World Bank (Open Data + Climate Knowledge Portal) · Asian Development Bank (country programs) · UNECE (Water Convention reporting)." },
      { h: "Scientific Sources", body: "Tajik National University · Institute of Energy of Tajikistan · Glaciology research within the National Academy of Sciences · TajNCID — Tajikistan National Center for Innovative Development of Science and Technology." },
      { h: "Legal Documents", body: "Water Code of the Republic of Tajikistan (1993, amended) · National Water Strategy / Target 2040 · Law on Environmental Protection · International agreements via ICWC (Interstate Commission for Water Coordination of Central Asia)." },
    ],
    links: [
      { label: "MEWR — Ministry of Energy & Water", href: "https://mewr.tj/" },
      { label: "Committee for Environmental Protection", href: "https://www.tajnature.tj/" },
      { label: "UNEP", href: "https://www.unep.org/" },
      { label: "FAO AQUASTAT", href: "https://www.fao.org/aquastat/" },
      { label: "World Bank — Tajikistan", href: "https://data.worldbank.org/country/TJ" },
      { label: "Asian Development Bank", href: "https://www.adb.org/countries/tajikistan/main" },
      { label: "UNECE Water Convention", href: "https://unece.org/water" },
      { label: "ICWC", href: "http://www.icwc-aral.uz/" },
      { label: "Full Data Sources Page", href: "/sources" },
    ],
  },
  ru: {
    key: "refs", emoji: "📚", tKey: "learn.tab.refs", Icon: Books,
    color: "text-accent-foreground", bg: "bg-accent/40",
    title: "Источники и литература",
    intro: "Каталог всех государственных, международных, научных и правовых источников AquaMap TJ.",
    highlights: [
      { v: "4", l: "Гос. органы Таджикистана" },
      { v: "5", l: "Международные организации" },
      { v: "4", l: "Научные институты" },
      { v: "4+", l: "Правовые документы" },
    ],
    sections: [
      { h: "Официальные государственные источники", body: "Министерство энергетики и водных ресурсов (МЭВР, mewr.tj) — ведущее ведомство. Комитет охраны окружающей среды (tajnature.tj). Национальная водная информационная система (НВИС, план Q3 2025). Госкомитет по земле и геодезии." },
      { h: "Международные организации", body: "UNEP (Atlas Tajikistan 2025) · FAO AQUASTAT · Всемирный банк (Open Data + Climate Portal) · Азиатский банк развития · ЕЭК ООН (UNECE — Конвенция по воде)." },
      { h: "Научные источники", body: "Таджикский национальный университет · Институт энергетики · Гляциологические исследования НАН Таджикистана · TajNCID — Национальный центр инновационного развития." },
      { h: "Правовые документы", body: "Водный кодекс РТ (1993, с поправками) · Национальная водная стратегия / Цель 2040 · Закон об охране окружающей среды · Международные соглашения через МКВК." },
    ],
    links: [
      { label: "МЭВР — Министерство энергетики и водных ресурсов", href: "https://mewr.tj/" },
      { label: "Комитет охраны окружающей среды", href: "https://www.tajnature.tj/" },
      { label: "UNEP", href: "https://www.unep.org/" },
      { label: "FAO AQUASTAT", href: "https://www.fao.org/aquastat/" },
      { label: "Всемирный банк — Таджикистан", href: "https://data.worldbank.org/country/TJ" },
      { label: "Азиатский банк развития", href: "https://www.adb.org/countries/tajikistan/main" },
      { label: "ЕЭК ООН — Конвенция по воде", href: "https://unece.org/water" },
      { label: "МКВК", href: "http://www.icwc-aral.uz/" },
      { label: "Полная страница источников", href: "/sources" },
    ],
  },
  tj: {
    key: "refs", emoji: "📚", tKey: "learn.tab.refs", Icon: Books,
    color: "text-accent-foreground", bg: "bg-accent/40",
    title: "Манбаъ ва адабиёт",
    intro: "Феҳристи мукаммали ҳамаи манбаъҳои давлатӣ, байналмилалӣ, илмӣ ва ҳуқуқии AquaMap TJ.",
    highlights: [
      { v: "4", l: "Мақомоти давлатии ҶТ" },
      { v: "5", l: "Ташкилотҳои байналмилалӣ" },
      { v: "4", l: "Муассисаҳои илмӣ" },
      { v: "4+", l: "Ҳуҷҷатҳои ҳуқуқӣ" },
    ],
    sections: [
      { h: "Манбаъҳои расмии давлатӣ", body: "Вазорати энергетика ва захираҳои оби (ВЭРО, mewr.tj) — вазорати масъул. Кумитаи ҳифзи муҳити зист (tajnature.tj). Системаи миллии иттилооти об (NWIS, нақшаи Q3 2025). Кумитаи давлатии замин ва геодезия." },
      { h: "Ташкилотҳои байналмилалӣ", body: "UNEP (Атласи Тоҷикистон 2025) · FAO AQUASTAT · Бонки ҷаҳонӣ · Бонки Осиёгии Рушд (ADB) · UNECE — Конвенсияи об." },
      { h: "Манбаъҳои илмӣ", body: "Донишгоҳи миллии Тоҷикистон · Институти энергетика · Тадқиқоти пиряхшиносии АИ ҶТ · TajNCID — Маркази миллии рушди инноватсионӣ." },
      { h: "Ҳуҷҷатҳои ҳуқуқӣ", body: "Кодекси оби ҶТ (1993, бо тағйирот) · Стратегияи миллии об / Мақсади 2040 · Қонун дар бораи ҳифзи муҳити зист · Созишномаҳои байналмилалӣ тавассути ICWC." },
    ],
    links: [
      { label: "ВЭРО — Вазорати энергетика", href: "https://mewr.tj/" },
      { label: "Кумитаи ҳифзи муҳити зист", href: "https://www.tajnature.tj/" },
      { label: "UNEP", href: "https://www.unep.org/" },
      { label: "FAO AQUASTAT", href: "https://www.fao.org/aquastat/" },
      { label: "Бонки ҷаҳонӣ — Тоҷикистон", href: "https://data.worldbank.org/country/TJ" },
      { label: "Бонки Осиёгии Рушд", href: "https://www.adb.org/countries/tajikistan/main" },
      { label: "UNECE — Конвенсияи об", href: "https://unece.org/water" },
      { label: "ICWC", href: "http://www.icwc-aral.uz/" },
      { label: "Саҳифаи мукаммали манбаъҳо", href: "/sources" },
    ],
  },
};

export function getExtraTabs(lang: Lang): ExtraTab[] {
  return [basins[lang], policy[lang], intl[lang], refs[lang]];
}

const basins: Record<Lang, ExtraTab> = {
  en: {
    key: "basins", emoji: "🗺️", tKey: "learn.tab.basins", Icon: MapTrifold,
    color: "text-river", bg: "bg-river/10",
    title: "Water Basins of Tajikistan",
    intro: "Tajikistan has 4 major water basins, each with unique hydrology, transboundary relationships and climate vulnerability.",
    highlights: [
      { v: "40 km³", l: "Amu Darya (62.5%)" },
      { v: "13 km³", l: "Syr Darya (20.3%)" },
      { v: "10.5 km³", l: "Zeravshan (16.4%)" },
      { v: "40M+", l: "downstream people served" },
    ],
    sections: [
      { h: "Amu Darya Basin — 40 km³/yr (62.5%)", body: "Western Tajikistan. Formed by the Panj and Vakhsh rivers. Supplies Uzbekistan, Turkmenistan and Afghanistan (40M+ people). Challenge: winter water deficit. Provides ~55% of total Aral Sea basin water." },
      { h: "Syr Darya Basin — 13 km³/yr (20.3%)", body: "Northern Tajikistan. Shared with Kyrgyzstan and Uzbekistan. Key challenge: transboundary management and equitable seasonal allocation." },
      { h: "Zeravshan Basin — 10.5 km³/yr (16.4%)", body: "Central-western Tajikistan. A significant portion flows into Uzbekistan. Recurring dry-season deficits in lower reaches." },
      { h: "Other Basins — 0.5 km³/yr (0.8%)", body: "Various smaller tributaries draining to internal valleys or neighbouring catchments." },
      { h: "Special note — GBAO", body: "Gorno-Badakhshan (GBAO) faces unique challenges: limited arable land, deep river valleys that restrict access, very high dependence on glacier melt, and an outsized role in downstream water security." },
    ],
    facts: [
      { text: "Amu Darya basin generates 62.5% of national runoff and ~55% of Aral Sea basin water.", source: "FAO AQUASTAT", href: "https://www.fao.org/aquastat/" },
      { text: "GBAO depends almost entirely on glacier melt for seasonal flow.", source: "UNEP Atlas 2025", href: "https://www.unep.org/" },
    ],
  },
  ru: {
    key: "basins", emoji: "🗺️", tKey: "learn.tab.basins", Icon: MapTrifold,
    color: "text-river", bg: "bg-river/10",
    title: "Водные бассейны Таджикистана",
    intro: "В Таджикистане 4 основных водных бассейна, каждый — с уникальной гидрологией, трансграничной ролью и климатической уязвимостью.",
    highlights: [
      { v: "40 км³", l: "Амударья (62,5%)" },
      { v: "13 км³", l: "Сырдарья (20,3%)" },
      { v: "10,5 км³", l: "Зеравшан (16,4%)" },
      { v: "40+ млн", l: "пользователей ниже по течению" },
    ],
    sections: [
      { h: "Бассейн Амударьи — 40 км³/год (62,5%)", body: "Запад Таджикистана. Образуется реками Пяндж и Вахш. Снабжает Узбекистан, Туркменистан и Афганистан (40+ млн человек). Проблема: зимний дефицит воды. Даёт около 55% всей воды бассейна Аральского моря." },
      { h: "Бассейн Сырдарьи — 13 км³/год (20,3%)", body: "Север Таджикистана. Общий с Кыргызстаном и Узбекистаном. Ключевой вызов: трансграничное управление и сезонное распределение." },
      { h: "Бассейн Зеравшана — 10,5 км³/год (16,4%)", body: "Центрально-западный Таджикистан. Значительная часть стока уходит в Узбекистан. Регулярный сухосезонный дефицит." },
      { h: "Другие бассейны — 0,5 км³/год (0,8%)", body: "Малые притоки, дренирующие внутренние долины или соседние водосборы." },
      { h: "Особая заметка — ГБАО", body: "Горно-Бадахшанская область (ГБАО) сталкивается с уникальными вызовами: дефицит земель, глубокие речные долины, ограничивающие доступ, высокая зависимость от ледникового стока, важная роль в водной безопасности ниже по течению." },
    ],
    facts: [
      { text: "Бассейн Амударьи даёт 62,5% национального стока и ~55% воды бассейна Аральского моря.", source: "FAO AQUASTAT", href: "https://www.fao.org/aquastat/" },
      { text: "ГБАО практически полностью зависит от таяния ледников.", source: "UNEP Atlas 2025", href: "https://www.unep.org/" },
    ],
  },
  tj: {
    key: "basins", emoji: "🗺️", tKey: "learn.tab.basins", Icon: MapTrifold,
    color: "text-river", bg: "bg-river/10",
    title: "Ҳавзаҳои оби Тоҷикистон",
    intro: "Тоҷикистон 4 ҳавзаи асосии об дорад, ҳар яке бо гидрологияи беназир, нақши трансмарзӣ ва осебпазирии иқлимӣ.",
    highlights: [
      { v: "40 км³", l: "Амударё (62,5%)" },
      { v: "13 км³", l: "Сирдарё (20,3%)" },
      { v: "10,5 км³", l: "Зарафшон (16,4%)" },
      { v: "40+ млн", l: "истеъмолкунандагони поёноб" },
    ],
    sections: [
      { h: "Ҳавзаи Амударё — 40 км³/сол (62,5%)", body: "Ғарби Тоҷикистон. Аз Панҷ ва Вахш ташкил мешавад. Ӯзбекистон, Туркманистон ва Афғонистонро (40+ млн нафар) таъмин мекунад. Мушкилӣ: камобии зимистон. Тақрибан 55% оби ҳавзаи Арал." },
      { h: "Ҳавзаи Сирдарё — 13 км³/сол (20,3%)", body: "Шимоли Тоҷикистон. Бо Қирғизистон ва Ӯзбекистон муштарак. Чолиш: идоракунии трансмарзӣ ва тақсими мавсимӣ." },
      { h: "Ҳавзаи Зарафшон — 10,5 км³/сол (16,4%)", body: "Қисми марказӣ-ғарбӣ. Қисми зиёди ҷараён ба Ӯзбекистон меравад. Камобии мавсимии хушк." },
      { h: "Дигар ҳавзаҳо — 0,5 км³/сол (0,8%)", body: "Шохобҳои хурд, ки ба водиҳои дохилӣ ё ҳавзаҳои ҳамсоя мерезанд." },
      { h: "Қайди махсус — ГБАО", body: "Кӯҳистони Бадахшон (ГБАО) бо мушкилоти беназир: замини маҳдуд, водиҳои чуқури дарёӣ, вобастагии баланд ба обшавии пиряхҳо ва нақши муҳим дар амнияти обии поёноб." },
    ],
    facts: [
      { text: "Ҳавзаи Амударё 62,5% ҷараёни миллӣ ва ~55% оби ҳавзаи Аралро таъмин мекунад.", source: "FAO AQUASTAT", href: "https://www.fao.org/aquastat/" },
      { text: "ГБАО қариб пурра аз обшавии пиряхҳо вобаста аст.", source: "UNEP Atlas 2025", href: "https://www.unep.org/" },
    ],
  },
};

export interface WaterType {
  key: string;
  emoji: string;
  Icon: typeof Drop;
  color: string;
  bg: string;
  name: string;
  def: string;
}

const waterTypesData: Record<Lang, WaterType[]> = {
  en: [
    { key: "surface", emoji: "🌊", Icon: Waves, color: "text-river", bg: "bg-river/10",
      name: "Surface Water", def: "Rivers, streams and lakes — visible flow that drains the landscape." },
    { key: "ground", emoji: "💧", Icon: Drop, color: "text-info", bg: "bg-info/10",
      name: "Groundwater", def: "Water stored in subsurface aquifers; tapped via wells and springs." },
    { key: "glacier", emoji: "🏔️", Icon: Snowflake, color: "text-glacier", bg: "bg-glacier/15",
      name: "Glacier Water", def: "Frozen freshwater reserves released through seasonal melt." },
    { key: "reservoir", emoji: "🏞️", Icon: Cube, color: "text-primary", bg: "bg-primary-soft",
      name: "Reservoirs", def: "Engineered storage behind dams — supports energy and irrigation." },
    { key: "drinking", emoji: "🚰", Icon: Bank, color: "text-success", bg: "bg-success/10",
      name: "Drinking Water", def: "Treated, safe-to-consume water delivered through public networks." },
  ],
  ru: [
    { key: "surface", emoji: "🌊", Icon: Waves, color: "text-river", bg: "bg-river/10",
      name: "Поверхностные воды", def: "Реки, ручьи и озёра — видимый сток, дренирующий ландшафт." },
    { key: "ground", emoji: "💧", Icon: Drop, color: "text-info", bg: "bg-info/10",
      name: "Подземные воды", def: "Воды, накапливаемые в водоносных горизонтах; забор через скважины и родники." },
    { key: "glacier", emoji: "🏔️", Icon: Snowflake, color: "text-glacier", bg: "bg-glacier/15",
      name: "Ледниковые воды", def: "Замёрзшие пресные запасы, высвобождаемые при сезонном таянии." },
    { key: "reservoir", emoji: "🏞️", Icon: Cube, color: "text-primary", bg: "bg-primary-soft",
      name: "Водохранилища", def: "Искусственные накопители за плотинами — для энергии и ирригации." },
    { key: "drinking", emoji: "🚰", Icon: Bank, color: "text-success", bg: "bg-success/10",
      name: "Питьевая вода", def: "Очищенная вода, безопасная для потребления, в публичных сетях." },
  ],
  tj: [
    { key: "surface", emoji: "🌊", Icon: Waves, color: "text-river", bg: "bg-river/10",
      name: "Обҳои сатҳӣ", def: "Дарёҳо, ҷӯйборҳо ва кӯлҳо — ҷараёни намоёни манзара." },
    { key: "ground", emoji: "💧", Icon: Drop, color: "text-info", bg: "bg-info/10",
      name: "Обҳои зеризаминӣ", def: "Об дар уфуқҳои зеризаминӣ; тавассути чоҳҳо ва чашмаҳо гирифта мешавад." },
    { key: "glacier", emoji: "🏔️", Icon: Snowflake, color: "text-glacier", bg: "bg-glacier/15",
      name: "Обҳои пирях", def: "Захираҳои оби яхбаста, ки бо обшавии мавсимӣ озод мешаванд." },
    { key: "reservoir", emoji: "🏞️", Icon: Cube, color: "text-primary", bg: "bg-primary-soft",
      name: "Обанборҳо", def: "Захирагоҳҳои сунъӣ дар паси сарбандҳо — барои нерӯ ва обёрӣ." },
    { key: "drinking", emoji: "🚰", Icon: Bank, color: "text-success", bg: "bg-success/10",
      name: "Оби нӯшокӣ", def: "Оби тозашуда ва бехатар, ки тавассути шабакаҳои оммавӣ паҳн мешавад." },
  ],
};

export function getWaterTypes(lang: Lang): WaterType[] {
  return waterTypesData[lang];
}
