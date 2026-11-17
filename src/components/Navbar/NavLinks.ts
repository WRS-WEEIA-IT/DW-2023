import { EVENT_VISIBILITY } from '../../constants/EventVisibility';

interface navLinkInterface {
  title: string;
  sectionId: string;
}

export const WELCOME_SECTION_ID = '#welcome-section';
const EVENTS_SECTION_ID = '#events-section';
const REGULAMIN_SECTION_ID = '#regulamin-section';
const GAME_SECTION_ID = '#game-section';
const PARTNERS_SECTION_ID = '#partners-section';
const FOOTER_SECTION_ID = '#footer-section';

export const navLinksPL: navLinkInterface[] = [
  { title: 'Strona Główna', sectionId: WELCOME_SECTION_ID },
  ...(EVENT_VISIBILITY.regulations
    ? [{ title: 'Regulamin', sectionId: REGULAMIN_SECTION_ID }]
    : []),
  { title: 'Gra Terenowa', sectionId: GAME_SECTION_ID },
  ...(EVENT_VISIBILITY.schedule
    ? [{ title: 'Harmonogram', sectionId: EVENTS_SECTION_ID }]
    : []),
  { title: 'Partnerzy DW2026', sectionId: PARTNERS_SECTION_ID },
  { title: 'Kontakt', sectionId: FOOTER_SECTION_ID },
];
export const navLinksEN: navLinkInterface[] = [
  { title: 'Home', sectionId: WELCOME_SECTION_ID },
  ...(EVENT_VISIBILITY.regulations
    ? [{ title: 'Terms', sectionId: REGULAMIN_SECTION_ID }]
    : []),
  { title: 'Field Game', sectionId: GAME_SECTION_ID },
  ...(EVENT_VISIBILITY.schedule
    ? [{ title: 'Schedule', sectionId: EVENTS_SECTION_ID }]
    : []),
  { title: 'Partners DW2026', sectionId: PARTNERS_SECTION_ID },
  { title: 'Contact', sectionId: FOOTER_SECTION_ID },
];
