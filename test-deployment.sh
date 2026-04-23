#!/bin/bash

# AIRLAB Website - Deployment Testing Script
# This script tests the deployment to ensure everything works correctly

set -e

echo "========================================="
echo "AIRLAB Website - Deployment Test Suite"
echo "========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BASE_URL="${1:-http://localhost:3000}"
ADMIN_PASSWORD="${2:-AIRLAB_2025}"

echo "Testing URL: $BASE_URL"
echo ""

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Function to test endpoint
test_endpoint() {
    local name="$1"
    local url="$2"
    local expected_status="$3"
    
    echo -n "Testing $name... "
    
    status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$status" -eq "$expected_status" ]; then
        echo -e "${GREEN}✓ PASS${NC} (Status: $status)"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗ FAIL${NC} (Expected: $expected_status, Got: $status)"
        ((TESTS_FAILED++))
    fi
}

# Function to test JSON endpoint
test_json_endpoint() {
    local name="$1"
    local url="$2"
    local expected_key="$3"
    
    echo -n "Testing $name... "
    
    response=$(curl -s "$url")
    
    if echo "$response" | grep -q "$expected_key"; then
        echo -e "${GREEN}✓ PASS${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗ FAIL${NC} (Key '$expected_key' not found)"
        ((TESTS_FAILED++))
    fi
}

echo "========================================="
echo "1. Testing Public Pages"
echo "========================================="
echo ""

test_endpoint "Home Page" "$BASE_URL/" 200
test_endpoint "About Page" "$BASE_URL/about" 200
test_endpoint "Projects Page" "$BASE_URL/projects" 200
test_endpoint "Research Page" "$BASE_URL/research" 200
test_endpoint "Team Page" "$BASE_URL/team" 200
test_endpoint "News Page" "$BASE_URL/news" 200
test_endpoint "Contact Page" "$BASE_URL/contact" 200

echo ""
echo "========================================="
echo "2. Testing Admin Pages (Should Require Auth)"
echo "========================================="
echo ""

test_endpoint "Admin Dashboard" "$BASE_URL/admin-air-airlabalaba" 200
test_endpoint "Admin Projects" "$BASE_URL/admin-air-airlabalaba/projects" 200
test_endpoint "Admin News" "$BASE_URL/admin-air-airlabalaba/news" 200
test_endpoint "Admin Team" "$BASE_URL/admin-air-airlabalaba/team" 200
test_endpoint "Admin Research" "$BASE_URL/admin-air-airlabalaba/research" 200
test_endpoint "Admin History" "$BASE_URL/admin-air-airlabalaba/history" 200

echo ""
echo "========================================="
echo "3. Testing API Endpoints"
echo "========================================="
echo ""

test_json_endpoint "Projects API" "$BASE_URL/api/admin/projects" "success"
test_json_endpoint "News API" "$BASE_URL/api/admin/news" "success"
test_json_endpoint "Research API" "$BASE_URL/api/admin/research" "success"
test_json_endpoint "Team API" "$BASE_URL/api/admin/team?category=all" "success"
test_json_endpoint "History API" "$BASE_URL/api/admin/history" "success"

echo ""
echo "========================================="
echo "4. Testing Authentication"
echo "========================================="
echo ""

echo -n "Testing Auth Verify... "
verify_response=$(curl -s "$BASE_URL/api/auth/verify")
if echo "$verify_response" | grep -q "authenticated"; then
    echo -e "${GREEN}✓ PASS${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗ FAIL${NC}"
    ((TESTS_FAILED++))
fi

echo -n "Testing Admin Login... "
login_response=$(curl -s -X POST "$BASE_URL/api/auth/login" \
    -H "Content-Type: application/json" \
    -d "{\"password\":\"$ADMIN_PASSWORD\"}")

if echo "$login_response" | grep -q "success"; then
    echo -e "${GREEN}✓ PASS${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗ FAIL${NC}"
    ((TESTS_FAILED++))
fi

echo ""
echo "========================================="
echo "5. Testing Static Assets"
echo "========================================="
echo ""

test_endpoint "Main Logo" "$BASE_URL/images/main_logo.png" 200
test_endpoint "Hero Image" "$BASE_URL/images/hero-image.png" 200

echo ""
echo "========================================="
echo "6. Testing Security Headers"
echo "========================================="
echo ""

echo -n "Testing X-Frame-Options... "
if curl -s -I "$BASE_URL" | grep -q "X-Frame-Options"; then
    echo -e "${GREEN}✓ PASS${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗ FAIL${NC}"
    ((TESTS_FAILED++))
fi

echo -n "Testing X-Content-Type-Options... "
if curl -s -I "$BASE_URL" | grep -q "X-Content-Type-Options"; then
    echo -e "${GREEN}✓ PASS${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗ FAIL${NC}"
    ((TESTS_FAILED++))
fi

echo ""
echo "========================================="
echo "Test Results"
echo "========================================="
echo ""
echo -e "Tests Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Tests Failed: ${RED}$TESTS_FAILED${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All tests passed! Deployment is ready.${NC}"
    exit 0
else
    echo -e "${RED}✗ Some tests failed. Please review the errors above.${NC}"
    exit 1
fi
