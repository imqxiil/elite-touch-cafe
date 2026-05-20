import requests
import uuid

BASE_URL = "http://localhost:3000"
MENU_ENDPOINT = f"{BASE_URL}/api/menu"
TIMEOUT = 30

# Assume we have a function to get a valid auth token for testing
def get_valid_token():
    # In real tests, this might fetch a JWT or other token from auth service
    return "Bearer valid_test_token"

def get_invalid_token():
    return "Bearer invalid_or_expired_token"

def create_menu_item(token, name="Test Item", description="Test Description", price=9.99):
    payload = {
        "name": name,
        "description": description,
        "price": price
    }
    headers = {
        "Authorization": token,
        "Content-Type": "application/json"
    }
    resp = requests.post(MENU_ENDPOINT, json=payload, headers=headers, timeout=TIMEOUT)
    resp.raise_for_status()
    return resp.json()

def delete_menu_item(token, item_id):
    payload = {"id": item_id}
    headers = {
        "Authorization": token,
        "Content-Type": "application/json"
    }
    resp = requests.delete(MENU_ENDPOINT, json=payload, headers=headers, timeout=TIMEOUT)
    # Delete might return 200 or 204
    assert resp.status_code in (200, 204)

def test_put_menu_item_with_authentication():
    valid_token = get_valid_token()
    invalid_token = get_invalid_token()
    headers_auth = {"Authorization": valid_token, "Content-Type": "application/json"}

    # Step 1: Create a menu item to update
    created_item = create_menu_item(valid_token)
    item_id = created_item.get("id")
    assert item_id is not None

    try:
        # --- Valid update ---
        update_payload = {
            "id": item_id,
            "name": "Updated Test Item",
            "description": "Updated Description",
            "price": 12.50
        }
        resp = requests.put(MENU_ENDPOINT, json=update_payload, headers=headers_auth, timeout=TIMEOUT)
        assert resp.status_code == 200
        updated_item = resp.json()
        assert updated_item.get("id") == item_id
        assert updated_item.get("name") == update_payload["name"]
        assert updated_item.get("description") == update_payload["description"]
        assert updated_item.get("price") == update_payload["price"]

        # --- Invalid data causes 400 or 422 ---
        invalid_payloads = [
            # Missing required fields (e.g., no id)
            {"name": "No ID"},
            # Malformed fields: price as string negative or invalid type
            {"id": item_id, "name": "", "description": "desc", "price": "invalid"},
            {"id": item_id, "name": "Valid", "description": "desc", "price": -10},
        ]
        for payload in invalid_payloads:
            resp = requests.put(MENU_ENDPOINT, json=payload, headers=headers_auth, timeout=TIMEOUT)
            assert resp.status_code in (400, 422)

        # --- Authentication errors 401 ---
        # 1. No token
        resp = requests.put(MENU_ENDPOINT, json=update_payload, headers={"Content-Type": "application/json"}, timeout=TIMEOUT)
        assert resp.status_code == 401

        # 2. Invalid/expired token
        headers_invalid_token = {"Authorization": invalid_token, "Content-Type": "application/json"}
        resp = requests.put(MENU_ENDPOINT, json=update_payload, headers=headers_invalid_token, timeout=TIMEOUT)
        assert resp.status_code == 401

    finally:
        # Cleanup delete created item
        delete_menu_item(valid_token, item_id)

test_put_menu_item_with_authentication()