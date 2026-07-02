# FreeVPNPlanet QA Automation Task

![UI Tests](https://img.shields.io/badge/UI%20Tests-in%20progress-yellow?logo=github)
![Python](https://img.shields.io/badge/Python-3.13-blue?logo=python&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-1.53-green)
![pytest](https://img.shields.io/badge/pytest-8.4-blue)
![Allure](https://img.shields.io/badge/Allure-Report-orange)

E2E UI automation test project for FreeVPNPlanet test assignment.

## Stack

- Python 3.13
- Pytest
- Playwright
- Allure

## Setup

Prerequisites: Python 3.13, Git

```bash
git clone https://github.com/Anastasiyagurt/freevpnplanet-qa-automation-task.git
cd freevpnplanet-qa-automation-task

python -m venv .venv
source .venv/bin/activate

cp .env.example .env

pip install -r requirements.txt
playwright install chromium