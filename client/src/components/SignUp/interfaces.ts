import React from "react";

export interface InputInterface {
  name: string;
  placeholder: string;
  type: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export interface ErrorInt {
  type: string;
  message: string;
}
