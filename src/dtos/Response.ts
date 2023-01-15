export type IResponseDto = {
  message: string;
  success: boolean;
};

export type ISingleResponseDto<T> = IResponseDto & {
  data: T;
};

export type IMultiResponseDto<T> = IResponseDto & {
  data: T[];
};
