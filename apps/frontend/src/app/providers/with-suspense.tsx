import { FC, ReactNode, Suspense } from "react";

export function withSuspense<WrappedProps extends Object>(
  WrappedComponent: FC<WrappedProps>,
  suspenseProps: { fallback: ReactNode },
): FC<WrappedProps> {
  function WrapperComponent(props: WrappedProps) {
    return (
      <Suspense fallback={suspenseProps.fallback}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  }

  return WrapperComponent;
}
