import { ComponentPropsWithoutRef } from 'react';

export type MaxWidthProps = ComponentPropsWithoutRef<'section'> & {
  paddingX?: boolean;
  paddingY?: boolean;
};
export function MaxWidth({ className, style, children, paddingX = true, paddingY = false, ...rest }: MaxWidthProps) {
  return (
    <section
      id="width-wrapper"
      className={`max-w-screen-xl mx-auto w-full ${paddingX ? 'px-page' : null} ${
        paddingY ? 'py-page' : null
      } h-fit ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </section>
  );
}
