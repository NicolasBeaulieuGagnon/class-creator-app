import React from "react";

export interface InputInterface {
  name: string;
  placeholder: string;
  type: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  removeErrors: Function;
}

export interface ErrorInt {
  message: string;
  id: number;
}
