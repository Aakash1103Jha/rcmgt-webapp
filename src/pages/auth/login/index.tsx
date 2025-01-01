import dynamic from 'next/dynamic';
import Link from 'next/link';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Login from '@/modules/auth/Login';
import { Separator } from '@/components/ui/separator';
import AuthSectionBg from '@/components/containers/AuthSectionBg';
import fetchHelper from '@/utils/fetchHelper';
import { useAuthContext } from '@/context/AuthContext';

export async function checkIsLoggedIn(token: string) {
  const res = await fetchHelper(
    { path: '/auth/validate' },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  if (res instanceof Error) return false;
  return true;
}

export default function LoginPage() {
  const { replace, query, locale, defaultLocale } = useRouter();
  const { token } = useAuthContext();

  useEffect(() => {
    if (query?.redirect) return;
    if (token) {
      checkIsLoggedIn(token).then((res) => {
        if (res) {
          replace(locale === defaultLocale ? '/' : `/${locale}`);
        }
      });
    }
    return () => {};
  }, [token, locale, defaultLocale, replace, query]);

  return (
    <>
      {/* <Head>
        <meta key="language" name="language" content={props.locale} />
        <meta key="title" name="title" content={props?.title} />
        <meta key="og:url" property="og:url" content={props?.canonical} />
        <meta key="og:title" property="og:title" content={props?.title} />
        <meta key="twitter:url" property="twitter:url" content={props?.canonical} />
        <meta key="twitter:title" property="twitter:title" content={props?.title} />
        <title key="title">{props?.title}</title>
      </Head> */}
      <main className="min-h-[100dvh] h-full flex items-center justify-center">
        <section className="flex-1 hidden md:block">
          <AuthSectionBg src={''} alt="" />
        </section>
        <section className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader className="space-y-1.5">
              <CardTitle>Login</CardTitle>
              <CardDescription>Enter your credentials to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <Login />
            </CardContent>
            <Separator />
            {/* <CardFooter className="flex flex-row items-center text-[75%] text-slate-400 justify-center gap-1 py-2">
              <Link href="/info/privacy">{props?.metadataMap?.sections?.form?.links?.privacy}</Link>
              <span>|</span>
              <Link href="/info/tnc">{props?.metadataMap?.sections?.form?.links?.terms}</Link>
            </CardFooter> */}
          </Card>
        </section>
      </main>
    </>
  );
}
