import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer [class.footer-public]="theme === 'public'" [class.footer-private]="theme === 'private'">
      <div class="container">
        <div class="grid">
          <div>
            <h4>Serviços</h4>
            <ul>
              <li>Conta corrente</li>
              <li>Conta PJ</li>
              <li>Cartão de crédito</li>
            </ul>
          </div>
          <div>
            <h4>Contato</h4>
            <ul>
              <li>0800 504 3058</li>
              <li>suporte&#64;bytebank.com</li>
              <li>contato&#64;bytebank.com</li>
            </ul>
          </div>
          <div class="dev">
            <h4>Developed by Front-End</h4>
            <div class="brand">Bytebank</div>
            <div class="social">
              <span>📸</span>
              <span>▶️</span>
              <span>💬</span>
              <span>🟢</span>
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
  @Input('data-theme') theme: 'public' | 'private' = 'public';
}
