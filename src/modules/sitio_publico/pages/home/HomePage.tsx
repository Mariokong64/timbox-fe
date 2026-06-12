import { HeroInicio } from "./components/HeroInicio";
import { SeccionIntegracion } from "./components/SeccionIntegracion";
import { SeccionPlanes } from "./components/SeccionPlanes";
import { SeccionQuienesSomos } from "./components/SeccionQuienesSomos";
import { SeccionRegistro } from "./components/SeccionRegistro";
import { SeccionVideo } from "./components/SeccionVideo";

export function HomePage() {
  return (
    <>
      <HeroInicio />
      <SeccionQuienesSomos />
      <SeccionVideo />
      <SeccionPlanes />
      <SeccionIntegracion />
      <SeccionRegistro />
    </>
  );
}
