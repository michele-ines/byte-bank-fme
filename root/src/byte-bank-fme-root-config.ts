import { LifeCycles, registerApplication, start } from "single-spa";

registerApplication<{ domElementGetter: () => HTMLElement }>({
  name: "@byte-bank-fme/footer",
  app: () => System.import<LifeCycles>("@byte-bank-fme/footer"),
  activeWhen: ["/"],
  customProps: {
    // aqui sim é reconhecido
    domElementGetter: () => document.getElementById("footer")!,
  },
});

registerApplication<{ domElementGetter: () => HTMLElement }>({
  name: "@byte-bank-fme/finance-project-react",
  app: () => System.import<LifeCycles>(
    "@byte-bank-fme/finance-project-react"
  ),
  activeWhen: ["/"],
  customProps: {
    domElementGetter: () =>
      document.getElementById("main-content")!,
  },
});

start({ urlRerouteOnly: true });
