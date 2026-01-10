import pytest
from playwright.sync_api import Playwright, sync_playwright

def pytest_addoption(parser):
    parser.addoption(
        "--headless", action="store_true", default=True, help="Run browsers in headless mode"
    )

@pytest.fixture(scope="session")
def playwright_instance():
    with sync_playwright() as p:
        yield p

@pytest.fixture(scope="function")
def browser(playwright_instance, request):
    headless = request.config.getoption("--headless")
    browser = playwright_instance.chromium.launch(headless=headless)
    yield browser
    browser.close()