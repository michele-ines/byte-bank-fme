import "./styles.scss";
import { Component, Input } from "@angular/core";

import ftLogo from "@ui-imgs/footer/ft-logo.svg";
import ftInstagram from "@ui-imgs/footer/ft-instagram.svg";
import ftYoutube from "@ui-imgs/footer/ft-youtube.svg";
import ftWhatsapp from "@ui-imgs/footer/ft-whatsapp.svg";

@Component({
  selector: "app-footer",
  standalone: true,
  template: `
    <footer
      [class.footer-public]="theme === 'public'"
      [class.footer-private]="theme === 'private'"
    >
      <div
        class="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div class="space-y-3 vantagem-description">
          <p class="text-white font-bold mb-4">Serviços</p>
          <ul class="space-y-1 text-foreground --font-normal">
            <li class="mb-4">Conta corrente</li>
            <li class="mb-4">Conta PJ</li>
            <li class="mb-4">Cartão de crédito</li>
          </ul>
        </div>

        <div class="space-y-3 vantagem-description">
          <p class="text-white font-bold mb-4">Contato</p>
          <ul class=" text-foreground --font-normal">
            <li class="mb-4">0800 504 3058</li>
            <li class="mb-4">suporte@bytebank.com</li>
            <li class="mb-4">contato@bytebank.com</li>
          </ul>
        </div>

        <div class="space-y-3 vantagem-description">
          <p class="text-white font-bold mb-4">Developed by Front-End</p>
          <div class="brand">
              <img [src]="logo" width="80" height="24" alt="Bytebank Logo" />
            </div>
            <div class="social">
              <img [src]="instagram" width="20" height="20" alt="Instagram" />
              <img [src]="youtube" width="20" height="20" alt="YouTube" />
              <img [src]="whatsapp" width="20" height="20" alt="WhatsApp" />
            </div>
      
        </div>
      </div>
    </footer>
  `,
  styles: [],
})
export class FooterComponent {
  @Input("data-theme") theme: "public" | "private" = "public";

  // URLs que o Webpack gerou (hash incluído)
  logo = ftLogo;
  instagram = ftInstagram;
  youtube = ftYoutube;
  whatsapp = ftWhatsapp;
}
