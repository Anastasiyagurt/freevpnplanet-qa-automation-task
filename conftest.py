import pytest
from faker import Faker
from playwright.sync_api import Page

from config import config


@pytest.fixture(scope="session")
def settings():
    return config


@pytest.fixture(scope="session")
def faker():
    return Faker()


@pytest.fixture
def freevpn_page(page: Page):
    page.goto(config.BASE_URL)
    return page