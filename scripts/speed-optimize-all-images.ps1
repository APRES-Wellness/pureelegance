Add-Type -AssemblyName System.Drawing

function Optimize-ImageInPlace($path, $maxWidth = 850, $quality = 80) {
    if (-not (Test-Path $path)) { return }
    
    $temp = "$path.tmp.jpg"
    try {
        $img = [System.Drawing.Bitmap]::FromFile($path)
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
        
        $newImg.Save($temp, $codec, $encoderParams)
        $newImg.Dispose()
        
        $origSize = (Get-Item $path).Length / 1024
        $newSize = (Get-Item $temp).Length / 1024
        
        Move-Item -Force $temp $path
        Write-Host "Speed-Optimized: $([System.IO.Path]::GetFileName($path)) ($([math]::Round($origSize, 0)) KB -> $([math]::Round($newSize, 0)) KB)"
    } catch {
        Write-Warning "Error processing $path : $_"
        if (Test-Path $temp) { Remove-Item -Force $temp }
    }
}

$dir = "C:\Users\wangu\.gemini\antigravity\scratch\pure-elegance-agency\assets\img\activites"
Get-ChildItem -Path $dir -Filter "*.jpg" | ForEach-Object {
    Optimize-ImageInPlace $_.FullName
}

Write-Host "All activity images are now hyper-optimized for instant mobile rendering!"
