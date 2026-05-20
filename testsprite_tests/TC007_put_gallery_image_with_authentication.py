import requests

BASE_URL = "http://localhost:3000"
TIMEOUT = 30

# Placeholder valid auth token; replace with valid token for real tests
VALID_TOKEN = "Bearer VALID_ADMIN_AUTH_TOKEN"
INVALID_TOKEN = "Bearer INVALID_OR_EXPIRED_TOKEN"


def test_put_gallery_image_with_authentication():
    headers_auth = {
        "Authorization": VALID_TOKEN,
        "Content-Type": "application/json"
    }
    headers_invalid_auth = {
        "Authorization": INVALID_TOKEN,
        "Content-Type": "application/json"
    }

    # Step 1: Create a gallery image to update (since resource ID not provided)
    create_payload = {
        "title": "Original Gallery Image",
        "description": "Original description",
        "url": "https://example.com/image-original.jpg"
    }

    gallery_id = None
    try:
        # Create new gallery image
        create_resp = requests.post(
            f"{BASE_URL}/api/gallery",
            json=create_payload,
            headers=headers_auth,
            timeout=TIMEOUT,
        )
        assert create_resp.status_code == 201, f"Expected 201 on create, got {create_resp.status_code}"
        created_item = create_resp.json()
        assert "id" in created_item and isinstance(created_item["id"], (int, str))
        gallery_id = created_item["id"]

        # Step 2: Prepare update payload with the existing ID included
        update_payload = {
            "id": gallery_id,
            "title": "Updated Gallery Image",
            "description": "Updated description",
            "url": "https://example.com/image-updated.jpg"
        }

        # Step 3: Valid PUT with proper auth - should update and return 200 with updated image
        put_resp = requests.put(
            f"{BASE_URL}/api/gallery",
            json=update_payload,
            headers=headers_auth,
            timeout=TIMEOUT,
        )
        assert put_resp.status_code == 200, f"Expected 200 on valid update, got {put_resp.status_code}"
        updated_item = put_resp.json()
        # Validate updated fields
        assert updated_item.get("id") == gallery_id
        assert updated_item.get("title") == update_payload["title"]
        assert updated_item.get("description") == update_payload["description"]
        assert updated_item.get("url") == update_payload["url"]

        # Step 4: PUT with invalid token - should return 401 Unauthorized
        put_resp_invalid = requests.put(
            f"{BASE_URL}/api/gallery",
            json=update_payload,
            headers=headers_invalid_auth,
            timeout=TIMEOUT,
        )
        assert put_resp_invalid.status_code == 401, f"Expected 401 on invalid token, got {put_resp_invalid.status_code}"
        # Optionally verify error message structure if returned
        try:
            err_json = put_resp_invalid.json()
            assert "error" in err_json or "message" in err_json
        except Exception:
            pass

    finally:
        # Cleanup: delete the created gallery image if exists
        if gallery_id is not None:
            try:
                del_resp = requests.delete(
                    f"{BASE_URL}/api/gallery",
                    json={"id": gallery_id},
                    headers=headers_auth,
                    timeout=TIMEOUT,
                )
                # Allow 200 or 204 as successful deletion
                assert del_resp.status_code in (200, 204)
            except Exception:
                pass


test_put_gallery_image_with_authentication()