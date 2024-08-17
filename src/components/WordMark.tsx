import Image from "next/image";
import logo from "./V.png";

export default function WordMark() {
  return (
    <div className="size-16">
      <Image alt="" src={logo} width={500} height={500} />
    </div>
  );
}
