import Image from "next/image";
import logo from "./quarkevents1.png";

export default function WordMark() {
  return (
    <div className="size-32">
      <Image alt="" src={logo} />
    </div>
  );
}
