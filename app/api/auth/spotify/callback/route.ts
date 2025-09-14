import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
        // Return an HTML page that closes the tab and shows error
        return new NextResponse(
            `
            <html>
                <body>
                    <script>
                        localStorage.setItem('spotify_auth_error', '${error}');
                        window.close();
                    </script>
                    <p>Authentication failed. You can close this tab.</p>
                </body>
            </html>
        `,
            {
                headers: { "Content-Type": "text/html" },
            },
        );
    }

    if (!code) {
        return new NextResponse(
            `
            <html>
                <body>
                    <script>
                        localStorage.setItem('spotify_auth_error', 'no_code');
                        window.close();
                    </script>
                    <p>No authorization code received. You can close this tab.</p>
                </body>
            </html>
        `,
            {
                headers: { "Content-Type": "text/html" },
            },
        );
    }

    try {
        // Exchange code for access token
        const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
        const redirectUri = `${request.nextUrl.origin}/api/auth/spotify/callback`;

        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: redirectUri,
            }),
        });

        const data = await response.json();

        if (data.access_token) {
            // Return HTML that stores the token and closes the tab
            return new NextResponse(
                `
                <html>
                    <body>
                        <script>
                            localStorage.setItem('spotify_user_token', '${data.access_token}');
                            localStorage.setItem('spotify_auth_success', 'true');
                            window.close();
                        </script>
                        <p>Authentication successful! You can close this tab.</p>
                    </body>
                </html>
            `,
                {
                    headers: { "Content-Type": "text/html" },
                },
            );
        } else {
            return new NextResponse(
                `
                <html>
                    <body>
                        <script>
                            localStorage.setItem('spotify_auth_error', 'token_exchange_failed');
                            window.close();
                        </script>
                        <p>Token exchange failed. You can close this tab.</p>
                    </body>
                </html>
            `,
                {
                    headers: { "Content-Type": "text/html" },
                },
            );
        }
    } catch (error) {
        console.error("Spotify OAuth error:", error);
        return new NextResponse(
            `
            <html>
                <body>
                    <script>
                        localStorage.setItem('spotify_auth_error', 'server_error');
                        window.close();
                    </script>
                    <p>Server error occurred. You can close this tab.</p>
                </body>
            </html>
        `,
            {
                headers: { "Content-Type": "text/html" },
            },
        );
    }
}
