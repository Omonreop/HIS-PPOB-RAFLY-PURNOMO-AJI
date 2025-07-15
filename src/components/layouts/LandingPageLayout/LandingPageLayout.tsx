import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode } from "react";
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar";
import LandingPageHero from "./LandingPageHero";

interface Proptypes {
  title: string;
  children: ReactNode;
}

const LandingPageLayout = (props: Proptypes) => {
  const { title, children } = props;
  return (
    <Fragment>
      <PageHead title={title} />
      <LandingPageLayoutNavbar />
      <LandingPageHero />
      <div className="py-10 px-[10rem] ">{children}</div>
    </Fragment>
  );
};

export default LandingPageLayout;
