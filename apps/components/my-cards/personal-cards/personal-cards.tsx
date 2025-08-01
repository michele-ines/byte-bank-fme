import { Box, Button } from "../../ui";
import CartaoFisicoImg from "../../ui/imgs/dash-card-my-cards/cartao-fisico.svg";
import CartaoDigitalImg from "../../ui/imgs/dash-card-my-cards/cartao-fisico.svg";

import "./personal-cards.css";
import { tw } from "twind";

export default function PersonalCards() {
  return (
    <Box
      role="region"
      aria-labelledby="meus-cartoes-heading"
      className={tw`cardPersonalCards w-full min-h-[478px]`}
    >
      <h3
        id="meus-cartoes-heading"
        className={tw`cardTitle w-full text-center lg:text-start`}
      >
        Meus cartões
      </h3>

      <Box role="list" className={tw`flex flex-col gap-4 w-full`}>
        {/* ---------- Cartão físico ---------- */}
        <h4
          id="cartao-fisico-heading"
          className={tw`descriptionCard text-center lg:text-start`}
        >
          Cartão físico
        </h4>

        <Box
          role="group"
          aria-labelledby="cartao-fisico-heading"
          className={tw`w-full flex flex-col items-center lg:flex-row gap-8`}
        >
          <img
            src={CartaoFisicoImg}
            alt="Ilustração de um cartão bancário azul, frente do cartão com nome do banco e do titular"
            width={327}
            height={164}
            className={tw`max-w-[280px] lg:max-w-none max-h-[148px] lg:max-h-none text-center`}
          />

          <Box className={tw`flex flex-col items-center gap-4 w-full`}>
            <Button
              type="button"
              variant="contained"
              aria-label="Configurar cartão físico"
              className={tw`w-full py-3 font-medium text-base max-w-[280px]`}
              style={{
                background: "#ff5031",
                color: "#ffffff",
              }}
            >
              Configurar
            </Button>

            <Button
              type="button"
              variant="contained"
              aria-label="Bloquear cartão físico"
              className={tw`w-full py-3 font-medium text-base buttonBlock max-w-[280px]`}
            >
              Bloquear
            </Button>

            <span className={tw`descriptionFunctionCard`}>
              Função: Débito/Crédito
            </span>
          </Box>
        </Box>

        {/* ---------- Cartão digital ---------- */}
        <h4
          id="cartao-digital-heading"
          className={tw`descriptionCard text-center lg:text-start`}
        >
          Cartão digital
        </h4>

        <Box
          role="group"
          aria-labelledby="cartao-digital-heading"
          className={tw`w-full flex flex-col items-center lg:flex-row gap-8`}
        >
          <img
            src={CartaoDigitalImg}
            alt="Ilustração de um cartão bancário cinza, frente do cartão com nome do banco e do titular"
            width={327}
            height={164}
            className={tw`max-w-[280px] lg:max-w-none max-h-[148px] lg:max-h-none text-center`}
          />

          <Box className={tw`flex flex-col items-center gap-4 w-full`}>
            <Button
              type="button"
              variant="contained"
              aria-label="Configurar cartão digital"
              className={tw`w-full py-3 font-medium text-base max-w-[280px]`}
              style={{
                background: "#ff5031",
                color: "#ffffff",
              }}
            >
              Configurar
            </Button>

            <Button
              type="button"
              variant="contained"
              aria-label="Bloquear cartão digital"
              className={tw`w-full py-3 font-medium text-base buttonBlock max-w-[280px]`}
            >
              Bloquear
            </Button>

            <span className={tw`descriptionFunctionCard`}>Função: Débito</span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
