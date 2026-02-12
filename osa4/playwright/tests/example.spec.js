const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Miika Valkonen',
        username: 'mvalkonen',
        password: 'salainen'
      }
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByText('login')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByPlaceholder('write title here').fill('blog created by playwright')
      await page.getByPlaceholder('write author here').fill('playwright')
      await page.getByPlaceholder('write url here').fill('playwright.com')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByText('a new blog blog created by playwright by playwright added')).toBeVisible()
      
      const blogText = page.getByText('blog created by playwright').filter({
        has: page.getByRole('button', { name: 'view' }),
      })

      await expect(blogText).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByPlaceholder('write title here').fill('blog created by playwright')
      await page.getByPlaceholder('write author here').fill('playwright')
      await page.getByPlaceholder('write url here').fill('playwright.com')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('a blog can be deleted by user who created it', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByPlaceholder('write title here').fill('blog created by playwright')
      await page.getByPlaceholder('write author here').fill('playwright')
      await page.getByPlaceholder('write url here').fill('playwright.com')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'remove' }).click()

      const blogText = page.getByText('blog created by playwright').filter({
        has: page.getByRole('button', { name: 'view' }),
      })

      await expect(blogText).not.toBeVisible()
    })

    test('blogs delete button is hidden for user who didnt create it', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByPlaceholder('write title here').fill('blog created by playwright')
      await page.getByPlaceholder('write author here').fill('playwright')
      await page.getByPlaceholder('write url here').fill('playwright.com')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByRole('button', { name: 'log off' }).click()
      await page.getByLabel('username').fill('mvalkonen')
      await page.getByLabel('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('remove')).not.toBeVisible()
    })
  })
})