import type { LocalizedContent } from "@/types/content";

export const nl: LocalizedContent = {
  projects: {
    "real-estate-platform": {
      title: "Full-stack vastgoedplatform",
      summary:
        "Een woningplatform met zoeken en filteren, kaartweergave, gebruikersaccounts, realtime privéberichten en een beheeromgeving.",
      role: "Eigen project: datamodel, REST API, realtime service, frontend en deployment.",
      overview:
        "Een full-stack webapplicatie waarop gebruikers woningen te koop of te huur aanbieden, aanbod zoeken en filteren, woningen op de kaart bekijken, favorieten bewaren en elkaar privé berichten sturen. Ik heb alle onderdelen zelf gebouwd: het datamodel in MongoDB, de REST API in Express, een aparte Socket.IO-service voor berichten, de React-client en de deployment op Render.",
      purpose:
        "Een woningplatform brengt twee partijen samen: aanbieders en woningzoekers. Daarvoor zijn gestructureerde, filterbare gegevens nodig, een kaart om de locatie te beoordelen en een directe manier om contact te leggen zonder het platform te verlaten. Het project dekt die volledige flow, inclusief moderatie door een beheerder.",
      responsibilities: [
        "Het datamodel ontworpen in Prisma voor gebruikers, woningen, woningdetails, bewaarde woningen, chats en berichten.",
        "De REST API in Express gebouwd voor authenticatie, gebruikers, woningen, chats, berichten en beheer.",
        "Authenticatie met JWT in cookies geïmplementeerd, met middleware per route en een aparte beheerderssessie.",
        "De React-client gebouwd: zoeken, filters, kaartweergave, woningpagina's, profiel, woningeditor en chat.",
        "De uploadwidget van Cloudinary geïntegreerd voor woningfoto's en avatars.",
        "Een aparte Socket.IO-server gebouwd voor het realtime afleveren van berichten.",
        "De client, de API en de socketserver als afzonderlijke services op Render uitgerold.",
      ],
      architecture: {
        intro: "De applicatie bestaat uit drie services die via de API één MongoDB-database delen.",
        items: [
          {
            title: "Client",
            body: "Een React-SPA gebouwd met Vite. Data loaders van React Router halen woningen en profielgegevens op met uitgestelde responses, zodat pagina's al renderen terwijl de data binnenkomt. Zustand beheert de teller voor ongelezen berichten; React context bevat de ingelogde gebruiker en de socketverbinding. Kaarten gebruiken Leaflet via react-leaflet.",
          },
          {
            title: "REST API",
            body: "Node.js en Express met resource-routes onder /api/auth, /api/users, /api/posts, /api/chats, /api/messages en /api/admin. Prisma vormt de datalaag bovenop MongoDB.",
          },
          {
            title: "Realtime service",
            body: "Een losse Socket.IO-server houdt bij welke gebruikers online zijn en stuurt nieuwe berichten alleen door naar de ontvanger. Berichten worden via de REST API opgeslagen, zodat de geschiedenis niet afhangt van de socketverbinding.",
          },
          {
            title: "Datamodel",
            body: "Prisma-modellen voor User, Post, PostDetail (één-op-één met Post), SavedPost (uniek per gebruiker en woning), Chat en Message. Enums beperken het type aanbod (koop, huur), het woningtype en de staat van onderhoud.",
          },
        ],
      },
      features: [
        "Zoeken met filters op stad, koop of huur, woningtype, slaapkamers en prijsklasse, uitgevoerd in de databasequery op de server.",
        "Kaartweergave met een pin voor elke woning in de resultaten.",
        "Woningpagina's met fotoslider, kenmerken en afstanden tot de dichtstbijzijnde school, bushalte en restaurant.",
        "Woningeditor met opgemaakte omschrijving en upload van meerdere foto's naar Cloudinary.",
        "Gebruikersprofielen met eigen woningen, bewaarde woningen en gesprekken.",
        "Realtime privéberichten tussen gebruikers, met leesstatus en een teller voor ongelezen gesprekken in de navigatie.",
        "Beheeromgeving met een eigen login om gegevens te bekijken en woningen of gebruikers te verwijderen.",
      ],
      decisions: [
        {
          title: "JWT in een httpOnly-cookie",
          body: "Het token wordt als httpOnly-cookie uitgegeven in plaats van in localStorage bewaard, zodat scripts in de browser het niet kunnen uitlezen. Beveiligde routes gaan via Express-middleware die het token controleert en het gebruikers-ID aan de request toevoegt.",
        },
        {
          title: "Aparte beheerderssessie",
          body: "Beheer gebruikt een eigen cookie en een rolclaim die door aparte middleware wordt gecontroleerd. Een gewoon gebruikerstoken komt dus nooit bij de beheer-endpoints.",
        },
        {
          title: "Prisma op MongoDB",
          body: "Prisma geeft een expliciet, getypeerd schema met relaties bovenop een documentdatabase. Daardoor blijven queries zoals het filteren van woningen of het tellen van ongelezen chats goed leesbaar.",
        },
        {
          title: "Berichten als eigen service",
          body: "Door Socket.IO buiten de REST API te houden, blijft de API stateless en kunnen beide onderdelen los van elkaar worden uitgerold en herstart.",
        },
        {
          title: "Opgeschoonde opgemaakte tekst",
          body: "Omschrijvingen worden met een rich-text-editor geschreven en vóór weergave met DOMPurify opgeschoond, zodat opgeslagen HTML geen scripts kan injecteren.",
        },
      ],
      challenges: [
        {
          title: "Berichten bij de juiste persoon afleveren",
          body: "Elke verbonden client meldt zijn gebruikers-ID aan bij de socketserver. Bij een nieuw bericht zoekt de server de socket van de ontvanger op en stuurt het alleen naar die persoon. Is de ontvanger offline, dan wordt het bericht toch via de API opgeslagen en verschijnt het bij het volgende bezoek.",
        },
        {
          title: "Een betrouwbare teller voor ongelezen berichten",
          body: "Elke chat houdt bij welke gebruikers het laatste bericht hebben gezien. Een chat openen markeert hem als gelezen, en de teller is één query naar chats waarin de gebruiker deelneemt maar nog niet als lezer staat.",
        },
        {
          title: "Drie services, één origin-beleid",
          body: "Omdat client, API en socketserver op verschillende hosts draaien, is CORS ingesteld met expliciet toegestane origins en credentials, zodat de authenticatiecookies met elke request worden meegestuurd.",
        },
      ],
      imageAlts: {
        "home.png": "Startpagina van het vastgoedplatform met het zoekformulier",
        "listings.webp": "Zoekresultaten naast een kaart met pins per woning",
        "listing.webp": "Woningpagina met fotogalerij en voorzieningen in de buurt",
      },
      metaDescription:
        "Case study: een full-stack vastgoedplatform gebouwd met React, Node.js, Express, Prisma, MongoDB en Socket.IO, met kaartzoeken en realtime berichten.",
    },
    "pharmacovigilance-website": {
      title: "Sokola PV — website voor geneesmiddelenbewaking",
      summary:
        "Een tweetalige (Engels en Oekraïens) bedrijfswebsite voor een aanbieder van farmacovigilantiediensten, gebouwd met Next.js en uitgerold als statische site.",
      role: "Webontwikkeling: implementatie in Next.js, paginastructuur, meertaligheid en statische deployment.",
      overview:
        "De website van Sokola PV presenteert de farmacovigilantiediensten van het bedrijf en de opleidingen, waaronder de cursus “Pharmacovigilance in Simple Words”. De site is gebouwd met de App Router van Next.js 14 en als statische site geëxporteerd, met een Engelse en een Oekraïense versie.",
      purpose:
        "Het bedrijf had een duidelijke, betrouwbare online aanwezigheid nodig voor twee doelgroepen: farmaceutische bedrijven die farmacovigilantiediensten zoeken en professionals uit de sector die een opleiding zoeken. De site moest zes verschillende diensten uitleggen, de opleidingen presenteren en contact opnemen makkelijk maken, in het Engels en het Oekraïens.",
      responsibilities: [
        "De website gebouwd met Next.js 14 en de App Router.",
        "De inhoud gestructureerd in een startpagina, over ons, zes dienstpagina's, opleidingen en contact.",
        "De Engelse en Oekraïense versie opgezet, met een taalkeuze in de header.",
        "De huisstijl vertaald naar een consistente set typografie, kleuren en componenten.",
        "Statische generatie en export ingericht en de site via een GitHub-workflow naar Hostinger uitgerold.",
      ],
      architecture: {
        intro: "Dit is een contentwebsite, dus de architectuur draait om routing, contentstructuur en levering, niet om een backend.",
        items: [
          {
            title: "Statische generatie",
            body: "Elke pagina wordt tijdens de build vooraf gerenderd en als statische HTML geëxporteerd. In productie is er geen applicatieserver, wat de hosting eenvoudig en de pagina's snel houdt.",
          },
          {
            title: "Contentstructuur",
            body: "Elke dienst heeft een eigen pagina onder /services/, de opleidingen staan onder /education/ en de startpagina verwijst naar beide.",
          },
          {
            title: "Meertaligheid",
            body: "Het Engels staat op de hoofdroute en de Oekraïense versie onder /ua/. De opleidingen zelf worden in het Oekraïens gegeven; dat staat ook expliciet op de Engelse pagina's.",
          },
          {
            title: "Deployment",
            body: "De geëxporteerde build wordt vanuit de GitHub-repository op statische hosting bij Hostinger gepubliceerd.",
          },
        ],
      },
      features: [
        "Startpagina die het bedrijf, de diensten en het opleidingsaanbod introduceert.",
        "Zes aparte dienstpagina's, van het uitvoeren van farmacovigilantieprocessen tot audits en crisismanagement.",
        "Opleidingssectie met de trainingsprogramma's, waaronder “Pharmacovigilance in Simple Words”.",
        "Engelse en Oekraïense versie met een taalkeuze in de header.",
        "Contactsectie met e-mail, telefoon en links naar messengers.",
      ],
      decisions: [
        {
          title: "Statische export in plaats van een server",
          body: "De inhoud verandert zelden en er zijn geen gebruikersaccounts. Een statische export levert snelle pagina's op, zonder server om te onderhouden en met goedkope hosting.",
        },
        {
          title: "Eén pagina per dienst",
          body: "Elke dienst een eigen URL geven houdt de pagina's gericht en maakt ze afzonderlijk deelbaar en vindbaar in zoekmachines.",
        },
        {
          title: "Gedeeld designsysteem",
          body: "Typografie, kleuren en componenten zijn één keer gedefinieerd en worden hergebruikt, zodat nieuwe pagina's aansluiten op de huisstijl.",
        },
      ],
      challenges: [
        {
          title: "Tweetalige inhoud zonder server",
          body: "Bij een statische export is er geen taaldetectie op de server. Daarom heeft elke taal eigen, vooraf gerenderde routes en kiest de bezoeker zelf de taal.",
        },
        {
          title: "Specialistisch onderwerp",
          body: "Farmacovigilantie kent precieze terminologie. Door elke dienst een eigen pagina met een duidelijke kop te geven, vinden bezoekers snel de dienst die ze zoeken.",
        },
      ],
      imageAlts: {
        "home.png": "Startpagina van Sokola PV in het Engels",
        "service.png": "Dienstpagina van Sokola PV over audits van farmacovigilantiesystemen",
        "education.png": "Pagina met de opleidingen van Sokola PV",
        "home-ua.png": "Startpagina van Sokola PV in het Oekraïens",
      },
      metaDescription:
        "Case study: de website van Sokola PV, een tweetalige statische Next.js 14-site voor een aanbieder van farmacovigilantiediensten.",
    },
    "iphone-3d": {
      title: "iPhone 3D",
      summary: "Een interactieve 3D-productviewer voor een iPhone-model, gebouwd met React Three Fiber en geanimeerd met GSAP.",
      role: "Eigen project: 3D-scène, interactie, animatie en deployment.",
      overview:
        "Een experiment in productpresentatie, in de stijl van een premium productpagina. Bezoekers draaien een iPhone-model rond, kiezen uit vijf afwerkingen en wisselen tussen 6,1″ en 6,7″, met een geanimeerde overgang tussen beide formaten.",
      purpose:
        "Het doel was leren hoe je een fysiek product interactief op het web presenteert: een 3D-model laden, het overtuigend belichten, bezoekers het laten bekijken en statuswijzigingen vloeiend animeren — terwijl de scène licht genoeg blijft voor een gewone browser.",
      responsibilities: [
        "De scène in React Three Fiber opgezet, met camera, besturing en belichting.",
        "Het GLB-model en de texturen geladen en de materialen per afwerking opnieuw ingekleurd.",
        "De formaatkeuze gebouwd met een GSAP-tijdlijn die tussen twee weergaven overgaat.",
        "De interface vormgegeven met Tailwind CSS en het project op Vercel uitgerold.",
      ],
      architecture: {
        intro: "Een single-page React-applicatie gebouwd met Vite. Three.js wordt gebruikt via React Three Fiber.",
        items: [
          {
            title: "Rendering",
            body: "Eén Canvas rendert twee View-componenten van Drei via View.Port, zodat beide formaten één WebGL-context delen in plaats van er twee aan te maken.",
          },
          {
            title: "Model en materialen",
            body: "De telefoon is een GLB-model dat met useGLTF wordt geladen. Bij het kiezen van een afwerking krijgen de materialen van de behuizing een nieuwe kleur; scherm- en cameramaterialen blijven ongewijzigd.",
          },
          {
            title: "Belichting",
            body: "Een Environment van Drei, opgebouwd uit Lightformer-panelen, zorgt voor studioachtige reflecties zonder een HDR-bestand te laden.",
          },
          {
            title: "Animatie",
            body: "GSAP animeert via de hook uit @gsap/react de overgang tussen formaten: de rotatie van het model en beide weergaven bewegen in één tijdlijn.",
          },
        ],
      },
      features: [
        "Het model ronddraaien met OrbitControls; zoomen en pannen zijn uitgeschakeld voor een consistente kadrering.",
        "Vijf kleurafwerkingen die de materialen van het model direct aanpassen.",
        "Wisselen tussen 6,1″ en 6,7″ met een geanimeerde overgang tussen twee weergaven.",
        "Laadindicator terwijl het model en de texturen worden opgehaald.",
      ],
      decisions: [
        {
          title: "React Three Fiber in plaats van puur Three.js",
          body: "Door de scène declaratief als React-componenten te beschrijven, zit de 3D-status (kleur, formaat, rotatie) in hetzelfde model als de rest van de interface.",
        },
        {
          title: "Eén canvas voor twee weergaven",
          body: "Browsers beperken het aantal WebGL-contexten en elke context kost geheugen. Met View van Drei delen beide formaten één canvas.",
        },
        {
          title: "Beperkte camera",
          body: "Zonder zoomen en pannen blijft het product zoals bedoeld in beeld en ontstaan er op touchscreens geen onhandige camerastanden.",
        },
      ],
      challenges: [
        {
          title: "Rotatie behouden bij wisselen",
          body: "Draait een bezoeker het ene model en kiest hij daarna een ander formaat, dan neemt de GSAP-tijdlijn de opgeslagen hoek van de besturing over. De overgang gaat dus verder waar de bezoeker was gebleven.",
        },
        {
          title: "Alleen de juiste onderdelen inkleuren",
          body: "Het model heeft veel materialen. Scherm, lenzen en details van het frame worden op naam uitgesloten, zodat alleen de behuizing van kleur verandert.",
        },
      ],
      imageAlts: {
        "viewer.png": "Interactief 3D-model van een iPhone met knoppen voor kleur en formaat",
        "viewer-large.png": "iPhone 3D-viewer met het grotere model van 6,7 inch",
      },
      metaDescription:
        "Case study: een interactieve 3D-viewer voor een iPhone, gebouwd met React Three Fiber, Three.js en GSAP.",
    },
    "taxi-next-app": {
      title: "Taxi Next App",
      summary:
        "Een webapp om een rit te boeken: inloggen, een route kiezen op Google Maps, een ritklasse selecteren en betalen met Stripe.",
      role: "Eigen project: frontend, API-route en integraties met externe diensten.",
      overview:
        "Een webapplicatie in de stijl van een taxi-app, gebouwd met de App Router van Next.js. Ingelogde gebruikers vullen een ophaalpunt en een bestemming in, zien de rijroute op de kaart, vergelijken ritklassen met een prijs op basis van de afstand en betalen via Stripe.",
      purpose:
        "Het project onderzoekt hoe een boekingsflow in elkaar zit wanneer externe diensten het meeste werk doen: authenticatie door Clerk, locaties en routes door Google Maps en betalingen door Stripe. De nadruk ligt op het samenbrengen daarvan in één logische gebruikersflow.",
      responsibilities: [
        "De boekingsinterface gebouwd met Next.js, React en Tailwind CSS.",
        "Clerk geïntegreerd voor registratie, inloggen en het afschermen van routes via middleware.",
        "Google Places-autocomplete, kaartmarkeringen en rijroutes geïntegreerd.",
        "Prijsberekening op basis van afstand voor meerdere ritklassen geïmplementeerd.",
        "De Stripe-checkout gebouwd met het Payment Element en een serverroute die de PaymentIntent aanmaakt.",
      ],
      architecture: {
        intro: "Een Next.js 13-applicatie met de App Router. Servercode is beperkt tot één API-route voor betalingen.",
        items: [
          {
            title: "Authenticatie",
            body: "De middleware van Clerk beschermt alle pagina's en API-routes; inloggen en registreren gebruiken de kant-en-klare componenten van Clerk op eigen routes.",
          },
          {
            title: "Boekingsstatus",
            body: "Ophaalpunt en bestemming staan in twee React-contexts die door het zoekformulier en de kaart worden gedeeld.",
          },
          {
            title: "Kaarten",
            body: "De Google Maps JavaScript API laadt met de Places-bibliotheek. Autocomplete-velden leveren coördinaten op, de kaart schuift naar de gekozen plek en de Directions-service tekent de rijroute.",
          },
          {
            title: "Betalingen",
            body: "De client toont het Payment Element van Stripe. Bij het afrekenen maakt een route handler van Next.js op de server een PaymentIntent aan met de geheime sleutel en geeft alleen het client secret terug.",
          },
        ],
      },
      features: [
        "Registreren en inloggen, met alle routes van de app afgeschermd.",
        "Velden voor ophaalpunt en bestemming met Google Places-autocomplete.",
        "Kaart met markeringen en de rijroute tussen beide punten.",
        "Ritklassen met aantal zitplaatsen en een prijs op basis van de ritafstand.",
        "Betaalpagina met het Payment Element van Stripe.",
      ],
      decisions: [
        {
          title: "Beheerde authenticatie",
          body: "Met Clerk in plaats van een eigen authenticatiesysteem waren veilige sessies en inlogflows geregeld zonder zelf wachtwoorden op te slaan. Zo bleef er tijd over voor de boekingsflow zelf.",
        },
        {
          title: "Geheime sleutel blijft op de server",
          body: "De geheime sleutel van Stripe wordt alleen in de route handler gebruikt; de browser krijgt uitsluitend het client secret van de PaymentIntent.",
        },
        {
          title: "Context in plaats van een state-bibliotheek",
          body: "Er worden maar twee waarden gedeeld — ophaalpunt en bestemming — dus React context volstond zonder extra afhankelijkheid.",
        },
      ],
      challenges: [
        {
          title: "Kaart en formulier op elkaar afstemmen",
          body: "De kaart reageert op wijzigingen in beide locaties: hij schuift naar een nieuw ophaalpunt en vraagt een nieuwe route op zodra beide punten bekend zijn.",
        },
        {
          title: "Prijs op basis van afstand",
          body: "De ritafstand wordt nu in een rechte lijn berekend met de geometry-bibliotheek van Maps. Een logische volgende stap is de prijs baseren op de routeafstand uit de Directions-service.",
        },
      ],
      imageAlts: {
        "search.png": "Zoekpaneel van Taxi Next App naast een kaart",
        "rides.png": "Lijst met ritklassen en prijzen voor de gekozen route",
        "payment.png": "Betaalformulier van Stripe in Taxi Next App",
      },
      metaDescription:
        "Case study: Taxi Next App, een webapp om ritten te boeken, gebouwd met Next.js, Clerk, de Google Maps API en Stripe.",
    },
  },
  experience: {
    darkbot: {
      position: "Front-end developer",
      product: "AI-gedreven platform voor cryptohandel (FinTech)",
      points: [
        "Productie-applicaties gebouwd als SPA en met SSR, met React, Next.js en TypeScript.",
        "De frontendarchitectuur ontwikkeld voor tradingdashboards, analyse-interfaces en marketingpagina's.",
        "Een herbruikbaar internationaliseringssysteem met next-i18next opgezet voor meerdere talen.",
        "Responsieve interfaces opgeleverd die in alle gangbare browsers werken, op desktop en mobiel.",
        "Productieproblemen onderzocht en opgelost in samenwerking met de backend- en productteams.",
        "Gefocust op performance, onderhoudbaarheid en een betrouwbare gebruikerservaring.",
      ],
    },
    enactus: {
      position: "Full-stack engineer",
      product: "Webplatforms voor educatieve en humanitaire initiatieven",
      points: [
        "Responsieve, componentgebaseerde webapplicaties ontwikkeld voor educatieve en humanitaire initiatieven.",
        "Gebruikersinterfaces gebouwd met React en Redux.",
        "REST API's geïntegreerd en bijgedragen aan betrouwbare communicatie tussen frontend en backend.",
        "Met ontwerpers en backendontwikkelaars eisen vertaald naar onderhoudbare frontendoplossingen.",
        "Herbruikbare UI-componenten gerefactord en bijgedragen aan verbeteringen in performance en browsercompatibiliteit.",
      ],
    },
  },
  education: {
    mate: { programme: "Opleiding Full-Stack Developer" },
    kneu: { programme: "Bachelor Computer Science" },
  },
  skillNotes: {
    React: "Dagelijks gebruikt bij Darkbot en in al mijn eigen projecten.",
    "Next.js": "SSR- en SPA-applicaties bij Darkbot; App Router-sites zoals Sokola PV en dit portfolio.",
    TypeScript: "Productiecode bij Darkbot; getypeerde content en componenten in dit portfolio.",
    "Node.js": "REST API in Express en Socket.IO-server voor het vastgoedplatform.",
    Redux: "State management bij Darkbot en Enactus KNEU.",
    Zustand: "Lichte globale state in het vastgoedplatform.",
    "Styled Components": "Styling van componenten bij Darkbot.",
    "Three.js": "3D-productviewer via React Three Fiber.",
    GSAP: "Animatietijdlijnen in iPhone 3D en scroll-animaties op deze site.",
    "WebSockets / Socket.IO": "Realtime privéberichten in het vastgoedplatform.",
    "JWT authentication": "Sessies met JWT in cookies in het vastgoedplatform.",
    "Stripe API": "Checkout met het Payment Element in Taxi Next App.",
    "Prisma ORM": "Datamodel en queries op MongoDB in het vastgoedplatform.",
    MongoDB: "Primaire database van het vastgoedplatform.",
  },
};
