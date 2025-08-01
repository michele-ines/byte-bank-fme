import React from "react";
import "./homePage.css";
import bannerIlustracao from "../../../../components/ui/imgs/page/banner-ilustracao.svg";
import iconPresente from "../../../../components/ui/imgs/page/icon-presente.svg";
import iconSaque from "../../../../components/ui/imgs/page/icon-saque.svg";
import iconPontos from "../../../../components/ui/imgs/page/icon-pontos.svg";
import iconDispositvo from "../../../../components/ui/imgs/page/icon-dispositivos.svg";
import { tw } from "twind";

export default function HomePage() {
  return (
    <div className={tw`w-full min-h-screen home-background`}>
      <div className={tw`max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 py-8`}>
        <section
          className={tw`grid grid-col-1 md:grid-cols-2 items-center gap-10 md:gap-4`}
        >
          <div className={tw`w-full`}>
            {/* Mobile: telas menores que md */}
            <h1
              className={tw`banner-title font-bold text-lg leading-tight tracking-tight block md:hidden text-center text-black mb-4 whitespace-pre-line`}
            >
              Experimente mais <br />
              liberdade no controle <br /> da vida financeira. <br />
              Crie sua conta com a gente!
            </h1>

            {/* Tablet: de md até lg */}
            <h1
              className={tw`banner-title font-bold text-xl leading-tight tracking-tight align-middle text-black hidden md:block lg:hidden text-center mb-4 whitespace-pre-line`}
            >
              Experimente mais liberdade no
              <br />
              controle da sua vida financeira.
              <br />
              Crie sua conta com a gente!
            </h1>

            {/* Desktop: a partir de lg */}
            <h1
              className={tw`banner-title font-bold text-2xl leading-tight tracking-tight align-middle text-black text-center hidden lg:block mb-4`}
            >
              Experimente mais liberdade no
              <br />
              controle da sua vida financeira.
              <br />
              Crie sua conta com a gente!
            </h1>
          </div>

          <div className={tw`w-full`}>
            <img
              src={bannerIlustracao}
              alt="Banner ilustrativo"
              width={600}
              height={400}
            />
          </div>
        </section>

        <section className={tw`mt-16`}>
          <h2
            className={tw`vantagem-title mb-8 text-center text-[20px] md:text-[25px] text-[var(--byte-color-black)]`}
          >
            Vantagens do nosso banco
          </h2>

          <div
            className={tw`grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 text-[var(--byte-color-green-500)]`}
          >
            {/* Card 1 */}
            <div className={tw`flex flex-col items-center text-center p-4`}>
              <img
                src={iconPresente}
                alt="Ícone de presente"
                width={64}
                height={64}
                className={tw`mb-4`}
              />
              <h3 className={tw`vantagem-title mb-2 text-[20px]`}>
                Conta e cartão gratuitos
              </h3>
              <p
                className={tw`vantagem-description text-center text-[var(--byte-text-medium-gray)]`}
              >
                Conta digital sem custo fixo e sem tarifa de manutenção.
              </p>
            </div>

            {/* Card 2 */}
            <div className={tw`flex flex-col items-center text-center p-4`}>
              <img
                src={iconSaque}
                alt="Ícone de saque"
                width={64}
                height={64}
                className={tw`mb-4`}
              />
              <h3 className={tw`vantagem-title mb-2 text-[20px]`}>
                Saques sem custo
              </h3>
              <p
                className={tw`vantagem-description text-center text-[var(--byte-text-medium-gray)]`}
              >
                Saques grátis 4x por mês em qualquer Banco 24h.
              </p>
            </div>

            {/* Card 3 */}
            <div className={tw`flex flex-col items-center text-center p-4`}>
              <img
                src={iconPontos}
                alt="Ícone de pontos"
                width={64}
                height={64}
                className={tw`mb-4`}
              />
              <h3 className={tw`vantagem-title mb-2 text-[20px]`}>
                Programa de pontos
              </h3>
              <p
                className={tw`vantagem-description text-center text-[var(--byte-text-medium-gray)]`}
              >
                Acumule pontos com suas compras no crédito sem pagar
                mensalidade!
              </p>
            </div>

            {/* Card 4 */}
            <div className={tw`flex flex-col items-center text-center p-4`}>
              <img
                src={iconDispositvo}
                alt="Ícone de dispositivos"
                width={64}
                height={64}
                className={tw`mb-4`}
              />
              <h3 className={tw`vantagem-title mb-2 text-[20px]`}>
                Seguro Dispositivos
              </h3>
              <p
                className={tw`vantagem-description text-center text-[var(--byte-text-medium-gray)]`}
              >
                Proteção para seus dispositivos por uma mensalidade simbólica.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
