import pytest
from playwright.sync_api import Page

@pytest.fixture
def page(browser):
    context = browser.new_context()
    page = context.new_page()
    yield page
    context.close()

def test_homepage_loads(page: Page):
    page.goto("https://beta-testing-l.github.io/photo_Background_Remover_With_Python/")
    assert page.title() == "Photo Background Remover"
    # Verify that the upload button is visible
    upload_button = page.locator('input[type="file"]')
    expect(upload_button).to_be_visible()