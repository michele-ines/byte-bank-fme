import { Provider } from "react-redux";
import { CardMyAccount } from "../../../../components/my-cards/card-my-account/card-my-account";
import { Box } from "../../../../components/ui";
import bannerIlustracao from "../../../../components/ui/imgs/dash-card-my-account/ilustracao-card-accout.svg";
import { tw } from "twind";
import { store } from "@store/store";
import { ProtectedRoute } from "../../ProtectedRoute";

function MyAccountPageContent() {
  return (
    <Box
      className={tw`flex items-start justify-center min-h-screen p-4`}
      sx={{ backgroundColor: "var(--byte-bg-dashboard)" }}
    >
      <Box
        className={tw`flex flex-col lg:flex-row rounded-2xl shadow-lg max-w-4xl w-full overflow-hidden my-6`}
        sx={{ backgroundColor: "bg-[var(--byte-gray-200)]" }}
      >
        {/* Ilustração centralizada */}
        <Box
          className={tw`lg:flex lg:items-center lg:justify-center lg:w-1/2 py-12 pl-12`}
        >
          <img
            src={bannerIlustracao}
            alt="Ilustração de uma mulher com cabelo castanho claro, usando um vestido azul e segurando um celular"
            width={600}
            height={400}
            className={tw`max-w-full h-auto max-h-[320px] w-full`}
          />
        </Box>

        {/* Formulário */}
        <Box className={tw`w-full lg:w-1/2 p-8 lg:p-12 flex flex-col`}>
          <CardMyAccount />
        </Box>
      </Box>
    </Box>
  );
}

export default function MyAccountPage() {
  return (
    <Provider store={store}>
      <ProtectedRoute>
        <MyAccountPageContent />
      </ProtectedRoute>
    </Provider>
  );
}
