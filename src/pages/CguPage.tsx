import { LegalLayout } from "@/components/LegalLayout";

const CguPage = () => {
  return (
    <LegalLayout title="Conditions Générales d'Utilisation (CGU)" lastUpdated="23 mars 2026">
      <p>
        Les présentes Conditions Générales d'Utilisation (ci-après "CGU") ont pour objet de définir les modalités de mise à disposition et d'utilisation du service Docusûr, édité par la société KAYZEN SAS.
      </p>

      <h2>1. Présentation du Service</h2>
      <p>
        Docusûr est une suite d'outils de traitement de documents (PDF, images, audio, vidéo) fonctionnant selon une architecture dite "Zero-Server". Le service est conçu selon les principes de "Privacy-by-Design" : l'intégralité du traitement des fichiers s'effectue localement dans le navigateur web de l'utilisateur, sans aucun transfert de contenu vers les serveurs de KAYZEN ou de tiers.
      </p>

      <h2>2. Accès et Gratuité</h2>
      <p>
        L'accès au service Docusûr est entièrement gratuit et illimité pour tous les utilisateurs. KAYZEN met gracieusement à disposition ces outils afin de promouvoir un web plus sûr et respectueux de la vie privée.
      </p>
      <p>
        Aucune souscription, aucun compte et aucun paiement ne sont requis pour accéder à l'intégralité des fonctionnalités du service.
      </p>

      <h2>3. Responsabilité de l'Utilisateur</h2>
      <p>
        L'utilisateur est seul responsable des documents qu'il choisit de traiter via Docusûr. KAYZEN n'ayant aucun accès aux fichiers traités (traitement exclusif en mémoire vive - RAM - de l'appareil de l'utilisateur), KAYZEN ne peut être tenue responsable du contenu des documents, de leur éventuelle perte en cours de traitement ou de toute utilisation illicite des outils mis à disposition.
      </p>
      <p>
        L'utilisateur s'engage à ne pas utiliser le service à des fins illégales ou contraires à l'ordre public.
      </p>

      <h2>4. Propriété Intellectuelle</h2>
      <p>
        La structure générale du site Docusûr, ainsi que les textes, graphismes, images, sons et vidéos la composant, sont la propriété de KAYZEN ou de ses partenaires. Toute représentation et/ou reproduction et/ou exploitation partielle ou totale des contenus et services proposés par le site Docusûr, par quelque procédé que ce soit, sans l'autorisation préalable et par écrit de KAYZEN est strictement interdite.
      </p>

      <h2>5. Disponibilité du Service</h2>
      <p>
        KAYZEN s'efforce de permettre l'accès au site 24 heures sur 24, 7 jours sur 7, sauf en cas de force majeure ou d'un événement hors du contrôle de KAYZEN, et sous réserve des éventuelles pannes et interventions de maintenance nécessaires au bon fonctionnement du site et des services.
      </p>

      <h2>6. Droit Applicable et Juridiction</h2>
      <p>
        Les présentes CGU sont régies par le droit français. En cas de litige relatif à l'interprétation ou à l'exécution des présentes, et à défaut d'accord amiable, les tribunaux de <strong>Lyon</strong> seront seuls compétents.
      </p>
    </LegalLayout>
  );
};

export default CguPage;
