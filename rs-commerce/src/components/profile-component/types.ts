export type InputProfileType = {
  title: string;
  id: string;
  isSizeSmall: boolean;
  type: string;
  value: string;
};

export type ProfileComponentType = {
  title?: string;
  subtitle?: string;
  defaultAddress?: boolean;
  inputArray: InputProfileType[];
};
