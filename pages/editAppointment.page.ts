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

  //Edit data in the editor window and save the changes
  async editTheDataAndSave() {
    //LOCATORS
    //create the locator for firstName Field
    const firstnamefield = this.page.locator(
      "(//input[contains(@class,'MuiInputBase-input MuiOutlinedInput-input')])[2]"
    );

    //create the locator for lastname field
    const lastname = this.page.locator(
      "(//input[contains(@class,'MuiInputBase-input MuiOutlinedInput-input')])[1]"
    );

    //create the locator for phone number field
    const phonefield = this.page.locator("input[type='number']");

    //TO DO

    //clear and add new firstname
    await firstnamefield.fill("");
    await firstnamefield.fill("Test1");
    //clear and add new lastname
    await lastname.fill("");
    await lastname.fill("YuriiAuto");
    //clear and add new phone number
    await phonefield.fill("");
    await phonefield.fill("");
  }
}
