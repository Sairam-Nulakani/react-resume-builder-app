import React from "react";
import { Puff } from "react-loader-spinner";

export function LoaderComp() {
  return (
    <Puff color="rgb(155, 236, 34)" height={70} width={70} timeout={5000} />
  );
}
