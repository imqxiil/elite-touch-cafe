import requests
import uuid

BASE_URL = "http://localhost:3000"
GALLERY_ENDPOINT = "/api/gallery"
TIMEOUT = 30

# Replace this with a valid token for authentication
AUTH_TOKEN = "Bearer YOUR_VALID_AUTH_TOKEN_HERE"

headers_auth = {
    "Authorization": AUTH_TOKEN,
    "Content-Type": "application/json"
}
headers_no_auth = {
    "Content-Type": "application/json"
}

def test_post_gallery_image_with_authentication():
    created_image_id = None

    def create_image(payload):
        response = requests.post(
            BASE_URL + GALLERY_ENDPOINT,
            json=payload,
            headers=headers_auth,
            timeout=TIMEOUT
        )
        return response

    def delete_image(image_id):
        if image_id:
            try:
                resp = requests.delete(
                    f"{BASE_URL}{GALLERY_ENDPOINT}/{image_id}",
                    headers=headers_auth,
                    timeout=TIMEOUT
                )
                # Accept 200 or 204 for successful delete
                assert resp.status_code in (200, 204), f"Failed to delete image {image_id}, status: {resp.status_code}"
            except Exception:
                pass

    try:
        # Valid payload with potentially dangerous inputs for XSS and SQL injection
        dangerous_title = '<script>alert("XSS")</script> DROP TABLE gallery;--'
        dangerous_description = 'Nice image"; DROP TABLE users; --'
        valid_payload = {
            "title": dangerous_title,
            "description": dangerous_description,
            "url": f"https://example.com/image_{uuid.uuid4()}.jpg",
            "tags": ["test", "dangerous<input>", "sql'injection"]
        }

        # 1. Test valid authenticated POST creates image with sanitized fields
        resp = create_image(valid_payload)
        assert resp.status_code == 201, f"Expected 201, got {resp.status_code}"
        resp_json = resp.json()
        # Response must include id and sanitized fields
        assert "id" in resp_json and resp_json["id"], "Created image missing 'id'"
        assert isinstance(resp_json["id"], (str, int)), "Image ID not string or int"
        created_image_id = resp_json["id"]

        # Check that returned title and description do NOT contain the raw script tags or SQL injection patterns
        returned_title = resp_json.get("title", "")
        returned_description = resp_json.get("description", "")
        # They should be strings with sanitized content (e.g., no <script> tags)
        assert "<script>" not in returned_title.lower(), "Title contains unsanitized script tags"
        assert "<script>" not in returned_description.lower(), "Description contains unsanitized script tags"
        assert "drop table" not in returned_title.lower(), "Title contains unsanitized SQL keywords"
        assert "drop table" not in returned_description.lower(), "Description contains unsanitized SQL keywords"

        # 2. Test missing required fields -> 400 or 422
        # Assume required fields: title and url (based on typical gallery metadata)
        missing_title_payload = {
            "description": "A description without title",
            "url": f"https://example.com/missing_title_{uuid.uuid4()}.jpg"
        }
        resp_missing_title = create_image(missing_title_payload)
        assert resp_missing_title.status_code in (400, 422), f"Expected 400 or 422 for missing title, got {resp_missing_title.status_code}"

        missing_url_payload = {
            "title": "Missing URL test",
            "description": "A description with missing url"
        }
        resp_missing_url = create_image(missing_url_payload)
        assert resp_missing_url.status_code in (400, 422), f"Expected 400 or 422 for missing url, got {resp_missing_url.status_code}"

        # 3. Test missing all required fields (empty payload)
        resp_empty = create_image({})
        assert resp_empty.status_code in (400, 422), f"Expected 400 or 422 for empty payload, got {resp_empty.status_code}"

        # 4. Test POST without authentication -> 401 Unauthorized
        resp_no_auth = requests.post(
            BASE_URL + GALLERY_ENDPOINT,
            json=valid_payload,
            headers=headers_no_auth,
            timeout=TIMEOUT
        )
        assert resp_no_auth.status_code == 401, f"Expected 401 without auth token, got {resp_no_auth.status_code}"

    finally:
        # Cleanup: delete the created image if any
        delete_image(created_image_id)


test_post_gallery_image_with_authentication()