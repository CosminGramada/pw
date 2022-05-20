import { expect, test } from '@playwright/test';
import { Constants } from '../constants';
import { HomePage } from '../pages/home-page.po';

test.describe('User', () => {
  let homepage: HomePage;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    homepage = new HomePage(page);
    await homepage.openTestApplication();
  });

  test('should be able to login and logout using an existing user', async () => {
    let loginPage = await homepage.clickLogin();
    const librariesPage = await loginPage.signIn(Constants.ExistingUser);

    const username = await librariesPage.leftMenu.getLoggedInUser();
    expect(username.toLowerCase()).toBe(`${Constants.ExistingUser.username.toLowerCase()}`);

    loginPage = await librariesPage.leftMenu.logout();

    expect(await loginPage.getFormTitle()).toBe('Login to   libib');
  });
});

