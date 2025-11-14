import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare, Github, Twitter, Instagram, Rss } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "naq.evius@dystopian.net",
    link: "mailto:naq.evius@dystopian.net",
    description: "For serious inquiries, collaborations, or just to say hello",
  },
  {
    icon: Twitter,
    title: "Twitter / X",
    value: "@naqevius",
    link: "https://twitter.com/naqevius",
    description: "Short bursts of dystopian thoughts and story updates",
  },
  {
    icon: Instagram,
    title: "Instagram",
    value: "@naqevius",
    link: "https://instagram.com/naqevius",
    description: "Visual fragments from dystopian worlds",
  },
  {
    icon: Github,
    title: "GitHub",
    value: "github.com/naqevius",
    link: "https://github.com/naqevius",
    description: "Open source tools and story resources",
  },
  {
    icon: MessageSquare,
    title: "Discord",
    value: "Dystopian Chronicles Server",
    link: "https://discord.gg/dystopian",
    description: "Join the community, discuss stories, share theories",
  },
  {
    icon: Rss,
    title: "Newsletter",
    value: "Subscribe for updates",
    link: "#newsletter",
    description: "Monthly updates on new stories and the novel progress",
  },
];

const Contacts = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center hologram">
          <span className="neon-text">CONTACTS</span>
        </h1>
        
        <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
          Connect with me across various platforms. Whether you want to discuss stories, 
          collaborate on projects, or just share your thoughts about dystopian futures.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <Card
                key={index}
                className="cyber-glow bg-card border-border hover:border-primary transition-all duration-300 hover:scale-105 group"
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <Icon className="h-8 w-8 text-primary group-hover:text-secondary transition-colors" />
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
                    <p className="text-lg font-mono text-primary hover:text-secondary transition-colors">
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
        
        <div className="cyber-glow bg-card p-8 md:p-12 rounded-lg text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary font-mono">
            ENCRYPTED_TRANSMISSION
          </h2>
          
          <p className="text-lg leading-relaxed text-card-foreground mb-6">
            All communications are welcome. Whether you're a reader, artist, publisher, 
            or fellow traveler through dystopian landscapes—reach out.
          </p>
          
          <div className="border-t border-border pt-6 mt-6">
            <p className="text-muted-foreground mb-2">
              Response time: Usually within 24-48 hours
            </p>
            <p className="text-sm font-mono text-primary">
              &gt; transmission.received()_
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-xs font-mono text-muted-foreground">
            // No data harvesting. No tracking. Just human connection in a digital age.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
