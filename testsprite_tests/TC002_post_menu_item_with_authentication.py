import requests

BASE_URL = "http://localhost:3000"
MENU_ENDPOINT = "/api/menu"
TIMEOUT = 30
# Placeholder for a valid admin JWT token or similar authentication token
AUTH_TOKEN = "Bearer your_valid_auth_token_here"

headers_auth = {
    "Authorization": AUTH_TOKEN,
    "Content-Type": "application/json"
}

def test_post_menu_item_with_authentication():
    # Valid menu item payload
    valid_payload = {
        "name": "Test Menu Item",
        "description": "A delicious test item",
        "price": 9.99,
        "category": "Test Category"
    }

    # Payloads with missing required fields (example assumes 'name' and 'price' are required)
    missing_name_payload = {
        "description": "Missing name field",
        "price": 5.00,
        "category": "Test Category"
    }
    missing_price_payload = {
        "name": "Missing Price Item",
        "description": "Missing price field",
        "category": "Test Category"
    }

    # Oversized payload - large string fields
    large_string = "x" * (5 * 1024 * 1024)  # 5 MB string
    oversized_payload = {
        "name": large_string,
        "description": large_string,
        "price": 1000.00,
        "category": large_string
    }

    created_item_id = None
    try:
        # 1) Test valid creation - expect 201 and returned id
        resp = requests.post(
            BASE_URL + MENU_ENDPOINT,
            headers=headers_auth,
            json=valid_payload,
            timeout=TIMEOUT
        )
        assert resp.status_code == 201, f"Expected 201, got {resp.status_code}"
        json_resp = resp.json()
        assert "id" in json_resp, "Response JSON must include created item's ID"
        created_item_id = json_resp["id"]

        # 2) Test missing required field 'name' - expect 400 or 422
        resp_missing_name = requests.post(
            BASE_URL + MENU_ENDPOINT,
            headers=headers_auth,
            json=missing_name_payload,
            timeout=TIMEOUT
        )
        assert resp_missing_name.status_code in [400, 422], f"Expected 400 or 422 for missing 'name', got {resp_missing_name.status_code}"

        # 3) Test missing required field 'price' - expect 400 or 422
        resp_missing_price = requests.post(
            BASE_URL + MENU_ENDPOINT,
            headers=headers_auth,
            json=missing_price_payload,
            timeout=TIMEOUT
        )
        assert resp_missing_price.status_code in [400, 422], f"Expected 400 or 422 for missing 'price', got {resp_missing_price.status_code}"

        # 4) Test oversized payload - expect 413 Payload Too Large
        resp_oversized = requests.post(
            BASE_URL + MENU_ENDPOINT,
            headers=headers_auth,
            json=oversized_payload,
            timeout=TIMEOUT
        )
        assert resp_oversized.status_code == 413, f"Expected 413 for oversized payload, got {resp_oversized.status_code}"

    finally:
        # Cleanup created menu item if any
        if created_item_id:
            try:
                del_resp = requests.delete(
                    BASE_URL + MENU_ENDPOINT,
                    headers={
                        "Authorization": AUTH_TOKEN,
                        "Content-Type": "application/json"
                    },
                    json={"id": created_item_id},
                    timeout=TIMEOUT
                )
                assert del_resp.status_code in [200, 204], f"Cleanup failed, expected 200 or 204, got {del_resp.status_code}"
            except Exception as cleanup_err:
                print(f"Cleanup error: {cleanup_err}")

test_post_menu_item_with_authentication()