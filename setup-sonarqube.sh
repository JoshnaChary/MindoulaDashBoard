#!/bin/bash
# ==============================================================================
# SonarQube Automated Configuration Script
# Requirements: jq, curl
# ==============================================================================

SONAR_URL="http://localhost:9000"
# WARNING: If deploying externally, change localhost to your target IP/Domain securely!

DEFAULT_USER="admin"
DEFAULT_PASS="admin"
NEW_PASS="Admin@123Secure!"

PROJECT_KEY="MindoulaDashBoard"
PROJECT_NAME="MedplumPatientPortal"

echo "⏳ Waiting for SonarQube to become fully operational (This can take 2-5 minutes)..."
until curl -s "$SONAR_URL/api/system/status" | grep -q "UP"; do
  sleep 5
done
echo "✅ SonarQube is UP!"

echo "🔄 Changing default admin password..."
curl -s -u "$DEFAULT_USER:$DEFAULT_PASS" -X POST "$SONAR_URL/api/users/change_password" \
     -d "login=$DEFAULT_USER" \
     -d "previousPassword=$DEFAULT_PASS" \
     -d "password=$NEW_PASS"
echo "✅ Admin password rotated successfully!"

echo "📦 Provisioning User Project Key: $PROJECT_KEY"
curl -s -u "$DEFAULT_USER:$NEW_PASS" -X POST "$SONAR_URL/api/projects/create" \
     -d "project=$PROJECT_KEY" \
     -d "name=$PROJECT_NAME"
echo "✅ Project Initialized!"

echo "🔑 Generating GitHub Actions Integration Token..."
TOKEN_RESPONSE=$(curl -s -u "$DEFAULT_USER:$NEW_PASS" -X POST "$SONAR_URL/api/user_tokens/generate" \
     -d "name=github_actions_token_$(date +%s)" \
     -d "projectKey=$PROJECT_KEY" \
     -d "type=PROJECT_ANALYSIS_TOKEN")

# Extract the Token Value securely (Requires jq, fallback logic if unavailable)
if command -v jq &> /dev/null; then
    TOKEN_VALUE=$(echo "$TOKEN_RESPONSE" | jq -r .token)
else
    TOKEN_VALUE=$(echo "$TOKEN_RESPONSE" | grep -o '"token":"[^"]*' | cut -d '"' -f 4)
fi

echo "==================================================="
echo "🎉 SonarQube Initialization Complete!"
echo "==================================================="
echo "📌 DELIVERABLES:"
echo "1. Base URL: $SONAR_URL"
echo "2. Generated Project Key: $PROJECT_KEY"
echo "3. SONAR_TOKEN: $TOKEN_VALUE"
echo ""
echo "👉 Place Base URL into SONAR_HOST_URL secret."
echo "👉 Place Token Value into SONAR_TOKEN secret."
echo "==================================================="
