import { memo } from 'react';

export type NoDataAvailableProps = {
  title?: string;
  subtitle?: string;
  icon?: false | JSX.Element;
};

export default memo(function NoDataAvailable({ icon, subtitle, title }: NoDataAvailableProps) {
  return (
    <section className="w-full bg-secondary/30 flex flex-col gap-3 px-page py-8 border border-border/50 rounded-sm items-center">
      {icon ? (
        <span className="h-10 w-10 flex items-center justify-center rounded-sm bg-secondary text-zinc-500">{icon}</span>
      ) : (
        false
      )}
      <span className="space-y-1 text-center">
        <h3 className="font-semibold text-lg">{title || 'No Data Available'}</h3>
        <p className="text-sm text-primary/50 max-w-md w-full">
          {subtitle || 'There is nothing to show at the moment. Please check back later'}
        </p>
      </span>
    </section>
  );
});
