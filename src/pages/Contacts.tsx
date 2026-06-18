import { Button } from "@/components/ui/button";
import { Mail, Instagram, Heart } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "aicustodidelleceneri@gmail.com",
    link: "mailto:aicustodidelleceneri@gmail.com",
    description: "Per richieste, collaborazioni o semplicemente per salutare",
  },
  {
    icon: Instagram,
    title: "Instagram",
    value: "@ai.custodi.delle.ceneri.saga",
    link: "https://www.instagram.com/ai.custodi.delle.ceneri.saga",
    description: "Per news, anteprime, approfondimenti, eventi",
  },
];

const Contacts = () => (
  <div className="pb-24 md:pb-32 relative z-[1]">
    <PageHeader
      kicker="04 — Contatti"
      title="Contatti"
      intro="Dove trovarmi fuori da qui."
    />

    <div className="max-w-6xl mx-auto w-full px-6 md:px-10 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 border-t border-border/40 pt-12 md:pt-16">
        {contactMethods.map((contact) => {
          const Icon = contact.icon;
          return (
            <div key={contact.title}>
              <div className="flex items-center gap-3 mb-3">
                <Icon className="h-5 w-5" style={{ color: "#fe4a00" }} />
                <h2 className="text-xl font-medium text-foreground">
                  {contact.title}
                </h2>
              </div>
              <a
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-primary hover:text-primary/80 transition-colors break-words"
              >
                {contact.value}
              </a>
              <p className="mt-2 text-sm text-muted-foreground">
                {contact.description}
              </p>
            </div>
          );
        })}
      </div>

      <section className="mt-24 md:mt-32 max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
          Scrivimi
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
          Tutte le comunicazioni sono benvenute. Che tu sia un lettore, artista,
          editore o semplicemente curioso.
        </p>
      </section>

      <section className="mt-20 md:mt-24 pt-12 border-t border-border/40 max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
          Sostieni il progetto
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-8">
          Se ti piace quello che faccio, puoi supportare il progetto con una
          donazione libera.
        </p>
        <a
          href="https://paypal.me/naqevius"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            className="text-base px-7 py-6 hover:opacity-90"
            style={{ backgroundColor: "#fe4a00", color: "#fff" }}
          >
            <Heart className="mr-2 h-5 w-5" />
            Dona con PayPal
          </Button>
        </a>
        <p className="mt-6 text-sm text-muted-foreground">
          Ogni contributo aiuta a mantenere vivo questo universo narrativo.
        </p>
      </section>
    </div>
  </div>
);

export default Contacts;
