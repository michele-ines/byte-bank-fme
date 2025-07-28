import React from "react";
import { tw } from 'twind';
import { Button } from "../../../../components/ui";
import { ROUTES } from "../../../../config-routes/routes";
import erro404 from '../../../../components/ui/imgs/page/ilustracao-error-404.svg';
import '../../index.css';
import '../../../../components/styles/globals.css'
const NotFound = () => {
  return (
    <div
      className={tw`w-full min-h-screen flex flex-col items-center justify-center text-center`}
      style={{
        background: "var(--byte-gradient-teal)",
        color: "var(--byte-color-black)",
      }}
    >
      <h1 className={tw`text-3xl font-bold mt-10`}>
        Ops! Não encontramos a página...
      </h1>
      <p className={tw`mt-6 max-w-md px-4`}>
        E olha que exploramos o universo procurando por ela! 
        Que tal voltar e tentar novamente?
      </p>

      <div className={tw`mt-8`}>
        <Button
          variant="contained"
          style={{
            background: "var(--byte-color-orange-500)",
            color: "var(--byte-bg-default)",
          }}
          onClick={() => window.location.href = ROUTES.HOME}
        >
          Voltar ao Início
        </Button>
      </div>

      <div className={tw`max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 py-8`}>
        <img
          src={erro404}
          alt="Ilustração de OVNI para página 404"
          className={tw`mx-auto w-full max-w-[470px] h-auto`}
        />
      </div>
    </div>
  );
};

export default NotFound;