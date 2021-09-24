interface ErrorMessages {
  [title: string]: (...k: any) => string;
}

export const errorMessages: ErrorMessages = {
  required: () => "Field required",
  maxLength: (length: number) => `The max word lenght is ${length}`,
  validEmail: () => "Must be a valid email",
};
