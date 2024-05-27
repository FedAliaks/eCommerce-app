export type InputProfileType = {
  title: string;
  id: string;
  isSizeSmall: boolean;
  type: string;
  value?: string;
  isDisabled: boolean;
  handler?: (
    e: React.ChangeEvent<HTMLInputElement>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  ) => void;
};

export type ProfileComponentType = {
  title?: string;
  subtitle?: string;
  defaultAddress?: boolean;
  inputArray: InputProfileType[];
  flexVertical?: boolean;
};
