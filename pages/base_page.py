import allure
from playwright.sync_api import Page


class BasePage:
    def __init__(self, page: Page):
        self.page = page

    @allure.step("Open page: {url}")
    def open(self, url: str):
        self.page.goto(url)

    @allure.step("Get current page URL")
    def get_current_url(self) -> str:
        return self.page.url