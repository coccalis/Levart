import { Image } from "@nextui-org/react";
import NavLogo from "../../assets/images/LevartLogo.webp";

function MainLogo() {
  return (
    <>
      <Image width={150} src={NavLogo} radius="none" />
    </>
  );
}

export default MainLogo;
