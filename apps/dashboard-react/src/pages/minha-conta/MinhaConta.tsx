import { CardMyAccount } from "../../../../components/my-cards/card-my-account/card-my-account";
import { Box } from "../../../../components/ui";
import bannerIlustracao from "../../../../components/ui/imgs/dash-card-my-account/ilustracao-card-accout.svg";

export default function MyAccountPage() {
  return (
    <Box className="flex items-center justify-center min-h-screen bg-[var(--byte-bg-dashboard)] px-4">
      <Box className="flex flex-col lg:flex-row bg-[var(--byte-gray-200)] rounded-2xl shadow-lg max-w-4xl w-full overflow-hidden my-6">
        {/* Ilustração centralizada */}
        <Box className=" lg:flex lg:items-center lg:justify-center lg:w-1/2 py-12 pl-12">
          <img
            src={bannerIlustracao}
            alt="Ilustração de uma mulher com cabelo castanho claro, usando um vestido azul e segurando um celular"
            width={600}
            height={400}
            className="max-w-full h-auto max-h-[320px] w-full"
          />
        </Box>

        {/* Formulário */}
        <Box className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col ">
          <CardMyAccount />
        </Box>
      </Box>
    </Box>
  );
}
