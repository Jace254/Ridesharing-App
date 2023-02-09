import React from "react";
import NavBar from "./NavBar/navBar";
import { FormWrapper } from "./FormWrapper";
import { Wrapper } from "./Wrapper";

interface LayoutProps {
  children: any;
  variant?: "small" | "regular";
  heading?: string;
  text?: string;
  top?: boolean;
  form?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  heading,
  variant = "regular",
  text,
  top,
  form,
}) => {
  if (form) {
    return (
      <>
        <NavBar />
        <FormWrapper variant={variant} heading={heading} text={text} top={top}>
          {children}
        </FormWrapper>
      </>
    );
  }
  return (
    <>
      <NavBar />
      <Wrapper variant={variant} top={top}>
        {children}
      </Wrapper>
    </>
  );
};
