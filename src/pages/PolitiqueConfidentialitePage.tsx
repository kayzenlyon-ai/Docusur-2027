import { LegalLayout } from "@/components/LegalLayout";

const PolitiqueConfidentialitePage = () => {
  return (
    <LegalLayout title="Politique de Confidentialité (RGPD)" lastUpdated="23 mars 2026">
      <p>
        La présente Politique de Confidentialité décrit comment la société <strong>KAYZEN</strong> traite vos données personnelles dans le cadre de l'utilisation de l'application Docusûr.
      </p>

      <h2>1. Responsable du traitement</h2>
      <p>
        <strong>KAYZEN (SAS)</strong><br />
        6 rue Pierre Termier, 69009 Lyon, France<br />
        SIREN : 999 418 346<br />
        Contact DPO : contact@kayzen.fr
      </p>

      <h2>2. Architecture "Zero-Server" et Privacy-by-Design</h2>
      <p>
        Docusûr a été conçu selon le principe de <strong>Privacy-by-Design</strong>. Notre architecture technique est de type <strong>"Zero-Server"</strong> :
      </p>
      <ul>
        <li><strong>Aucun document ne transite par nos serveurs :</strong> Lorsque vous utilisez nos outils (conversion, fusion, signature, etc.), vos fichiers sont chargés directement dans la mémoire vive (RAM) de votre navigateur web.</li>
        <li><strong>Traitement local exclusif :</strong> Les opérations de calcul sont effectuées par le processeur de votre propre appareil via la technologie WebAssembly.</li>
        <li><strong>Absence de stockage :</strong> Aucune copie de vos documents n'est créée, stockée ou persistée sur nos infrastructures ou celles de tiers. Une fois l'onglet fermé ou le traitement terminé, les données sont définitivement effacées de la RAM de votre appareil.</li>
      </ul>

      <h2>3. Données collectées</h2>
      <p>
        En raison de notre architecture locale, nous ne collectons aucune donnée relative au contenu de vos documents. Les seules données susceptibles d'être traitées sont :
      </p>
      <ul>
        <li><strong>Cookies techniques :</strong> Strictement nécessaires au fonctionnement du site (ex: mémorisation de vos préférences d'affichage). Nous n'utilisons aucun cookie de tracking publicitaire.</li>
      </ul>

      <h2>4. Finalités et Base Légale</h2>
      <p>
        L'utilisation des cookies techniques est basée sur notre <strong>intérêt légitime</strong> à fournir un service fonctionnel et sécurisé (Art. 6.1.f du RGPD).
      </p>

      <h2>5. Vos Droits</h2>
      <p>
        Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement et d'opposition concernant vos données personnelles (compte et facturation). Pour exercer ces droits, contactez-nous à contact@kayzen.fr.
      </p>

      <h2>6. Juridiction</h2>
      <p>
        Tout litige relatif à l'application de cette politique sera soumis à la compétence des tribunaux de <strong>Lyon</strong>.
      </p>
    </LegalLayout>
  );
};

export default PolitiqueConfidentialitePage;
