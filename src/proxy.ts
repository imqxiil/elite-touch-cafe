import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session - required for Server Components
  const { data: { user } } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Protect all /admin routes except /admin/login
  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginPage = pathname === '/admin/login'

  if (isAdminRoute && !isLoginPage) {
    if (!user) {
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = '/admin/login'
      return NextResponse.redirect(loginUrl)
    }

    // Explicitly check if user is in admin_users table
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .single()

    if (!adminUser) {
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = '/admin/login'
      return NextResponse.redirect(loginUrl)
    }
  }

  // If already logged in AND an admin, redirect away from login page
  if (isLoginPage && user) {
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .single()

    if (adminUser) {
      const dashboardUrl = request.nextUrl.clone()
      dashboardUrl.pathname = '/admin/dashboard'
      return NextResponse.redirect(dashboardUrl)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
