# Lightweight Native PowerShell HTTP Server for BrandX Blog
$port = 8080
$basePath = $PSScriptRoot
if (-not $basePath) { $basePath = "c:\Users\Pooch IT\Desktop\blog 5" }

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "BrandX Blog Server running at http://localhost:$port/"
} catch {
    $port = 8085
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Start()
    Write-Host "BrandX Blog Server running at http://localhost:$port/"
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $relPath = [System.Uri]::UnescapeDataString($request.Url.LocalPath).TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($relPath)) {
            $relPath = "index.html"
        }

        # Normalize path separators
        $relPath = $relPath.Replace('/', '\')
        $filePath = [System.IO.Path]::Combine($basePath, $relPath)

        if ([System.IO.File]::Exists($filePath)) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            switch ($ext) {
                '.html' { $response.ContentType = 'text/html; charset=utf-8' }
                '.css'  { $response.ContentType = 'text/css; charset=utf-8' }
                '.js'   { $response.ContentType = 'application/javascript; charset=utf-8' }
                '.json' { $response.ContentType = 'application/json; charset=utf-8' }
                '.jpg'  { $response.ContentType = 'image/jpeg' }
                '.jpeg' { $response.ContentType = 'image/jpeg' }
                '.png'  { $response.ContentType = 'image/png' }
                '.gif'  { $response.ContentType = 'image/gif' }
                '.svg'  { $response.ContentType = 'image/svg+xml' }
                '.webp' { $response.ContentType = 'image/webp' }
                default { $response.ContentType = 'application/octet-stream' }
            }
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $notFoundBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $relPath")
            $response.ContentLength64 = $notFoundBytes.Length
            $response.OutputStream.Write($notFoundBytes, 0, $notFoundBytes.Length)
        }
        $response.Close()
    } catch {
        # Continue listening on socket error
    }
}
