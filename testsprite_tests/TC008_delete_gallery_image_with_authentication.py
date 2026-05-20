import requests
import uuid

BASE_URL = "http://localhost:3000"
GALLERY_ENDPOINT = f"{BASE_URL}/api/gallery"
TOKEN = "Bearer valid_admin_token_example"  # Replace with a valid token for actual tests
HEADERS_AUTH = {
    "Authorization": TOKEN,
    "Content-Type": "application/json"
}
TIMEOUT = 30


def test_delete_gallery_image_with_authentication():
    created_image_id = None

    # Helper function to create a gallery image for testing
    def create_gallery_image():
        payload = {
            "title": "Test Image for Deletion",
            "url": "http://example.com/test-image.jpg",
            "description": "Temporary image for delete test"
        }
        response = requests.post(
            GALLERY_ENDPOINT, headers=HEADERS_AUTH, json=payload, timeout=TIMEOUT
        )
        assert response.status_code == 201, f"Setup failed: {response.text}"
        data = response.json()
        assert "id" in data, "Created gallery image response missing 'id'"
        return data["id"]

    # Try-finally to ensure cleanup
    try:
        # Create a gallery image to delete
        created_image_id = create_gallery_image()

        # DELETE with valid authenticated identifier - expecting 200 or 204
        delete_response = requests.delete(
            GALLERY_ENDPOINT,
            headers=HEADERS_AUTH,
            json={"id": created_image_id},
            timeout=TIMEOUT
        )
        assert delete_response.status_code in (200, 204), (
            f"Expected 200 or 204 on delete, got {delete_response.status_code}, response: {delete_response.text}"
        )

        # Validate the image is really deleted: Deleting again should return 404 (id no longer exists)
        delete_again_response = requests.delete(
            GALLERY_ENDPOINT,
            headers=HEADERS_AUTH,
            json={"id": created_image_id},
            timeout=TIMEOUT
        )
        assert delete_again_response.status_code == 404, (
            f"Expected 404 on deleting non-existent image, got {delete_again_response.status_code}, response: {delete_again_response.text}"
        )

        # DELETE with malformed id: generate a malformed UUID string (not valid UUID)
        malformed_id = "malformed-id-123"
        malformed_response = requests.delete(
            GALLERY_ENDPOINT,
            headers=HEADERS_AUTH,
            json={"id": malformed_id},
            timeout=TIMEOUT
        )
        assert malformed_response.status_code == 404, (
            f"Expected 404 on malformed id delete, got {malformed_response.status_code}, response: {malformed_response.text}"
        )

        # DELETE with invalid but well-formed UUID id (not existing in DB)
        invalid_uuid = str(uuid.uuid4())
        invalid_response = requests.delete(
            GALLERY_ENDPOINT,
            headers=HEADERS_AUTH,
            json={"id": invalid_uuid},
            timeout=TIMEOUT
        )
        assert invalid_response.status_code == 404, (
            f"Expected 404 on invalid id delete, got {invalid_response.status_code}, response: {invalid_response.text}"
        )

    finally:
        # Cleanup in case the created image still exists
        if created_image_id:
            requests.delete(
                GALLERY_ENDPOINT,
                headers=HEADERS_AUTH,
                json={"id": created_image_id},
                timeout=TIMEOUT
            )


test_delete_gallery_image_with_authentication()