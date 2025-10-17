import React from "react";

type TypographyProps = React.HTMLAttributes<HTMLParagraphElement>;

function Typography(props: TypographyProps) {
  return <span {...props} className={`${props.className} text-sm`} />;
}

Typography.Heading = function (props: TypographyProps) {
  return (
    <h1
      {...props}
      className={`${props.className} md:text-[60px] md:leading-[64px] leading-11  text-4xl font-secondary font-semibold text-center sm:text-left`}
    >
      {props.children}
    </h1>
  );
};

Typography.SubHeading = function (props: TypographyProps) {
  return (
    <h1 {...props} className={`${props.className} text-gray-700 sm:text-2xl text-sm font-primary`}>
      {props.children}
    </h1>
  );
};

Typography.Headers = function (props: TypographyProps) {
  return (
    <h1 {...props} className={`sm:text-4xl text-2xl font-secondary font-semibold ${props.className}`}>
      {props.children}
    </h1>
  );
};

Typography.H2 = function (props: TypographyProps) {
  return (
    <h2 {...props} className={`text-2xl font-semibold ${props.className}`}>
      {props.children}
    </h2>
  );
};

Typography.H3 = function (props: TypographyProps) {
  return (
    <p {...props} className={`text-xl font-secondary font-bold ${props.className}`}>
      {props.children}
    </p>
  );
};

Typography.H4 = function (props: TypographyProps) {
  return (
    <h4 {...props} className={`sm:text-lg text-base font-secondary  ${props.className}`}>
      {props.children}
    </h4>
  );
};

Typography.Text = function (props: TypographyProps) {
  return (
    <p {...props} className={`sm:text-base text-sm font-secondary ${props.className}`}>
      {props.children}
    </p>
  );
};

Typography.SubText = function (props: TypographyProps) {
  return (
    <span {...props} className={`text-sm font-secondary text-neutral-500 tracking-[-0.02em] ${props.className}`}>
      {props.children}
    </span>
  );
};

Typography.MicroText = function (props: TypographyProps) {
  return (
    <span {...props} className={`text-xs font-primary text-gray-600 ${props.className}`}>
      {props.children}
    </span>
  );
};

export default Typography;
