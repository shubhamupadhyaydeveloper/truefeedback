import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/signin', '/signup', '/', '/verify/:path*'],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request,secret : process.env.NEXT_SECRET });
  const url = request.nextUrl;
  console.log('token',token)

  if(token && (url.pathname.startsWith('/signin')|| url.pathname.startsWith('/signup'))){
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } 
  
  if (!token && (url.pathname.startsWith('/dashboard') || url.pathname.startsWith("/u"))) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  
  return NextResponse.next();
}