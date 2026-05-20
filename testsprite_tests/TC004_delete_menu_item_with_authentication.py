import requests
import uuid

BASE_URL = "http://localhost:3000"
MENU_ENDPOINT = f"{BASE_URL}/api/menu"
TIMEOUT = 30

# Placeholder for a valid admin token for authenticated requests
VALID_TOKEN = "Bearer VALID_ADMIN_JWT_TOKEN"
INVALID_TOKEN = "Bearer INVALID_OR_EXPIRED_TOKEN"

def test_delete_menu_item_with_authentication():
    headers_auth = {"Authorization": VALID_TOKEN, "Content-Type": "application/json"}
    headers_no_auth = {"Content-Type": "application/json"}
    headers_invalid_auth = {"Authorization": INVALID_TOKEN, "Content-Type": "application/json"}

    # Create a new menu item to delete later
    new_menu_item_data = {
        "name": f"TestItem-{uuid.uuid4()}",
        "description": "Temporary test item for deletion",
        "price": 9.99,
        "category": "Test"
    }
    new_item_id = None

    try:
        # Create menu item
        create_resp = requests.post(
            MENU_ENDPOINT,
            headers=headers_auth,
            json=new_menu_item_data,
            timeout=TIMEOUT
        )
        assert create_resp.status_code == 201, f"Expected 201 Created but got {create_resp.status_code}"
        created_item = create_resp.json()
        new_item_id = created_item.get("id")
        assert new_item_id is not None, "Created item missing ID"

        # DELETE with valid authentication - expect 200 or 204
        delete_resp = requests.delete(
            MENU_ENDPOINT,
            headers=headers_auth,
            json={"id": new_item_id},
            timeout=TIMEOUT
        )
        assert delete_resp.status_code in (200, 204), f"Expected 200 or 204 but got {delete_resp.status_code}"

        # Confirm the item is deleted by trying to delete again or get
        delete_again_resp = requests.delete(
            MENU_ENDPOINT,
            headers=headers_auth,
            json={"id": new_item_id},
            timeout=TIMEOUT
        )
        # Accept 404 (not found) or 200/204 for idempotent delete
        assert delete_again_resp.status_code in (404, 200, 204)

        # Create again for further negative tests
        create_resp_2 = requests.post(
            MENU_ENDPOINT,
            headers=headers_auth,
            json=new_menu_item_data,
            timeout=TIMEOUT
        )
        assert create_resp_2.status_code == 201, f"Expected 201 Created but got {create_resp_2.status_code}"
        recreated_item = create_resp_2.json()
        recreated_item_id = recreated_item.get("id")
        assert recreated_item_id is not None

        # DELETE without token - expect 401
        delete_no_auth_resp = requests.delete(
            MENU_ENDPOINT,
            headers=headers_no_auth,
            json={"id": recreated_item_id},
            timeout=TIMEOUT
        )
        assert delete_no_auth_resp.status_code == 401, f"Expected 401 Unauthorized but got {delete_no_auth_resp.status_code}"

        # DELETE with invalid token - expect 401
        delete_invalid_auth_resp = requests.delete(
            MENU_ENDPOINT,
            headers=headers_invalid_auth,
            json={"id": recreated_item_id},
            timeout=TIMEOUT
        )
        assert delete_invalid_auth_resp.status_code == 401, f"Expected 401 Unauthorized but got {delete_invalid_auth_resp.status_code}"

        # Attempt DELETE conflict scenario removed as unique_field is not specified in PRD

    finally:
        # Cleanup created menu item if exists
        if new_item_id is not None:
            requests.delete(
                MENU_ENDPOINT,
                headers=headers_auth,
                json={"id": new_item_id},
                timeout=TIMEOUT
            )

        # Also clean up recreated item if exists
        if 'recreated_item_id' in locals() and recreated_item_id is not None:
            requests.delete(
                MENU_ENDPOINT,
                headers=headers_auth,
                json={"id": recreated_item_id},
                timeout=TIMEOUT
            )

test_delete_menu_item_with_authentication()
