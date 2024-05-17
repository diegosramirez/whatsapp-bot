const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

const flowSecundario = addKeyword(["2", "siguiente"]).addAnswer([
  "📄 Aquí tenemos el flujo secundario",
]);

const flowDocs = addKeyword([
  "doc",
  "documentacion",
  "documentación",
]).addAnswer(
  [
    "📄 Aquí encontras las documentación recuerda que puedes mejorarla",
    "https://bot-whatsapp.netlify.app/",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowTuto = addKeyword(["tutorial", "tuto"]).addAnswer(
  [
    "🙌 Aquí encontras un ejemplo rapido",
    "https://bot-whatsapp.netlify.app/docs/example/",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowGracias = addKeyword(["gracias", "grac"]).addAnswer(
  [
    "🚀 Puedes aportar tu granito de arena a este proyecto",
    "[*opencollective*] https://opencollective.com/bot-whatsapp",
    "[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez",
    "[*patreon*] https://www.patreon.com/leifermendez",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowDiscord = addKeyword(["discord"]).addAnswer(
  [
    "🤪 Únete al discord",
    "https://link.codigoencasa.com/DISCORD",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowCargar = addKeyword(["1"]).addAnswer(
  [
    "CBU: XXXXXX. Por favor, envíanos una foto del comprobante para confirmar la transacción.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowRetirar = addKeyword(["2"]).addAnswer(
  [
    "Por favor, proporciónanos el CBU o el alias junto con el nombre y apellido del titular de la cuenta para proceder con el retiro de tu premio.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowAscesor = addKeyword(["3"]).addAnswer(
  [
    "Gracias por tu solicitud. Un asesor se pondrá en contacto contigo a la brevedad.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowPrincipal = addKeyword(["hola"])
  .addAnswer("🙌 Hola. ¿Como estas?")
  .addAnswer(
    [
      "👉 *1* ¿Deseas realizar una carga? Te proporcionaremos el CBU en breve.",
      "👉 *2* ¿Queres retirar tu premio?",
      "👉 *3* ¿Deseas hablar con un asesor?",
    ],
    null,
    null,
    [flowCargar, flowRetirar, flowAscesor]
  );

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowPrincipal]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
