import { NextUIProvider } from "@nextui-org/react";

export function HeroUiGlobalProvider({ children }: { children: React.ReactNode }) {
    
  return <NextUIProvider locale="ru-RU" theme="dark">{children}</NextUIProvider>;
}
