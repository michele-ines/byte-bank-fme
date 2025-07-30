import { Box, Button } from '../../ui';

import "./personal-cards.css";

export default function PersonalCards() {
  return (
    <Box
      role="region"
      aria-labelledby="meus-cartoes-heading"
      className="cardPersonalCards cardTransacao w-full min-h-[478px]`}"
    >
      <h3
        id="meus-cartoes-heading"
        className="cardTitle w-full text-center md:text-start"
      >
        Meus cartões
      </h3>

      <Box role="list" className="flex flex-col gap-4 w-full">
        {/* ---------- Cartão físico ---------- */}
        <h4
          id="cartao-fisico-heading"
          className="descriptionCard text-center md:text-start"
        >
          Cartão físico
        </h4>

        <Box
          role="group"
          aria-labelledby="cartao-fisico-heading"
          className="w-full flex flex-col items-center md:flex-row gap-8"
        >
          <img
            src="/dash-card-my-cards/cartao-fisico.svg"
            alt="Ilustração de um cartão bancário azul, frente do cartão com nome do banco e do titular"
            width={327}
            height={164}
            className="max-w-[280px] 2xl:max-w-none max-h-[148px] 2xl:max-h-none text-center"
          />

          <Box className="flex flex-col items-center gap-4 w-full">
            <Button
              type="button"
              variant="contained"
              aria-label="Configurar cartão físico"
              className="w-full py-3 font-medium text-base"
              style={{
                background: '#ff5031',
                color: '#ffffff',
              }}
            >
              Configurar
            </Button>

            <Button
              type="button"
              variant="contained"
              aria-label="Bloquear cartão físico"
              className="w-full py-3 font-medium text-base buttonBlock"
            >
              Bloquear
            </Button>

            <span className="descriptionFunctionCard">
              Função: Débito/Crédito
            </span>
          </Box>
        </Box>

        {/* ---------- Cartão digital ---------- */}
        <h4
          id="cartao-digital-heading"
          className="descriptionCard text-center md:text-start"
        >
          Cartão digital
        </h4>

        <Box
          role="group"
          aria-labelledby="cartao-digital-heading"
          className="w-full flex flex-col items-center md:flex-row gap-8"
        >
          <img
            src="/dash-card-my-cards/cartao-digital.svg"
            alt="Ilustração de um cartão bancário cinza, frente do cartão com nome do banco e do titular"
            width={327}
            height={164}
            className="max-w-[280px] 2xl:max-w-none max-h-[148px] 2xl:max-h-none text-center"
          />

          <Box className="flex flex-col items-center gap-4 w-full">
            <Button
              type="button"
              variant="contained"
              aria-label="Configurar cartão digital"
              className="w-full py-3 font-medium text-base"
              style={{
                background: '#ff5031',
                color: '#ffffff',
              }}
            >
              Configurar
            </Button>

            <Button
              type="button"
              variant="contained"
              aria-label="Bloquear cartão digital"
              className="w-full py-3 font-medium text-base buttonBlock"
            >
              Bloquear
            </Button>

            <span className="descriptionFunctionCard">
              Função: Débito
            </span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
