import requests
from datetime import datetime, timedelta

BASE_URL = "http://localhost:3000"
API_PATH = "/api/config/hero"
TIMEOUT = 30

# Placeholder for a valid admin token for authentication
VALID_TOKEN = "Bearer VALID_ADMIN_TOKEN"
INVALID_TOKEN = "Bearer INVALID_OR_EXPIRED_TOKEN"

HEADERS_AUTH = {
    "Authorization": VALID_TOKEN,
    "Content-Type": "application/json",
}
HEADERS_NO_AUTH = {
    "Content-Type": "application/json",
}
HEADERS_INVALID_AUTH = {
    "Authorization": INVALID_TOKEN,
    "Content-Type": "application/json",
}

def test_put_hero_config_with_authentication():
    url = f"{BASE_URL}{API_PATH}"

    # Step 1: Get current hero config without auth (to backup and restore later)
    try:
        resp = requests.get(url, timeout=TIMEOUT)
        resp.raise_for_status()
        original_config = resp.json()
    except Exception as e:
        assert False, f"Failed to get original hero config: {e}"

    # Define a valid update payload (based on usual hero config schema assumptions)
    valid_payload = {
        "title": "Updated Hero Title",
        "subtitle": "Updated subtitle for the hero section",
        "ctaText": "Click Here",
        "ctaUrl": "https://example.com/hero",
        "startDate": (datetime.utcnow() + timedelta(days=1)).isoformat() + "Z",
        "endDate": (datetime.utcnow() + timedelta(days=30)).isoformat() + "Z",
        "bannerImage": "https://example.com/new-hero-banner.jpg"
    }

    def put_request(payload, headers):
        return requests.put(url, json=payload, headers=headers, timeout=TIMEOUT)

    try:
        # Valid update with authentication
        resp = put_request(valid_payload, HEADERS_AUTH)
        assert resp.status_code == 200, f"Expected 200 OK but got {resp.status_code}"
        updated_config = resp.json()
        # Validate response content matches the sent payload where applicable
        for key, val in valid_payload.items():
            assert updated_config.get(key) == val, f"Field '{key}' mismatch in updated config"

        # Test missing required fields (assume 'title' and 'ctaUrl' required)
        for missing_field in ["title", "ctaUrl"]:
            invalid_payload = valid_payload.copy()
            invalid_payload.pop(missing_field)
            resp = put_request(invalid_payload, HEADERS_AUTH)
            assert resp.status_code in (400, 422), (
                f"Expected 400 or 422 for missing field '{missing_field}', got {resp.status_code}"
            )

        # Test invalid date values: past startDate, endDate before startDate, and invalid formats
        invalid_dates_payloads = [
            # startDate in the past
            {**valid_payload, "startDate": (datetime.utcnow() - timedelta(days=10)).isoformat() + "Z"},
            # endDate before startDate
            {**valid_payload,
                "startDate": (datetime.utcnow() + timedelta(days=10)).isoformat() + "Z",
                "endDate": (datetime.utcnow() + timedelta(days=5)).isoformat() + "Z"},
            # invalid date string
            {**valid_payload, "startDate": "not-a-date"},
        ]
        for idx, bad_payload in enumerate(invalid_dates_payloads):
            resp = put_request(bad_payload, HEADERS_AUTH)
            assert resp.status_code in (400, 422), (
                f"Expected 400 or 422 for invalid date payload #{idx+1}, got {resp.status_code}"
            )

        # Test wrong data types (e.g. title as number, ctaUrl as boolean)
        wrong_type_payloads = [
            {**valid_payload, "title": 12345},
            {**valid_payload, "ctaUrl": True},
        ]
        for idx, bad_payload in enumerate(wrong_type_payloads):
            resp = put_request(bad_payload, HEADERS_AUTH)
            assert resp.status_code == 400 or resp.status_code == 422, (
                f"Expected 400 or 422 for wrong data type payload #{idx+1}, got {resp.status_code}"
            )

        # Test request without token → 401
        resp = put_request(valid_payload, HEADERS_NO_AUTH)
        assert resp.status_code == 401, f"Expected 401 Unauthorized for missing token, got {resp.status_code}"

        # Test request with invalid token → 401
        resp = put_request(valid_payload, HEADERS_INVALID_AUTH)
        assert resp.status_code == 401, f"Expected 401 Unauthorized for invalid token, got {resp.status_code}"

    finally:
        # Restore original config to maintain database integrity
        try:
            resp = requests.put(url, json=original_config, headers=HEADERS_AUTH, timeout=TIMEOUT)
            resp.raise_for_status()
        except Exception as e:
            # Restoration failure should still raise
            assert False, f"Failed to restore original hero config: {e}"


test_put_hero_config_with_authentication()