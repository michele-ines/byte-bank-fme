import { LifeCycles, registerApplication, start } from "single-spa";

registerApplication({
  name: "@byte-bank-fme/footer",
  app: () => System.import<LifeCycles>("@byte-bank-fme/footer"),
  activeWhen: ["/"],
});

start({
  urlRerouteOnly: true,
});
