import { LegalLayout } from "@/components/LegalLayout";

const MentionsLegalesPage = () => {
  return (
    <LegalLayout title="Mentions Légales" lastUpdated="23 mars 2026">
      <h2>1. Éditeur du site</h2>
      <p>
        Le site Docusûr est édité par la société <strong>KAYZEN</strong>, Société par Actions Simplifiée (SAS) au capital de 1 000 euros.<br />
        <strong>Siège social :</strong> 6 rue Pierre Termier, 69009 Lyon, France.<br />
        <strong>SIREN :</strong> 999 418 346<br />
        <strong>RCS :</strong> Lyon<br />
        <strong>Représentant Légal :</strong> M. Tarek Belhadj<br />
        <strong>Contact :</strong> contact@kayzen.fr
      </p>

      <h2>2. Présentation du Service</h2>
      <p>
        Docusûr est une suite d'outils de traitement documentaire (PDF, images, audio, vidéo) fonctionnant de manière 100% locale dans le navigateur de l'utilisateur. Aucun fichier traité ne transite par les serveurs de KAYZEN.
      </p>

      <h2>3. Hébergement</h2>
      <p>
        Le site est hébergé par la société <strong>EX2 Inc.</strong> (Infrastructure Éco-responsable).<br />
        Les serveurs sont localisés exclusivement en France et dans l'Union Européenne.<br />
        Datacenters alimentés par des énergies renouvelables.
      </p>

      <h2>4. Propriété intellectuelle</h2>
      <p>
        L'ensemble du contenu du site Docusûr (textes, graphismes, logo, icônes, code source) est la propriété exclusive de KAYZEN ou de ses partenaires. Toute reproduction, représentation, modification ou exploitation non autorisée est interdite et constitue une contrefaçon au sens des articles L.335-2 et suivants du Code de la propriété intellectuelle.
      </p>

      <h2>5. Limitation de responsabilité</h2>
      <p>
        KAYZEN s'efforce de fournir des informations aussi précises que possible. Toutefois, elle ne pourra être tenue responsable des omissions, inexactitudes ou carences dans la mise à jour. L'utilisation des outils Docusûr se fait sous la responsabilité exclusive de l'utilisateur, qui conserve la pleine maîtrise de ses documents grâce au traitement local (RAM).
      </p>

      <h2>6. Droit applicable et Juridiction</h2>
      <p>
        Le présent site et ses conditions d'utilisation sont régis par le droit français. Tout litige relatif à l'utilisation du site Docusûr sera soumis à la compétence exclusive des tribunaux de <strong>Lyon</strong>.
      </p>
    </LegalLayout>
  );
};

export default MentionsLegalesPage;
