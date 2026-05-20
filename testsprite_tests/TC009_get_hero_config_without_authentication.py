import requests

BASE_URL = "http://localhost:3000"
TIMEOUT = 30

def test_get_hero_config_without_authentication():
    url = f"{BASE_URL}/api/config/hero"
    headers = {
        "Accept": "application/json"
    }
    try:
        response = requests.get(url, headers=headers, timeout=TIMEOUT)
        # Assert status code is 200
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"

        # Assert response is JSON
        try:
            data = response.json()
        except ValueError:
            assert False, "Response is not valid JSON"

        # Validate that data has expected structure (since schema not fully detailed,
        # check is non-empty dict as hero config expected)
        assert isinstance(data, dict), "Response JSON is not an object"
        assert data, "Hero config response is empty"

    except requests.exceptions.RequestException as e:
        assert False, f"HTTP request failed: {e}"

test_get_hero_config_without_authentication()