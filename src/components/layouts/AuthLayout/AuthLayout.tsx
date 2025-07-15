import PageHead from "@/components/commons/PageHead";
import Image from "next/image";
import { ReactNode } from "react";

interface PropTypes {
  children: ReactNode;
  title?: string;
}
const AuthLayout = (props: PropTypes) => {
  const { children, title } = props;
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <PageHead title={title} />

      <section className="w-1/2 flex items-center justify-center overflow-hidden">
        <div className="w-full flex justify-center">
          <div className="w-[320px] max-h-[90vh] overflow-auto p-4 scrollbar-hide">
            {children}
          </div>
        </div>
      </section>

      <div className="relative w-1/2 h-full">
        <Image
          src="/images/ilustration/Illustrasi-Login.png"
          alt="illustration"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default AuthLayout;
