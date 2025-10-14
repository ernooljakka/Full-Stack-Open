const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('After blog is created', () => {
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

    await page.getByRole('button', { name: 'Create new blog' }).click()

    const blogFormHeading = page.getByText('Create new blog')
    await expect(blogFormHeading).toBeVisible()

    await page.getByLabel('Title').fill('Testi blogi')
    await page.getByLabel('Author').fill('Huono blogaaja')
    await page.getByLabel('Url').fill('http://testi.com')

    await page.getByRole('button', { name: 'Create' }).click()

    await page.getByRole('button', {name: 'View'}).click()

  })

  test('a new blog can be liked', async ({ page }) => {

    //likes should be zero first
    const initialLikes = page.locator('.likes')
    await expect(initialLikes).toHaveText('Likes: 0')

    //Like the blog once
    await page.getByRole('button', {name: 'Like'}).click()
    const newLikes = page.locator('.likes')
    await expect(newLikes).toHaveText('Likes: 1')

  })

  
  test('a blog can be deleted', async ({ page }) => {

    //at first added blog should be visible
    const blogTitle = page.locator('.blog-title', { hasText: 'Testi blogi' })
    await expect(blogTitle).toBeVisible()

    //Handle window.confirm when it happens
    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm')
      await dialog.accept()
    })

    await page.getByRole('button', {name: 'Remove'}).click()

    const blog = page.locator('.blog-title', { hasText: 'Testi blogi' })
    await expect(blog).not.toBeVisible()

  })

  test('Only the user who added the blog can see the remove button', async ({ page, request }) => {

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'second user',
        username: 'seconduser',
        password: 'password'
      }
    })

    //The remove button is visible for the first user added in beforeEach
    const removeBtn = page.getByRole('button', { name: 'Remove' })
    await expect(removeBtn).toBeVisible()

    //Log in with another user
    await page.getByRole('button', {name: 'Logout'}).click()

    await page.getByLabel('Username').fill('seconduser')
    await page.getByLabel('Password').fill('password')
    await page.getByRole('button', { name: 'Login' }).click()

    await page.getByRole('button', {name: 'View'}).click()

    const removeBtn2 = page.getByRole('button', { name: 'Remove' })
    await expect(removeBtn2).toHaveCount(0)

  })

  test('Blogs are sorted by likes, highest liked first', async ({page}) => {

    await page.getByLabel('Title').fill('testi2')
    await page.getByLabel('Author').fill('Paras blogaaja')
    await page.getByLabel('Url').fill('http://testi2.com')

    await page.getByRole('button', { name: 'Create' }).click()

    const blogs = page.locator('.blog-list')
    await expect(blogs).toHaveCount(2)

    const viewButtons = page.getByRole('button', { name: 'View' })
    const count = await viewButtons.count()

    for (let i = 0; i < count; i++) {
      await viewButtons.nth(i).click()
    }

    let likeButtons = page.getByRole('button', { name: 'Like' })
    await expect(likeButtons).toHaveCount(2)

    let blogTitleElements = page.locator('.blog-title')
    let titles = await blogTitleElements.allTextContents()

    expect(titles).toEqual(['Title: Testi blogi', 'Title: testi2'])

    likeButtons = page.getByRole('button', { name: 'Like' })
    await likeButtons.nth(1).click()

    const likes = page.locator('.likes').nth(0)
    await expect(likes).toHaveText('Likes: 1')

    blogTitleElements = page.locator('.blog-title')
    titles = await blogTitleElements.allTextContents()
    expect(titles).toEqual(['Title: testi2', 'Title: Testi blogi'])

  })


})