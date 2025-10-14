const { test, expect, beforeEach, describe } = require('@playwright/test')


describe('When logged in', () => {
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

    await page.getByRole('button', { name: 'Login' }).click()

    await page.getByLabel('Username').fill('eoljakka')
    await page.getByLabel('Password').fill('salainen')

    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByText('Blogs')).toBeVisible()
  })

  test('a new blog can be created', async ({ page }) => {
    
    await page.getByRole('button', { name: 'Create new blog' }).click()

    const blogFormHeading = page.getByText('Create new blog')
    expect(blogFormHeading).toBeVisible()

    await page.getByLabel('Title').fill('Testi blogi')
    await page.getByLabel('Author').fill('Huono blogaaja')
    await page.getByLabel('Url').fill('http://testi.com')

    await page.getByRole('button', { name: 'Create' }).click()

    const newBlog = page.locator('.blog-list')
    await expect(newBlog).toBeVisible()

  })


})