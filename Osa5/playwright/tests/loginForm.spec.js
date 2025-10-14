const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Erno Oljakka',
        username: 'eoljakka',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {

    const firstLoginButton = page.locator('button', { hasText: 'Login' });
    
    await expect(firstLoginButton).toBeVisible()

    firstLoginButton.click()

    const secondLoginButton = page.locator('button', { hasText: 'Login' });

    const cancelButton = page.locator('button', { hasText: 'Cancel' });

    await expect(secondLoginButton).toBeVisible()
    await expect(cancelButton).toBeVisible()

    const pageHeader = page.locator('h2', {hasText: 'Log in to application'})

    await expect(pageHeader).toBeVisible()

    const usernameInput = page.getByLabel('Username')
    await expect(usernameInput).toBeVisible()

    const passwordInput = page.getByLabel('Password')
    await expect(passwordInput).toBeVisible()


  })

    describe('Login', () => {

    test('succeeds with correct credentials', async ({ page }) => {
      const firstLoginButton = page.locator('button', { hasText: 'Login' });
      firstLoginButton.click()
      
      const usernameInput = page.getByLabel('Username')
      await usernameInput.fill('eoljakka')

      const passwordInput = page.getByLabel('Password')
      await passwordInput.fill('salainen')

      const loginBtn = page.locator('button', {hasText: 'Login'})
      await loginBtn.click()

      //Check if login was succesfull by testing if Blogs text is now visible
      const pageHeader = page.locator('h2', {hasText: 'Blogs'})
      await expect(pageHeader).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {  
      const firstLoginButton = page.locator('button', { hasText: 'Login' });
      firstLoginButton.click()
      
      const usernameInput = page.getByLabel('Username')
      await usernameInput.fill('wronguser')

      const passwordInput = page.getByLabel('Password')
      await passwordInput.fill('wrongpassword')

      const loginBtn = page.locator('button', {hasText: 'Login'})
      await loginBtn.click()

      const errorMsg = page.getByText("Wrong username or password")
      await expect(errorMsg).toBeVisible()
    })
  })
})