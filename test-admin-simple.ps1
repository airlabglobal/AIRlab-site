# AIRLAB Website - Simple Admin Test
param(
    [string]$BaseUrl = "http://localhost:9002",
    [string]$Password = "AIRLAB_2025"
)

Write-Host "`n=========================================`n" -ForegroundColor Cyan
Write-Host "AIRLAB Admin Panel Test`n" -ForegroundColor Cyan
Write-Host "URL: $BaseUrl" -ForegroundColor Yellow
Write-Host "Password: $Password`n" -ForegroundColor Yellow

$passed = 0
$failed = 0

function Test-Action {
    param($name, $result, $details)
    if ($result) {
        Write-Host "✓ $name" -ForegroundColor Green
        if ($details) { Write-Host "  $details" -ForegroundColor Gray }
        $script:passed++
    } else {
        Write-Host "✗ $name" -ForegroundColor Red
        if ($details) { Write-Host "  $details" -ForegroundColor Yellow }
        $script:failed++
    }
}

# Test Login
Write-Host "`n1. Authentication" -ForegroundColor Cyan
Write-Host "==================`n" -ForegroundColor Cyan

try {
    $session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
    $body = @{ password = $Password } | ConvertTo-Json
    $response = Invoke-WebRequest -Uri "$BaseUrl/api/auth/login" -Method Post -Body $body -ContentType "application/json" -WebSession $session -UseBasicParsing
    $data = $response.Content | ConvertFrom-Json
    Test-Action "Login" $data.success "Authenticated successfully"
    $global:session = $session
} catch {
    Test-Action "Login" $false $_.Exception.Message
}

# Test Projects
Write-Host "`n2. Projects CRUD" -ForegroundColor Cyan
Write-Host "================`n" -ForegroundColor Cyan

try {
    $projectData = @{
        title = "Test Project"
        description = "Automated test project"
        imageUrl = "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
        tags = @("Test")
        status = "Ongoing"
        link = ""
    } | ConvertTo-Json
    
    $create = Invoke-RestMethod -Uri "$BaseUrl/api/admin/projects" -Method Post -Body $projectData -ContentType "application/json" -WebSession $global:session
    Test-Action "Create Project" $create.success "ID: $($create.data.id)"
    $projectId = $create.data.id
    
    $read = Invoke-RestMethod -Uri "$BaseUrl/api/admin/projects" -Method Get
    Test-Action "Read Projects" $read.success "Count: $($read.data.Count)"
    
    if ($projectId) {
        $updateData = @{
            id = $projectId
            title = "Test Project Updated"
            description = "Updated description"
            imageUrl = "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
            tags = @("Test", "Updated")
            status = "Completed"
            link = ""
        } | ConvertTo-Json
        
        $update = Invoke-RestMethod -Uri "$BaseUrl/api/admin/projects" -Method Put -Body $updateData -ContentType "application/json" -WebSession $global:session
        Test-Action "Update Project" $update.success "Status: Completed"
        
        $delete = Invoke-RestMethod -Uri "$BaseUrl/api/admin/projects?id=$projectId" -Method Delete -WebSession $global:session
        Test-Action "Delete Project" $delete.success "Removed"
    }
} catch {
    Test-Action "Projects CRUD" $false $_.Exception.Message
}

# Test News
Write-Host "`n3. News CRUD" -ForegroundColor Cyan
Write-Host "============`n" -ForegroundColor Cyan

try {
    $newsData = @{
        title = "Test News"
        date = (Get-Date -Format "yyyy-MM-dd")
        link = "https://example.com/test"
    } | ConvertTo-Json
    
    $create = Invoke-RestMethod -Uri "$BaseUrl/api/admin/news" -Method Post -Body $newsData -ContentType "application/json" -WebSession $global:session
    Test-Action "Create News" $create.success "ID: $($create.data.id)"
    $newsId = $create.data.id
    
    $read = Invoke-RestMethod -Uri "$BaseUrl/api/admin/news" -Method Get
    Test-Action "Read News" $read.success "Count: $($read.data.Count)"
    
    if ($newsId) {
        $updateData = @{
            id = $newsId
            title = "Test News Updated"
            date = (Get-Date -Format "yyyy-MM-dd")
            link = "https://example.com/test-updated"
        } | ConvertTo-Json
        
        $update = Invoke-RestMethod -Uri "$BaseUrl/api/admin/news" -Method Put -Body $updateData -ContentType "application/json" -WebSession $global:session
        Test-Action "Update News" $update.success "Title updated"
        
        $delete = Invoke-RestMethod -Uri "$BaseUrl/api/admin/news?id=$newsId" -Method Delete -WebSession $global:session
        Test-Action "Delete News" $delete.success "Removed"
    }
} catch {
    Test-Action "News CRUD" $false $_.Exception.Message
}

# Test Research
Write-Host "`n4. Research CRUD" -ForegroundColor Cyan
Write-Host "================`n" -ForegroundColor Cyan

try {
    $researchData = @{
        title = "Test Research Paper"
        authors = "Test Author"
        year = 2026
        description = "Test description"
        fileUrl = "https://example.com/paper.pdf"
    } | ConvertTo-Json
    
    $create = Invoke-RestMethod -Uri "$BaseUrl/api/admin/research" -Method Post -Body $researchData -ContentType "application/json" -WebSession $global:session
    Test-Action "Create Research" $create.success "ID: $($create.data._id)"
    $researchId = $create.data._id
    
    $read = Invoke-RestMethod -Uri "$BaseUrl/api/admin/research" -Method Get
    Test-Action "Read Research" $read.success "Count: $($read.data.Count)"
    
    if ($researchId) {
        $updateData = @{
            _id = $researchId
            title = "Test Research Updated"
            authors = "Test Author, Another Author"
            year = 2026
            description = "Updated description"
            fileUrl = "https://example.com/paper-updated.pdf"
        } | ConvertTo-Json
        
        $update = Invoke-RestMethod -Uri "$BaseUrl/api/admin/research" -Method Put -Body $updateData -ContentType "application/json" -WebSession $global:session
        Test-Action "Update Research" $update.success "Authors updated"
        
        $delete = Invoke-RestMethod -Uri "$BaseUrl/api/admin/research?id=$researchId" -Method Delete -WebSession $global:session
        Test-Action "Delete Research" $delete.success "Removed"
    }
} catch {
    Test-Action "Research CRUD" $false $_.Exception.Message
}

# Test Team
Write-Host "`n5. Team CRUD" -ForegroundColor Cyan
Write-Host "============`n" -ForegroundColor Cyan

try {
    $teamData = @{
        category = "volunteers"
        name = "Test Member"
        role = "Test Role"
        imageUrl = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
        bio = "Test bio"
        social = @{
            linkedin = ""
            twitter = ""
            github = ""
            email = "test@example.com"
        }
    } | ConvertTo-Json
    
    $create = Invoke-RestMethod -Uri "$BaseUrl/api/admin/team" -Method Post -Body $teamData -ContentType "application/json" -WebSession $global:session
    Test-Action "Create Team Member" $create.success "ID: $($create.data.id)"
    $teamId = $create.data.id
    
    $read = Invoke-RestMethod -Uri "$BaseUrl/api/admin/team?category=all" -Method Get
    Test-Action "Read Team" $read.success "Total members found"
    
    if ($teamId) {
        $updateData = @{
            category = "volunteers"
            id = $teamId
            name = "Test Member Updated"
            role = "Senior Test Role"
            imageUrl = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
            bio = "Updated bio"
            social = @{
                linkedin = ""
                twitter = ""
                github = ""
                email = "test.updated@example.com"
            }
        } | ConvertTo-Json
        
        $update = Invoke-RestMethod -Uri "$BaseUrl/api/admin/team" -Method Put -Body $updateData -ContentType "application/json" -WebSession $global:session
        Test-Action "Update Team Member" $update.success "Role updated"
        
        $deleteUrl = "$BaseUrl/api/admin/team?id=$teamId" + [char]38 + "category=volunteers"
        $delete = Invoke-RestMethod -Uri $deleteUrl -Method Delete -WebSession $global:session
        Test-Action "Delete Team Member" $delete.success "Removed"
    }
} catch {
    Test-Action "Team CRUD" $false $_.Exception.Message
}

# Test History
Write-Host "`n6. History CRUD" -ForegroundColor Cyan
Write-Host "===============`n" -ForegroundColor Cyan

try {
    $historyData = @{
        year = "2026"
        event = "Test Event"
        description = "Test description"
        link = "https://example.com/test"
    } | ConvertTo-Json
    
    $create = Invoke-RestMethod -Uri "$BaseUrl/api/admin/history" -Method Post -Body $historyData -ContentType "application/json" -WebSession $global:session
    Test-Action "Create History" $create.success "ID: $($create.data.id)"
    $historyId = $create.data.id
    
    $read = Invoke-RestMethod -Uri "$BaseUrl/api/admin/history" -Method Get
    Test-Action "Read History" $read.success "Count: $($read.data.Count)"
    
    if ($historyId) {
        $updateData = @{
            id = $historyId
            year = "2026"
            event = "Test Event Updated"
            description = "Updated description"
            link = "https://example.com/test-updated"
        } | ConvertTo-Json
        
        $update = Invoke-RestMethod -Uri "$BaseUrl/api/admin/history" -Method Put -Body $updateData -ContentType "application/json" -WebSession $global:session
        Test-Action "Update History" $update.success "Event updated"
        
        $delete = Invoke-RestMethod -Uri "$BaseUrl/api/admin/history?id=$historyId" -Method Delete -WebSession $global:session
        Test-Action "Delete History" $delete.success "Removed"
    }
} catch {
    Test-Action "History CRUD" $false $_.Exception.Message
}

# Test Logout
Write-Host "`n7. Logout" -ForegroundColor Cyan
Write-Host "=========`n" -ForegroundColor Cyan

try {
    $logout = Invoke-RestMethod -Uri "$BaseUrl/api/auth/logout" -Method Post -WebSession $global:session
    Test-Action "Logout" $logout.success "Session ended"
} catch {
    Test-Action "Logout" $false $_.Exception.Message
}

# Results
Write-Host "`n=========================================`n" -ForegroundColor Cyan
Write-Host "Results:" -ForegroundColor Cyan
Write-Host "  Passed: $passed" -ForegroundColor Green
Write-Host "  Failed: $failed" -ForegroundColor Red
$rate = [math]::Round(($passed / ($passed + $failed)) * 100, 1)
Write-Host "  Success Rate: $rate%`n" -ForegroundColor $(if ($rate -ge 90) { "Green" } else { "Yellow" })

if ($failed -eq 0) {
    Write-Host "✓ All tests passed!`n" -ForegroundColor Green
    Write-Host "Admin Panel Access:" -ForegroundColor Cyan
    Write-Host "  URL: $BaseUrl/admin-air-airlabalaba" -ForegroundColor White
    Write-Host "  Password: $Password`n" -ForegroundColor White
}
