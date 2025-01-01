import { ComponentPropsWithoutRef, memo, useEffect } from 'react';

export type OverlayProps = { isOpen: boolean } & ComponentPropsWithoutRef<'section'>;

export default memo(function Overlay({ children, isOpen, className }: OverlayProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  return isOpen ? (
    <section
      id="overlay"
      className={`fixed top-0 left-0 right-0 bottom-0 h-screen backdrop-blur-sm bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-[999] p-page ${className}`}
    >
      {children}
    </section>
  ) : null;
});
