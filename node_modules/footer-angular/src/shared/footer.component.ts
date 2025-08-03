import { Component, Input } from "@angular/core";
const logoUrl = new URL("../../../components/ui/imgs/footer/ft-logo.svg", import.meta.url).href;
const instaUrl = new URL("../../../components/ui/imgs/footer/ft-instagram.svg", import.meta.url)  .href;
const ytUrl = new URL("../../../components/ui/imgs/footer/ft-youtube.svg", import.meta.url).href;
const waUrl = new URL("../../../components/ui/imgs/footer/ft-whatsapp.svg", import.meta.url)
  .href;

@Component({
  selector: "app-footer",
  standalone: true,
  template: `
    <footer
      [class.footer-public]="theme === 'public'"
      [class.footer-private]="theme === 'private'"
    >
      <div class="container">
        <div class="grid">
          <div>
            <h4 className="text-white font-bold">Serviços</h4>
            <ul>
              <li>Conta corrente</li>
              <li>Conta PJ</li>
              <li>Cartão de crédito</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold">Contato</h4>
            <ul>
              <li>0800 504 3058</li>
              <li>suporte@bytebank.com</li>
              <li>contato@bytebank.com</li>
            </ul>
          </div>
          <div class="dev">
            <h4 className="text-white font-bold">Developed by Front-End</h4>
              <img [src]="logoUrl" alt="Logo" width="80" height="24" />
            <div class="social">
              <img [src]="instaUrl" alt="Instagram" width="20" height="20" />
              <img [src]="ytUrl" alt="YouTube" width="20" height="20" />
              <img [src]="waUrl" alt="WhatsApp" width="20" height="20" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    footer {
      color: #ffffff;
      padding: 32px 0;
    }

    .footer-public {
      background: #000000;
    }

    .footer-private {
      background: #004D61;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 16px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 24px;
    }

    h4 {
      margin: 0 0 12px 0;
      font-size: 1rem;
      font-weight: 600;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li + li {
      margin-top: 4px;
    }

    .brand {
      margin-top: 4px;
      color: #47a138;
      font-weight: 700;
    }

    .social {
      margin-top: 8px;
      display: flex;
      gap: 8px;
      font-size: 1.2rem;
    }  
`]
})
export class FooterComponent {
  @Input("data-theme") theme: "public" | "private" = "public";

  logoUrl = logoUrl;
  instaUrl = instaUrl;
  ytUrl = ytUrl;
  waUrl = waUrl;
}
