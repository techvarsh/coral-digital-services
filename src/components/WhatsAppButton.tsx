import { MessageSquare } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/919999999999?text=Hi%2C%20I'm%20interested%20in%20your%20services.%20Please%20share%20details.";

const WhatsAppButton = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-lg transition-transform hover:scale-110"
  >
    <MessageSquare size={26} className="text-white" />
  </a>
);

export default WhatsAppButton;
