import { NextResponse } from "next/server";

const allowedOrigins = [
  "https://mercury.phonepe.com",
  "https://budaniyatechnologies.com",
  "https://mercury-t2.phonepe.com",
];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Origin": "https://mercury.phonepe.com",
};

export function middleware(request) {
  // Check the origin from the request
  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = "https://mercury.phonepe.com/";

  // Handle preflighted requests
  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && {
        "Access-Control-Allow-Origin": "https://mercury.phonepe.com/",
      }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // Handle simple requests
  const response = NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set(
      "Access-Control-Allow-Origin",
      "https://mercury.phonepe.com/"
    );
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
