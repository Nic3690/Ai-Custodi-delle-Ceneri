import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Instagram } from "lucide-react";
import GradientText from "@/components/text/GradientText";

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

const Contacts = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <GradientText
            className="text-4xl md:text-6xl font-bold uppercase tracking-widest"
            colors={["#326266", "#23babd", "#b7e2e5", "#23babd", "#326266"]}
            animationSpeed={6}
            style={{ fontFamily: "'Equinox', sans-serif" }}
          >
            CONTATTI
          </GradientText>
        </div>

        <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
          Dove trovarmi fuori da qui
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <Card
                key={index}
                className="bg-card border-border hover:border-primary transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <Icon className="h-8 w-8" style={{ color: '#ff5657' }} />
                    <CardTitle className="text-xl font-bold">
                      {contact.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <a
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mb-3"
                  >
                    <p className="text-lg text-primary hover:text-primary/80 transition-colors">
                      {contact.value}
                    </p>
                  </a>
                  <p className="text-sm text-muted-foreground">
                    {contact.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">
            Scrivimi
          </h2>

          <p className="text-lg leading-relaxed text-card-foreground mb-6">
            Tutte le comunicazioni sono benvenute. Che tu sia un lettore, artista, editore o semplicemente curioso.
          </p>

          <div className="border-t border-border pt-6 mt-6">
            <p className="text-muted-foreground">
              Tempo di risposta: solitamente entro 24-48 ore
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
