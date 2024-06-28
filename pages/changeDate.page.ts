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
  async selectCalendarDate(targetDay: number) {
    // Construct the button selector based on the target day number
    const buttonSelector = `button.MuiButtonBase-root.MuiPickersDay-root[role='gridcell'][aria-selected='false']:not([aria-current='date'])`;
    const dateButtons = await this.page.locator(buttonSelector);

    // Iterate through each date button and find the one with the matching day number
    for (const button of dateButtons) {
      const buttonText = await button.innerText();
      if (buttonText.trim() === `${targetDay}`) {
        await button.click();
        return; // Exit the function after clicking the correct date
      }
    }
  }
}
