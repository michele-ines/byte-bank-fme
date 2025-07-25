import { defineFooter } from './define-footer';

defineFooter().catch(err => {
  console.error('Erro ao definir byte-footer:', err);
});
