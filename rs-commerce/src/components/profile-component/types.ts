export type InputProfileType = {
  title: string;
  id: string;
  isSizeSmall: boolean;
  type: string;
  value?: string;
  isDisabled: boolean;
};

export type ProfileComponentType = {
  title?: string;
  subtitle?: string;
  defaultAddress?: boolean;
  inputArray: InputProfileType[];
};
