import { Locator, Page } from '@playwright/test'

export class OrderPage {
  readonly page: Page
  readonly statusButton: Locator
  // add more locators here
  readonly logoutButton: Locator
  readonly createOrderButton: Locator
  readonly nameInput: Locator
  readonly phoneInput: Locator
  readonly commentInput: Locator
  readonly orderCreatedPopupOkButton: Locator
  readonly orderCreatedPopupCloseButton: Locator
  readonly phoneInputError: Locator

  constructor(page: Page) {
    this.page = page
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.logoutButton = page.getByTestId('logout-button')
    this.createOrderButton = page.getByTestId('createOrder-button')
    this.nameInput = page.getByTestId('username-input')
    this.phoneInput = page.getByTestId('phone-input')
    this.commentInput = page.getByTestId('comment-input')
    this.orderCreatedPopupOkButton = page.getByTestId('orderSuccessfullyCreated-popup-ok-button')
    this.orderCreatedPopupCloseButton = page.getByTestId('orderSuccessfullyCreated-popup-close-button')
    this.phoneInputError = page.getByTestId('phone-input-error')
  }
}
