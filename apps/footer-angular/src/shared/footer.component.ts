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
              <li>suporte@bytebank.com</li>
              <li>contato@bytebank.com</li>
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
  styleUrls: ['./styles.scss'] // ✅ não use `import './styles.scss'` dentro do .ts
})
export class FooterComponent {
  @Input('data-theme') theme: 'public' | 'private' = 'public';
}
