import 'zone.js';
import '@angular/compiler';
import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { FooterComponent } from './footer.component';

export async function defineFooter(): Promise<void> {
  const tag = 'byte-footer';

  // evita erro se já estiver definido
  if (customElements.get(tag)) {
    return;
  }

  // cria a aplicação Angular isolada
  const app = await createApplication({
    providers: []
  });

  // transforma o componente em Custom Element
  const footerElement = createCustomElement(FooterComponent, {
    injector: app.injector
  });

  // registra apenas uma vez
  customElements.define(tag, footerElement);
}
