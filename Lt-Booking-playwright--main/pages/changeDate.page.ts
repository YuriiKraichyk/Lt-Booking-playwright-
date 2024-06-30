import { Page, Locator, expect } from "@playwright/test";

export default class EditAppointmentDate {
  constructor(public page: Page) {}
  //open the edit form
  async clickOnEditForm() {
    //find the text (NEED CHANGE)
    const appointmentLocator = this.page.locator("text=YuriiQA");
    // Hover over the text
    await appointmentLocator.hover();
    // Click on the text
    await appointmentLocator.click();
  }
  async clickOnCalendar() {
    await this.page
      .locator(
        "//div[contains(@class,'MuiToggleButtonGroup-root SlotButtonGroup_root__7VGrv')]//button[1]"
      )
      .click();
  }

  // Select the new calendar date and save it
  async selectCalendarDate() {
    // Get todays date and add 2 days
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + 2);
    // Extract the day number
    const targetDay = targetDate.getDate();
    // Find the button with the target day number and click the first one
    await this.page.getByRole('gridcell', { name: `${targetDay}`, exact: true }).first().click();

    //click on the save button
    await this.page.locator(
      "//button[contains(@class,'MuiButtonBase-root MuiButton-root')]/following-sibling::button[1]"
    ).click();
  }
}
