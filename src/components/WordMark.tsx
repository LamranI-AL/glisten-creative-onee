import Image from "next/image";
import logo from "./logo.png";

export default function WordMark() {
  return (
    <div className="size-14">
      <Image alt="" src={logo} />
    </div>
  );
}
