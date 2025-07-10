import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, USERNAME } from '../../config/env-data'

test('signIn button disabled when incorrect data inserted', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  await authPage.usernameField.fill(faker.lorem.word(2))
  await authPage.passwordField.fill(faker.lorem.word(7))
  await expect(authPage.signInButton).toBeDisabled()
})

test('login with correct credentials and verify order creation page', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await expect(orderCreationPage.logoutButton).toBeVisible()
  await expect(orderCreationPage.createOrderButton).toBeVisible()
  await expect(orderCreationPage.nameInput).toBeVisible()
  await expect(orderCreationPage.phoneInput).toBeVisible()
  await expect(orderCreationPage.commentInput).toBeVisible()
})

test('login and create order successfully', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)

  await orderCreationPage.nameInput.fill(faker.person.fullName())
  await orderCreationPage.phoneInput.fill(faker.phone.number())
  await orderCreationPage.commentInput.fill(faker.lorem.sentence(5))
  await orderCreationPage.createOrderButton.click()
  await expect(orderCreationPage.orderCreatedPopupOkButton).toBeVisible()
})

test('login and logout successfully', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)

  await orderCreationPage.logoutButton.click()
  await expect(authPage.signInButton).toBeVisible(
  )})

test('login and empty phone input does not allow to create order', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)

  await orderCreationPage.nameInput.fill(faker.person.fullName())
  await orderCreationPage.phoneInput.fill('12')
  await expect(orderCreationPage.createOrderButton).toBeDisabled()
})


test('login and check phone input error', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)

  await orderCreationPage.nameInput.fill(faker.person.fullName())
  await orderCreationPage.phoneInput.fill('12345')
  await expect(orderCreationPage.phoneInputError).toBeVisible()
  await expect(orderCreationPage.createOrderButton).toBeDisabled()
})