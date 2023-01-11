import React, { createContext } from "react";
import { message } from "antd";
import { MessageInstance } from "antd/es/message/interface";

export type IMessageContextProps = {
  messageApi: MessageInstance;
};

export const MessageContextDefault: IMessageContextProps = {
  messageApi: {} as MessageInstance,
};

export const MessageContext = createContext<IMessageContextProps>(
  MessageContextDefault
);

const MessageProvider = ({ children }: { children: React.ReactNode }) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MessageContext.Provider value={{ messageApi }}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
