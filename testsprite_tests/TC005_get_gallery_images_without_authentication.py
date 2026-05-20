import requests

def test_get_gallery_images_without_authentication():
    base_url = "http://localhost:3000"
    url = f"{base_url}/api/gallery"
    headers = {
        "Accept": "application/json"
    }
    try:
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

    assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"

    try:
        data = response.json()
    except ValueError:
        assert False, "Response is not valid JSON"

    assert isinstance(data, list), f"Expected response to be a list, got {type(data)}"

    # Optionally, verify each item in the list is dict (gallery image metadata)
    for item in data:
        assert isinstance(item, dict), f"Expected each gallery image to be a dict, got {type(item)}"

test_get_gallery_images_without_authentication()