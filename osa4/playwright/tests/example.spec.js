const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'blog created by playwright', 'playwright', 'playwright.com')
      await expect(page.getByText('a new blog blog created by playwright by playwright added')).toBeVisible()
      
      const blogText = page.getByText('blog created by playwright').filter({
        has: page.getByRole('button', { name: 'view' }),
      })

      await expect(blogText).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'blog created by playwright', 'playwright', 'playwright.com')
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('a blog can be deleted by user who created it', async ({ page }) => {
      await createBlog(page, 'blog created by playwright', 'playwright', 'playwright.com')
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'remove' }).click()

      const blogText = page.getByText('blog created by playwright').filter({
        has: page.getByRole('button', { name: 'view' }),
      })

      await expect(blogText).not.toBeVisible()
    })

    test('blogs delete button is hidden for user who didnt create it', async ({ page }) => {
      await createBlog(page, 'blog created by playwright', 'playwright', 'playwright.com')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('remove')).toBeVisible()
      await page.getByRole('button', { name: 'log off' }).click()
      await loginWith(page, 'mvalkonen', 'salainen')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('remove')).not.toBeVisible()
    })

    test('the blogs are sorted by likes', async ({ page }) => {
      const blog = (title) =>
        page.locator('.blog').filter({ hasText: title })

      const likeBlog = async (title, times) => {
        const blogItem = blog(title)

        await blogItem.getByRole('button', { name: 'view' }).click()

        const likeButton = blogItem.getByRole('button', { name: 'like' })

        for (let i = 0; i < times; i++) {
          await Promise.all([
            page.waitForResponse(res => res.status() === 200),
            likeButton.click()
          ])
        }
      }

      await createBlog(page, 'First blog', 'Author 1', 'first.com')
      await createBlog(page, 'Second blog', 'Author 2', 'second.com')
      await createBlog(page, 'Third blog', 'Author 3', 'third.com')

      await likeBlog('First blog', 1)
      await likeBlog('Second blog', 9)
      await likeBlog('Third blog', 5)

      const blogs = await page.locator('.blog').allTextContents()

      expect(blogs[0]).toContain('Second blog')
      expect(blogs[1]).toContain('Third blog')
      expect(blogs[2]).toContain('First blog')
    })
  })
})