Add-Type -AssemblyName System.Drawing

function Optimize-Jpg($src, $dest, $maxWidth = 960, $quality = 82) {
    $img = [System.Drawing.Bitmap]::FromFile($src)
    $origW = $img.Width
    $origH = $img.Height
    
    if ($origW -gt $maxWidth) {
        $newW = $maxWidth
        $newH = [int]($origH * ($maxWidth / $origW))
    } else {
        $newW = $origW
        $newH = $origH
    }
    
    $newImg = New-Object System.Drawing.Bitmap($newW, $newH)
    $graphics = [System.Drawing.Graphics]::FromImage($newImg)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    
    $graphics.DrawImage($img, 0, 0, $newW, $newH)
    $graphics.Dispose()
    $img.Dispose()
    
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
    
    $newImg.Save($dest, $codec, $encoderParams)
    $newImg.Dispose()
    
    $origSize = (Get-Item $src).Length / 1024
    $newSize = (Get-Item $dest).Length / 1024
    Write-Host "Optimized: $([System.IO.Path]::GetFileName($src)) ($([math]::Round($origSize, 0)) KB -> $([math]::Round($newSize, 0)) KB)"
}

$dir = "C:\Users\wangu\.gemini\antigravity\scratch\pure-elegance-agency\assets\img\activites"
Optimize-Jpg "$dir\realisation-1.jpg" "$dir\realisation-1-test.jpg"
