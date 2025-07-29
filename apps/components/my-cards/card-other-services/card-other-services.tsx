// apps/components/my-cards/card-other-services/card-other-services.tsx

import {
  Box,
  Card,
  CardContent,
  Typography,
} from '../../ui';
import "./card-other-services.css";


import emprestimoIcon     from '@ui-imgs/dash-card-outros-servicos/icone-emprestimo.svg';
import meusCartoesIcon    from '@ui-imgs/dash-card-outros-servicos/icone-meus-cartoes.svg';
import doacoesIcon        from '@ui-imgs/dash-card-outros-servicos/icone-doacoes.svg';
import pixIcon            from '@ui-imgs/dash-card-outros-servicos/icone-pix.svg';
import segurosIcon        from '@ui-imgs/dash-card-outros-servicos/icone-seguros.svg';
import creditoCelularIcon from '@ui-imgs/dash-card-outros-servicos/icone-credito-celular.svg';

const services = [
  { key: 'emprestimo', title: 'Empréstimo',       icon: emprestimoIcon     },
  { key: 'cartoes',   title: 'Meus cartões',      icon: meusCartoesIcon    },
  { key: 'doacoes',   title: 'Doações',           icon: doacoesIcon        },
  { key: 'pix',       title: 'Pix',               icon: pixIcon            },
  { key: 'seguros',   title: 'Seguros',           icon: segurosIcon        },
  { key: 'celular',   title: 'Crédito celular',   icon: creditoCelularIcon },
];

export default function CardsOutrosServicos() {
  return (
    <Box
      component="section"
      role="region"
      aria-labelledby="servicos-heading"
      className="cardTransacao"
      sx={{
        // Esses estilos continuam, complementando o módulo SCSS:
        backgroundColor: 'var(--byte-gray-200)',
        // ...
      }}
      /* Note que o módulo SCSS já define background, border-radius e os ::before/::after.
         Se quiser remover redundâncias, pode mover tudo para o SCSS. */
    >
      <Typography
        id="servicos-heading"
        variant="h6"
        component="h3"
        sx={{
          fontWeight: 700,
          fontSize: 25,
          mb: 4,
          position: 'relative',
          zIndex: 1,
          color: 'common.black', 
        }}
      >
        Confira os serviços disponíveis
      </Typography>

      <Box
        role="list"
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr',
          },
          position: 'relative',
          zIndex: 1,
          
        }}
      >
        {services.map(({ key, title, icon }) => (
          <Card
            key={key}
            role="listitem"
            tabIndex={0}
            aria-label={title}
            variant="outlined"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 2,
              bgcolor: 'common.white',
              '&:hover': { boxShadow: 4 },
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.currentTarget.click();
              }
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                p: 0,
              }}
            >
              <Box sx={{ width: 48, height: 48 }}>
                <img
                  src={icon}
                  alt={title}
                  width={48}
                  height={48}
                  style={{ display: 'block' }}
                />
              </Box>
              <Typography
                variant="body1"
                className="serviceLabel"
              >
                {title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
