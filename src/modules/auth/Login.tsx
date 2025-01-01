import { FormEvent, HTMLAttributes, memo, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import Config from '@/config/login.json';
import fetchHelper from '@/utils/fetchHelper';
import useMessagePopup from '@/hooks/useMessagePopup';
import { Label } from '@/components/ui/label';
import { ApiResponseType } from '@/types/ApiResponseType';

const InitialData = {
  email: '',
  password: '',
};

const commonCookieOptions: any = {
  path: '/',
  expires: new Date(Date.now() + 3600000), // 1 hour
};

export default memo(function LoginModule() {
  const [data, setData] = useState(InitialData);
  const [loading, setLoading] = useState(false);
  const { onMessage } = useMessagePopup();
  const { replace, query } = useRouter();
  const [cookies, setCookies, removeCookie] = useCookies();

  function handleChange<T extends unknown>(id: keyof typeof data, value: T) {
    setData((prev) => ({ ...prev, [id]: value }));
  }

  function onSuccess({ data }: ApiResponseType<string>) {
    setCookies('token', data, commonCookieOptions);
    const redirectPath = query?.['redirect']
      ? (query?.['redirect'] as string)
      : cookies?.['redirectPath'] ?? '/app/dashboard';
    removeCookie('redirectPath', { path: '/' });
    replace(redirectPath);
  }

  async function onSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await fetchHelper(
        { path: '/auth/login' },
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
        setLoading
      );
      if (res instanceof Error) throw res;
      onSuccess(res);
    } catch (error) {
      setLoading(false);
      onMessage({
        title: 'Something went wrong',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={onSignIn} id="sign_in_form">
      {Config.map((field) => {
        if (field.fieldtype === 'input')
          return (
            <span key={field.id} className="space-y-1">
              {field.label ? (
                <Label htmlFor={field.id} className="text-sm text-slate-500">
                  {field.label}
                  {field.required ? <span className="text-red-600"> *</span> : false}
                </Label>
              ) : (
                false
              )}
              <Input
                {...field}
                inputMode={field.inputMode as HTMLAttributes<HTMLInputElement>['inputMode']}
                value={data[field.id as keyof typeof InitialData] as string}
                onChange={(e) => handleChange(field.id as keyof typeof InitialData, e.target.value as string)}
                readOnly={loading}
                disabled={loading}
              />
            </span>
          );
        if (field.fieldtype === 'link' && field.link)
          return (
            <Link
              className="text-muted-foreground text-sm self-end hover:text-primary hover:underline hover:underline-offset-2"
              key={field.id}
              href={field.link}
            >
              {field.label}
            </Link>
          );
      })}
      <section className="w-full flex flex-col gap-3 my-4">
        <Button className="w-full" disabled={loading}>
          Login
        </Button>
      </section>
      <span className="text-sm text-center text-muted-foreground">
        {`Don't have an account? `}
        <Link
          href="/auth/register"
          className="text-sm self-end hover:text-primary hover:underline hover:underline-offset-2"
        >
          Register
        </Link>
      </span>
    </form>
  );
});
