import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import fetchHelper from './utils/fetchHelper';

export async function middleware(req: NextRequest) {
  const user = await getUser(req);
  if (user instanceof Error) {
    console.error(user);
    return NextResponse.redirect(new URL(`${req.nextUrl.origin}/auth/login?redirect=${req.nextUrl.pathname}`, req.url));
  }
  return NextResponse.next();
}

async function getUser(req: NextRequest) {
  const token = req.cookies.get('token');
  if (!token) return new Error('Token not found');
  const res = await fetchHelper({ path: '/auth/validate' }, { headers: { Authorization: token.value } });
  if (res instanceof Error) return res;
  return res as { role: string[]; id: string };
}

export const config = {
  matcher: ['/app/:path*'],
};
