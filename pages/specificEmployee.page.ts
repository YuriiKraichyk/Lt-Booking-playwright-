import { Page, Locator, expect } from "@playwright/test";

export default class AddSpecific {
  constructor(public page: Page) {}
  //open the edit form by click
  async openEditForm() {
    //find the text (NEED CHANGE)
    const appointmentLocator = this.page.locator("text=YuriiQA");
    // Hover over the text
    await appointmentLocator.hover();
    // Click on the text
    await appointmentLocator.click();
  }
  //open the list
  async clickSpecificEmployeeList() {
    await this.page
      .locator(
        "//div[@role='button' and @aria-haspopup='listbox' and contains(@class,'MuiSelect-select') and contains(@class,'MuiOutlinedInput-input')]"
      )
      .click();
  }

  //choose the first specific employee from the list
  async chooseScpecificEmployee() {
    // Locator for the selected item
    const selectedItemLocator = this.page.locator(
      "(//li[contains(@class,'MuiButtonBase-root MuiMenuItem-root')])[2]"
    );
    //click on the employee
    await selectedItemLocator.click();
  }

  //choose time slot
  async chooseTimeSlot() {
    const timeSlotButton = this.page
      .locator('button[aria-pressed="false"]')
      .filter({
        hasText: ":",
      })
      .first();
    await timeSlotButton.click();
    //click on save button
    await this.page
      .locator(
        "//button[contains(@class,'MuiButtonBase-root MuiButton-root')]/following-sibling::button[1]"
      )
      .click();
  }
}
