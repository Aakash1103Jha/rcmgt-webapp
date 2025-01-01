import { Loader } from 'lucide-react';
import { ComponentPropsWithoutRef, Fragment, memo } from 'react';

import Overlay from './Overlay';

export type LoaderProps = { loading: boolean } & ComponentPropsWithoutRef<'section'>;

export default memo(function Loader({ loading, children }: LoaderProps) {
  return (
    <Fragment>
      {loading ? (
        <Overlay isOpen={loading} className="">
          <InlineLoader />
        </Overlay>
      ) : (
        false
      )}
      {children}
    </Fragment>
  );
});

export function InlineLoader() {
  return <Loader size={24} className="w-full animate-spin" />;
}
