import { Page, expect } from "@playwright/test";

export default class RescheduledDay {
  constructor(public page: Page) {}
  //Go to the next page(day) and check that the appointment was rescheduled
  async goToTheNextDay() {
    //click on the 'go to the next day button'
    await this.page
      .locator(
        "button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.DatePicker_arrowIconButton__beZN9"
      )
      .nth(1)
      .click();
  }
  async clickOnRescheduledAppointment() {
    //check if the edited appointment was rescheduled by finding the name and click on it
    await this.page.locator("text=YuriiQA").click();
  }
  async checkData() {
    // Get todays date and add 2 days
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + 2);
    // Extract the day number
    const targetDay = targetDate.getDate();
    //convert target day from number to string
    const targetDayString = targetDay.toString();
    //check if the button in the calendar has changed the day data
    const dateButton = await this.page.locator(
      "//div[contains(@class,'MuiToggleButtonGroup-root SlotButtonGroup_root__7VGrv')]//button[1]"
    );
    //get the text from the button
    const dateButtonText = await dateButton.textContent();
    //assert the text
    expect(dateButtonText).toContain(targetDayString);
  }
  async closeTheEditWindow() {
    await this.page
      .locator(
        "button.MuiButtonBase-root.MuiButton-root.MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-sizeMedium.MuiButton-outlinedSizeMedium.MuiButton-disableElevation.css-3jm169"
      )
      .nth(1)
      .click();
  }
}
