import OPEN_LINK_ICON from "../../../assets/icons/arrow-top-right.svg";
import { FACEBOOK_EVENT_LINK } from "../../../services/Links";

export const headerTextPL = "Czym jest Dzień Wydziału EEIA?";
export const headerTextEN = "What is EEIA's department day?";

export const descriptionTextPL = () => (
  <>
    {"Dzień Wydziału Elektrotechniki, Elektroniki, Informatyki i Automatyki Politechniki Łódzkiej to wydarzenie skierowane do studentów naszego wydziału oraz uczniów szkół średnich."}
    <h4 className="about-description-header">Kiedy?</h4>
    {"W tym roku odbędzie się ono już 26 marca i będzie trwało dwa dni. Pierwszego dnia (26 marca) zapraszamy firmy oraz studentów i uczniów szkół średnich, natomiast drugiego dnia (27 marca) zapraszamy wyłącznie szkoły."}
    <h4 className="about-description-header">Gdzie?</h4>
    {"W głównym budynku wydziału EEIA przy ulicy Stefanowskiego 18/22"}
    <h4 className="about-description-header">Dlaczego warto przyjść?</h4>
    {"Jako student będziesz miał możliwość zapoznać się z ofertami staży i praktyk, porozmawiać z potencjalnymi pracodawcami oraz nabyć cenne umiejętności podczas organizowanych szkoleń."}
    <br />
    <br />
    {"Jako uczeń szkoły średniej będziesz miał okazję poznać nasz wydział, uzyskać odpowiedzi na wszelkie pytania dotyczące studiowania, a także upewnić się w wyborze odpowiedniego kierunku."}
    <h4 className="about-description-header">Dowiedz się więcej</h4>
    {"Zachęcamy do dołączenia do "}
    <a
      className="text-link"
      href={FACEBOOK_EVENT_LINK}
      target="_blank"
      rel="noopener noreferrer"
    >
      wydarzenia na Facebooku
      <img className="open-link-icon" src={OPEN_LINK_ICON} />
    </a>
    {" gdzie można znaleźć wszystkie najważniejsze informacje dotyczące DW EEIA 2025."}
  </>
);

export const descriptionTextEN = () => (
  <>
    {"The Day of the Faculty of Electrical, Electronic, Computer and Control Engineering at Lodz University of Technology is an event aimed at students of our faculty and high school students."}
    <h4 className="about-description-header">When?</h4>
    {"This year it will take place on March 20st."}
    <h4 className="about-description-header">Where?</h4>
    {"Event will take place in the main EEIA building (Stefanowskiego 18/22)"}
    <h4 className="about-description-header">Why should you come?</h4>
    {"Students will have the opportunity to find internship and job offers, talk to potential employers, and gain valuable skills during the organized trainings."}
    <br />
    <br />
    {"High school students, on the other hand, will have the opportunity to get to know our faculty, get answers to all questions related to studying, and ensure the choice of the appropriate field of study."}
    <h4 className="about-description-header">Find out more</h4>
    {"We encourage you to join "}
    <a
      className="text-link"
      href={FACEBOOK_EVENT_LINK}
      target="_blank"
      rel="noopener noreferrer"
    >
      the event on Facebook
      <img className="open-link-icon" src={OPEN_LINK_ICON} />
    </a>
    {" where you can find all the important information about DW EEIA 2025."}
  </>
);
