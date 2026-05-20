import requests

def test_get_menu_items_without_authentication():
    base_url = "http://localhost:3000"
    url = f"{base_url}/api/menu"
    try:
        response = requests.get(url, timeout=30)
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

    assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"

    try:
        data = response.json()
    except ValueError:
        assert False, "Response is not valid JSON"

    assert isinstance(data, list), f"Expected response to be a list, got {type(data)}"

    # This test covers both cases:
    # 1. When menu items are present (array can contain items)
    # 2. When database is empty (empty array)

    # Validate each item if list not empty (optional, basic check)
    for item in data:
        assert isinstance(item, dict), "Each menu item should be a dict/object"

test_get_menu_items_without_authentication()