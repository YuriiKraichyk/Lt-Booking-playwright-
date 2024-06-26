import { Page, Locator, expect } from "@playwright/test";

export default class EditAppointment {
  constructor(public page: Page) {}

  //click on the created Appointment
  async clickOnCreatedEvent() {
    await this.page
      .locator(
        "(//div[@class='DayEventBase_wrapper__gSr9T DayEventBase_appointment__6WA2X']//div)[1]"
      )
      .click();
  }
  //check the fields in the edit form
  async checkEditFields(firstName, lastName, phone) {
    //locator for firstname field
    const firstnamefield = this.page.locator(
      "(//input[contains(@class,'MuiInputBase-input MuiOutlinedInput-input')])[2]"
    );

    //locator for lastname field
    const lastNameField = this.page.locator(
      "(//input[contains(@class,'MuiInputBase-input MuiOutlinedInput-input')])[1]"
    );

    //locator for phone field
    const phoneField = this.page.locator("input[type='number']");

    // Get the actual text content of the element
    const actualFirstName = await firstnamefield.inputValue();
    const actualLastName = await lastNameField.inputValue();
    const actualPhoneNumber = await phoneField.inputValue();

    // Check if both firstName and lastName are contained within the actual text
    await expect(actualFirstName).toContain(firstName);
    await expect(actualLastName).toContain(lastName);
    await expect(actualPhoneNumber).toContain(phone);
  }
}
