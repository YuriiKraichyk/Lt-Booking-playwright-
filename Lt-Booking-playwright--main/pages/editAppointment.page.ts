import { Page, Locator, expect } from "@playwright/test";

export default class EditAppointment {
  constructor(public page: Page) {}

  //click on the created Appointment (NEED NEW CHANGE)
  async clickOnCreatedEvent() {
    const appointmentLocator = this.page.locator("text=YuriiQA");

    // Hover over the text
    await appointmentLocator.hover();

    // Click on the text
    await appointmentLocator.click();
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
  async editTheDataAndSave(
    editedFirstname,
    editedLastname,
    editedPhonenumber,
    editedNotes
  ) {
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

    //create the locator for woman gender button
    const genderWomanButton = this.page.locator("button[value='female']");

    //create locator for Notes field
    const notesField = this.page.locator(
      "(//textarea[contains(@class,'MuiInputBase-input MuiOutlinedInput-input')])[1]"
    );

    //save button
    const saveChangeButton = this.page.locator(
      "//button[contains(@class,'MuiButtonBase-root MuiButton-root')]/following-sibling::button[1]"
    );
    //TO DO

    //click on woman gender button
    await genderWomanButton.click();
    //clear and add new firstname
    await firstnamefield.fill("");
    await firstnamefield.fill(editedFirstname);
    //clear and add new lastname
    await lastname.fill("");
    await lastname.fill(editedLastname);
    //clear and add new phone number
    await phonefield.fill("");
    await phonefield.fill(editedPhonenumber);
    //add notes
    await notesField.fill(editedNotes);
    //click save button
    await saveChangeButton.click();
  }

  async checkEditedFieldsAndCancel(
    editedFirstname,
    editedLastname,
    editedPhonenumber,
    editedNotes
  ) {
    //locator for firstname field
    const editedFirstNameField = this.page.locator(
      "(//input[contains(@class,'MuiInputBase-input MuiOutlinedInput-input')])[2]"
    );
    //locator for lastname field
    const editedLastNameField = this.page.locator(
      "(//input[contains(@class,'MuiInputBase-input MuiOutlinedInput-input')])[1]"
    );
    //locator for phone field
    const editedPhoneField = this.page.locator("input[type='number']");
    //locator for notes field
    const editedNotesField = this.page.locator(
      "(//textarea[contains(@class,'MuiInputBase-input MuiOutlinedInput-input')])[1]"
    );

    // Get the actual text content of the element
    const actualFirstName = await editedFirstNameField.inputValue();
    const actualLastName = await editedLastNameField.inputValue();
    const actualPhoneNumber = await editedPhoneField.inputValue();
    const actualNotesField = await editedNotesField.inputValue();

    // Check if both firstName and lastName are contained within the edited text
    await expect(actualFirstName).toContain(editedFirstname);
    await expect(actualLastName).toContain(editedLastname);
    await expect(actualPhoneNumber).toContain(editedPhonenumber);
    await expect(actualNotesField).toContain(editedNotes);

    //click on cancel button
    await this.page
      .locator(
        "button.MuiButtonBase-root.MuiButton-root.MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-sizeMedium.MuiButton-outlinedSizeMedium.MuiButton-disableElevation.css-3jm169"
      )
      .nth(1)
      .click();
  }
}
