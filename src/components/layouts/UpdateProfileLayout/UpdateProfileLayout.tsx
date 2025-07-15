import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode } from "react";
import LandingPageLayoutNavbar from "../LandingPageLayout/LandingPageLayoutNavbar";

interface Proptypes {
  title: string;
  children: ReactNode;
}

const UpdateProfileLayout = (props: Proptypes) => {
  const { title, children } = props;
  return (
    <Fragment>
      <PageHead title={title} />
      <LandingPageLayoutNavbar />
      <div className="py-10 ">{children}</div>
    </Fragment>
  );
};

export default UpdateProfileLayout;
