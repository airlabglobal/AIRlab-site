# AIRLAB Website - Comprehensive Admin Actions Test
# Tests all CRUD operations for admin panel

param(
    [string]$BaseUrl = "http://localhost:9002",
    [string]$AdminPassword = "AIRLAB_2025"
)

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "AIRLAB Admin Panel - Full Test Suite" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Base URL: $BaseUrl" -ForegroundColor Yellow
Write-Host "Admin Password: $AdminPassword" -ForegroundColor Yellow
Write-Host ""

$TestsPassed = 0
$TestsFailed = 0
$SessionCookie = $null

# Function to log test result
function Log-TestResult {
    param(
        [string]$TestName,
        [bool]$Passed,
        [string]$Details = ""
    )
    
    if ($Passed) {
        Write-Host "✓ " -ForegroundColor Green -NoNewline
        Write-Host "$TestName" -ForegroundColor White
        if ($Details) { Write-Host "  $Details" -ForegroundColor Gray }
        $script:TestsPassed++
    } else {
        Write-Host "✗ " -ForegroundColor Red -NoNewline
        Write-Host "$TestName" -ForegroundColor White
        if ($Details) { Write-Host "  $Details" -ForegroundColor Yellow }
        $script:TestsFailed++
    }
}

# Test 1: Login
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "1. Testing Authentication" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

try {
    $loginBody = @{
        password = $AdminPassword
    } | ConvertTo-Json
    
    $session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
    $loginResponse = Invoke-WebRequest -Uri "$BaseUrl/api/auth/login" `
        -Method Post `
        -Body $loginBody `
        -ContentType "application/json" `
        -WebSession $session `
        -UseBasicParsing
    
    $loginData = $loginResponse.Content | ConvertFrom-Json
    
    if ($loginData.success) {
        $SessionCookie = $session
        Log-TestResult "Admin Login" $true "Successfully authenticated"
    } else {
        Log-TestResult "Admin Login" $false "Login failed: $($loginData.error)"
    }
} catch {
    Log-TestResult "Admin Login" $false "Error: $($_.Exception.Message)"
}

Write-Host ""

# Test 2: Verify Authentication
try {
    $verifyResponse = Invoke-RestMethod -Uri "$BaseUrl/api/auth/verify" `
        -Method Get `
        -WebSession $SessionCookie
    
    Log-TestResult "Auth Verification" $verifyResponse.authenticated "Session is valid"
} catch {
    Log-TestResult "Auth Verification" $false "Error: $($_.Exception.Message)"
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "2. Testing Projects CRUD" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$testProjectId = $null

# Create Project
try {
    $projectData = @{
        title = "Test Project - Automated Test"
        description = "This is a test project created by automated testing script"
        imageUrl = "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
        tags = @("Testing", "Automation", "QA")
        status = "Ongoing"
        link = "https://github.com/test"
    } | ConvertTo-Json
    
    $createResponse = Invoke-RestMethod -Uri "$BaseUrl/api/admin/projects" `
        -Method Post `
        -Body $projectData `
        -ContentType "application/json" `
        -WebSession $SessionCookie
    
    if ($createResponse.success) {
        $testProjectId = $createResponse.data.id
        Log-TestResult "Create Project" $true "Project ID: $testProjectId"
    } else {
        Log-TestResult "Create Project" $false $createResponse.error
    }
} catch {
    Log-TestResult "Create Project" $false "Error: $($_.Exception.Message)"
}

# Read Projects
try {
    $readResponse = Invoke-RestMethod -Uri "$BaseUrl/api/admin/projects" -Method Get
    
    if ($readResponse.success) {
        $projectCount = $readResponse.data.Count
        Log-TestResult "Read Projects" $true "Found $projectCount projects"
    } else {
        Log-TestResult "Read Projects" $false $readResponse.error
    }
} catch {
    Log-TestResult "Read Projects" $false "Error: $($_.Exception.Message)"
}

# Update Project
if ($testProjectId) {
    try {
        $updateData = @{
            id = $testProjectId
            title = "Test Project - Updated"
            description = "This project has been updated by automated testing"
            imageUrl = "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
            tags = @("Testing", "Automation", "Updated")
            status = "Completed"
            link = "https://github.com/test-updated"
        } | ConvertTo-Json
        
        $updateResponse = Invoke-RestMethod -Uri "$BaseUrl/api/admin/projects" `
            -Method Put `
            -Body $updateData `
            -ContentType "application/json" `
            -WebSession $SessionCookie
        
        Log-TestResult "Update Project" $updateResponse.success "Status changed to Completed"
    } catch {
        Log-TestResult "Update Project" $false "Error: $($_.Exception.Message)"
    }
}

# Delete Project
if ($testProjectId) {
    try {
        $deleteResponse = Invoke-RestMethod -Uri "$BaseUrl/api/admin/projects?id=$testProjectId" `
            -Method Delete `
            -WebSession $SessionCookie
        
        Log-TestResult "Delete Project" $deleteResponse.success "Project removed"
    } catch {
        Log-TestResult "Delete Project" $false "Error: $($_.Exception.Message)"
    }
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "3. Testing News CRUD" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$testNewsId = $null

# Create News
try {
    $newsData = @{
        title = "Test News Item - Automated Test"
        date = (Get-Date -Format "yyyy-MM-dd")
        link = "https://example.com/test-news"
    } | ConvertTo-Json
    
    $createResponse = Invoke-RestMethod -Uri "$BaseUrl/api/admin/news" `
        -Method Post `
        -Body $newsData `
        -ContentType "application/json" `
        -WebSession $SessionCookie
    
    if ($createResponse.success) {
        $testNewsId = $createResponse.data.id
        Log-TestResult "Create News" $true "News ID: $testNewsId"
    } else {
        Log-TestResult "Create News" $false $createResponse.error
    }
} catch {
    Log-TestResult "Create News" $false "Error: $($_.Exception.Message)"
}

# Read News
try {
    $readResponse = Invoke-RestMethod -Uri "$BaseUrl/api/admin/news" -Method Get
    
    if ($readResponse.success) {
        $newsCount = $readResponse.data.Count
        Log-TestResult "Read News" $true "Found $newsCount news items"
    } else {
        Log-TestResult "Read News" $false $readResponse.error
    }
} catch {
    Log-TestResult "Read News" $false "Error: $($_.Exception.Message)"
}

# Update News
if ($testNewsId) {
    try {
        $updateData = @{
            id = $testNewsId
            title = "Test News Item - Updated"
            date = (Get-Date -Format "yyyy-MM-dd")
            link = "https://example.com/test-news-updated"
        } | ConvertTo-Json
        
        $updateResponse = Invoke-RestMethod -Uri "$BaseUrl/api/admin/news" `
            -Method Put `
            -Body $updateData `
            -ContentType "application/json" `
            -WebSession $SessionCookie
        
        Log-TestResult "Update News" $updateResponse.success "Title updated"
    } catch {
        Log-TestResult "Update News" $false "Error: $($_.Exception.Message)"
    }
}

# Delete News
if ($testNewsId) {
    try {
        $deleteResponse = Invoke-RestMethod -Uri "$BaseUrl/api/admin/news?id=$testNewsId" `
            -Method Delete `
            -WebSession $SessionCookie
        
        Log-TestResult "Delete News" $deleteResponse.success "News item removed"
    } catch {
        Log-TestResult "Delete News" $false "Error: $($_.Exception.Message)"
    }
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "4. Testing Research CRUD" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$testResearchId = $null

# Create Research
try {
    $researchData = @{
        title = "Test Research Paper - Automated Testing in AI Systems"
        authors = "Test Author, Another Author"
        year = 2026
        description = "This is a test research paper created by automated testing"
        fileUrl = "https://example.com/test-paper.pdf"
        imageUrl = "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
    } | ConvertTo-Json
    
    $createResponse = Invoke-RestMethod -Uri "$BaseUrl/api/admin/research" `
        -Method Post `
        -Body $researchData `
        -ContentType "application/json" `
        -WebSession $SessionCookie
    
    if ($createResponse.success) {
        $testResearchId = $createResponse.data._id
        Log-TestResult "Create Research" $true "Research ID: $testResearchId"
    } else {
        Log-TestResult "Create Research" $false $createResponse.error
    }
} catch {
    Log-TestResult "Create Research" $false "Error: $($_.Exception.Message)"
}

# Read Research
try {
    $readResponse = Invoke-RestMethod -Uri "$BaseUrl/api/admin/research" -Method Get
    
    if ($readResponse.success) {
        $researchCount = $readResponse.data.Count
        Log-TestResult "Read Research" $true "Found $researchCount research papers"
    } else {
        Log-TestResult "Read Research" $false $readResponse.error
    }
} catch {
    Log-TestResult "Read Research" $false "Error: $($_.Exception.Message)"
}

# Update Research
if ($testResearchId) {
    try {
        $updateData = @{
            _id = $testResearchId
            title = "Test Research Paper - Updated Title"
            authors = "Test Author, Another Author, Third Author"
            year = 2026
            description = "This research paper has been updated"
            fileUrl = "https://example.com/test-paper-updated.pdf"
            imageUrl = "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
        } | ConvertTo-Json
        
        $updateResponse = Invoke-RestMethod -Uri "$BaseUrl/api/admin/research" `
            -Method Put `
            -Body $updateData `
            -ContentType "application/json" `
            -WebSession $SessionCookie
        
        Log-TestResult "Update Research" $updateResponse.success "Authors updated"
    } catch {
        Log-TestResult "Update Research" $false "Error: $($_.Exception.Message)"
    }
}

# Delete Research
if ($testResearchId) {
    try {
        $deleteResponse = Invoke-RestMethod -Uri "$BaseUrl/api/admin/research?id=$testResearchId" `
            -Method Delete `
            -WebSession $SessionCookie
        
        Log-TestResult "Delete Research" $deleteResponse.success "Research paper removed"
    } catch {
        Log-TestResult "Delete Research" $false "Error: $($_.Exception.Message)"
    }
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "5. Testing Team CRUD" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$testTeamId = $null

# Create Team Member
try {
    $teamData = @{
        category = "volunteers"
        name = "Test Member"
        role = "Test Role - QA Engineer"
        imageUrl = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
        bio = "This is a test team member created by automated testing script"
        social = @{
            linkedin = "https://linkedin.com/in/test"
            twitter = "https://twitter.com/test"
            github = "https://github.com/test"
            email = "test@example.com"
        }
    } | ConvertTo-Json
    
    $createResponse = Invoke-RestMethod -Uri "$BaseUrl/api/admin/team" `
        -Method Post `
        -Body $teamData `
        -ContentType "application/json" `
        -WebSession $SessionCookie
    
    if ($createResponse.success) {
        $testTeamId = $createResponse.data.id
        Log-TestResult "Create Team Member" $true "Team ID: $testTeamId"
    } else {
        Log-TestResult "Create Team Member" $false $createResponse.error
    }
} catch {
    Log-TestResult "Create Team Member" $false "Error: $($_.Exception.Message)"
}

# Read Team
try {
    $readResponse = Invoke-RestMethod -Uri "$BaseUrl/api/admin/team?category=all" -Method Get
    
    if ($readResponse.success) {
        $leadingCount = $readResponse.data.leading.Count
        $pioneerCount = $readResponse.data.pioneer.Count
        $volunteersCount = $readResponse.data.volunteers.Count
        $totalCount = $leadingCount + $pioneerCount + $volunteersCount
        Log-TestResult "Read Team" $true "Found $totalCount members (Leading: $leadingCount, Pioneer: $pioneerCount, Volunteers: $volunteersCount)"
    } else {
        Log-TestResult "Read Team" $false $readResponse.error
    }
} catch {
    Log-TestResult "Read Team" $false "Error: $($_.Exception.Message)"
}

# Update Team Member
if ($testTeamId) {
    try {
        $updateData = @{
            category = "volunteers"
            id = $testTeamId
            name = "Test Member - Updated"
            role = "Senior QA Engineer"
            imageUrl = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
            bio = "This team member has been updated by automated testing"
            social = @{
                linkedin = "https://linkedin.com/in/test-updated"
                twitter = "https://twitter.com/test"
                github = "https://github.com/test"
                email = "test.updated@example.com"
            }
        } | ConvertTo-Json
        
        $updateResponse = Invoke-RestMethod -Uri "$BaseUrl/api/admin/team" `
            -Method Put `
            -Body $updateData `
            -ContentType "application/json" `
            -WebSession $SessionCookie
        
        Log-TestResult "Update Team Member" $updateResponse.success "Role updated to Senior"
    } catch {
        Log-TestResult "Update Team Member" $false "Error: $($_.Exception.Message)"
    }
}

# Delete Team Member
if ($testTeamId) {
    try {
        $deleteUrl = "$BaseUrl/api/admin/team?id=$testTeamId`&category=volunteers"
        $deleteResponse = Invoke-RestMethod -Uri $deleteUrl `
            -Method Delete `
            -WebSession $SessionCookie
        
        Log-TestResult "Delete Team Member" $deleteResponse.success "Team member removed"
    } catch {
        Log-TestResult "Delete Team Member" $false "Error: $($_.Exception.Message)"
    }
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "6. Testing History CRUD" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$testHistoryId = $null

# Create History
try {
    $historyData = @{
        year = "2026"
        event = "Automated Testing Implementation"
        description = "This is a test history item created by automated testing script"
        link = "https://example.com/test-history"
    } | ConvertTo-Json
    
    $createResponse = Invoke-RestMethod -Uri "$BaseUrl/api/admin/history" `
        -Method Post `
        -Body $historyData `
        -ContentType "application/json" `
        -WebSession $SessionCookie
    
    if ($createResponse.success) {
        $testHistoryId = $createResponse.data.id
        Log-TestResult "Create History" $true "History ID: $testHistoryId"
    } else {
        Log-TestResult "Create History" $false $createResponse.error
    }
} catch {
    Log-TestResult "Create History" $false "Error: $($_.Exception.Message)"
}

# Read History
try {
    $readResponse = Invoke-RestMethod -Uri "$BaseUrl/api/admin/history" -Method Get
    
    if ($readResponse.success) {
        $historyCount = $readResponse.data.Count
        Log-TestResult "Read History" $true "Found $historyCount history items"
    } else {
        Log-TestResult "Read History" $false $readResponse.error
    }
} catch {
    Log-TestResult "Read History" $false "Error: $($_.Exception.Message)"
}

# Update History
if ($testHistoryId) {
    try {
        $updateData = @{
            id = $testHistoryId
            year = "2026"
            event = "Automated Testing Implementation - Updated"
            description = "This history item has been updated by automated testing"
            link = "https://example.com/test-history-updated"
        } | ConvertTo-Json
        
        $updateResponse = Invoke-RestMethod -Uri "$BaseUrl/api/admin/history" `
            -Method Put `
            -Body $updateData `
            -ContentType "application/json" `
            -WebSession $SessionCookie
        
        Log-TestResult "Update History" $updateResponse.success "Event title updated"
    } catch {
        Log-TestResult "Update History" $false "Error: $($_.Exception.Message)"
    }
}

# Delete History
if ($testHistoryId) {
    try {
        $deleteResponse = Invoke-RestMethod -Uri "$BaseUrl/api/admin/history?id=$testHistoryId" `
            -Method Delete `
            -WebSession $SessionCookie
        
        Log-TestResult "Delete History" $deleteResponse.success "History item removed"
    } catch {
        Log-TestResult "Delete History" $false "Error: $($_.Exception.Message)"
    }
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "7. Testing Logout" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

try {
    $logoutResponse = Invoke-RestMethod -Uri "$BaseUrl/api/auth/logout" `
        -Method Post `
        -WebSession $SessionCookie
    
    Log-TestResult "Admin Logout" $logoutResponse.success "Session terminated"
} catch {
    Log-TestResult "Admin Logout" $false "Error: $($_.Exception.Message)"
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Final Results" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Tests Passed: " -NoNewline
Write-Host $TestsPassed -ForegroundColor Green
Write-Host "Tests Failed: " -NoNewline
Write-Host $TestsFailed -ForegroundColor Red
Write-Host ""

$successRate = [math]::Round(($TestsPassed / ($TestsPassed + $TestsFailed)) * 100, 2)
Write-Host "Success Rate: $successRate%" -ForegroundColor $(if ($successRate -ge 90) { "Green" } elseif ($successRate -ge 70) { "Yellow" } else { "Red" })
Write-Host ""

if ($TestsFailed -eq 0) {
    Write-Host "✓ All admin actions working perfectly!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Admin Panel Credentials:" -ForegroundColor Cyan
    Write-Host "  URL: $BaseUrl/admin-air-airlabalaba" -ForegroundColor White
    Write-Host "  Password: $AdminPassword" -ForegroundColor White
    exit 0
} else {
    Write-Host "✗ Some tests failed. Please review the errors above." -ForegroundColor Red
    exit 1
}
