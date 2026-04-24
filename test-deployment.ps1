# AIRLAB Website - Deployment Testing Script (PowerShell)
# This script tests the deployment to ensure everything works correctly

param(
    [string]$BaseUrl = "http://localhost:3000",
    [string]$AdminPassword = "AIRLAB_2025"
)

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "AIRLAB Website - Deployment Test Suite" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Testing URL: $BaseUrl"
Write-Host ""

$TestsPassed = 0
$TestsFailed = 0

# Function to test endpoint
function Test-Endpoint {
    param(
        [string]$Name,
        [string]$Url,
        [int]$ExpectedStatus
    )
    
    Write-Host "Testing $Name... " -NoNewline
    
    try {
        $response = Invoke-WebRequest -Uri $Url -Method Get -UseBasicParsing -ErrorAction Stop
        $status = $response.StatusCode
        
        if ($status -eq $ExpectedStatus) {
            Write-Host "[OK]" -ForegroundColor Green -NoNewline
            Write-Host " (Status: $status)"
            $script:TestsPassed++
        } else {
            Write-Host "[ERROR]" -ForegroundColor Red -NoNewline
            Write-Host " (Expected: $ExpectedStatus, Got: $status)"
            $script:TestsFailed++
        }
    } catch {
        Write-Host "[ERROR]" -ForegroundColor Red -NoNewline
        Write-Host " (Error: $($_.Exception.Message))"
        $script:TestsFailed++
    }
}

# Function to test JSON endpoint
function Test-JsonEndpoint {
    param(
        [string]$Name,
        [string]$Url,
        [string]$ExpectedKey
    )
    
    Write-Host "Testing $Name... " -NoNewline
    
    try {
        $response = Invoke-RestMethod -Uri $Url -Method Get -ErrorAction Stop
        $json = $response | ConvertTo-Json
        
        if ($json -match $ExpectedKey) {
            Write-Host "[OK]" -ForegroundColor Green
            $script:TestsPassed++
        } else {
            Write-Host "[ERROR]" -ForegroundColor Red -NoNewline
            Write-Host " (Key '$ExpectedKey' not found)"
            $script:TestsFailed++
        }
    } catch {
        Write-Host "[ERROR]" -ForegroundColor Red -NoNewline
        Write-Host " (Error: $($_.Exception.Message))"
        $script:TestsFailed++
    }
}

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "1. Testing Public Pages" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

Test-Endpoint "Home Page" "$BaseUrl/" 200
Test-Endpoint "About Page" "$BaseUrl/about" 200
Test-Endpoint "Projects Page" "$BaseUrl/projects" 200
Test-Endpoint "Research Page" "$BaseUrl/research" 200
Test-Endpoint "Team Page" "$BaseUrl/team" 200
Test-Endpoint "News Page" "$BaseUrl/news" 200
Test-Endpoint "Contact Page" "$BaseUrl/contact" 200

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "2. Testing Admin Pages" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

Test-Endpoint "Admin Dashboard" "$BaseUrl/admin-air-airlabalaba" 200
Test-Endpoint "Admin Projects" "$BaseUrl/admin-air-airlabalaba/projects" 200
Test-Endpoint "Admin News" "$BaseUrl/admin-air-airlabalaba/news" 200
Test-Endpoint "Admin Team" "$BaseUrl/admin-air-airlabalaba/team" 200
Test-Endpoint "Admin Research" "$BaseUrl/admin-air-airlabalaba/research" 200
Test-Endpoint "Admin History" "$BaseUrl/admin-air-airlabalaba/history" 200

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "3. Testing API Endpoints" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

Test-JsonEndpoint "Projects API" "$BaseUrl/api/admin/projects" "success"
Test-JsonEndpoint "News API" "$BaseUrl/api/admin/news" "success"
Test-JsonEndpoint "Research API" "$BaseUrl/api/admin/research" "success"
Test-JsonEndpoint "Team API" "$BaseUrl/api/admin/team?category=all" "success"
Test-JsonEndpoint "History API" "$BaseUrl/api/admin/history" "success"

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "4. Testing Authentication" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Testing Auth Verify... " -NoNewline
try {
    $verifyResponse = Invoke-RestMethod -Uri "$BaseUrl/api/auth/verify" -Method Get
    if ($verifyResponse.PSObject.Properties.Name -contains "authenticated") {
        Write-Host "[OK]" -ForegroundColor Green
        $TestsPassed++
    } else {
        Write-Host "[ERROR]" -ForegroundColor Red
        $TestsFailed++
    }
} catch {
    Write-Host "[ERROR]" -ForegroundColor Red
    $TestsFailed++
}

Write-Host "Testing Admin Login... " -NoNewline
try {
    $body = @{
        password = $AdminPassword
    } | ConvertTo-Json
    
    $loginResponse = Invoke-RestMethod -Uri "$BaseUrl/api/auth/login" -Method Post -Body $body -ContentType "application/json"
    if ($loginResponse.success) {
        Write-Host "[OK]" -ForegroundColor Green
        $TestsPassed++
    } else {
        Write-Host "[ERROR]" -ForegroundColor Red
        $TestsFailed++
    }
} catch {
    Write-Host "[ERROR]" -ForegroundColor Red
    $TestsFailed++
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "5. Testing Static Assets" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

Test-Endpoint "Main Logo" "$BaseUrl/images/main_logo.png" 200
Test-Endpoint "Hero Image" "$BaseUrl/images/hero-image.png" 200

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "6. Testing Security Headers" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Testing X-Frame-Options... " -NoNewline
try {
    $response = Invoke-WebRequest -Uri $BaseUrl -Method Get -UseBasicParsing
    if ($response.Headers["X-Frame-Options"]) {
        Write-Host "[OK]" -ForegroundColor Green
        $TestsPassed++
    } else {
        Write-Host "[ERROR]" -ForegroundColor Red
        $TestsFailed++
    }
} catch {
    Write-Host "[ERROR]" -ForegroundColor Red
    $TestsFailed++
}

Write-Host "Testing X-Content-Type-Options... " -NoNewline
try {
    $response = Invoke-WebRequest -Uri $BaseUrl -Method Get -UseBasicParsing
    if ($response.Headers["X-Content-Type-Options"]) {
        Write-Host "[OK]" -ForegroundColor Green
        $TestsPassed++
    } else {
        Write-Host "[ERROR]" -ForegroundColor Red
        $TestsFailed++
    }
} catch {
    Write-Host "[ERROR]" -ForegroundColor Red
    $TestsFailed++
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Test Results" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Tests Passed: " -NoNewline
Write-Host $TestsPassed -ForegroundColor Green
Write-Host "Tests Failed: " -NoNewline
Write-Host $TestsFailed -ForegroundColor Red
Write-Host ""

if ($TestsFailed -eq 0) {
    Write-Host "[PASS] All tests passed! Deployment is ready." -ForegroundColor Green
    exit 0
} else {
    Write-Host "[FAIL] Some tests failed. Please review the errors above." -ForegroundColor Red
    exit 1
}
