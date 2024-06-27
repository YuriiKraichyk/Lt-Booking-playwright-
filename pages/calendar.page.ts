import { Page, Locator, expect } from "@playwright/test";

export default class CalendarPage {
  constructor(public page: Page) {}
  //go to the next date page
  async gotoNextDayClick() {
    await this.page
      .locator(
        "button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.DatePicker_arrowIconButton__beZN9"
      )
      .nth(1)
      .click();
  }
  // click on add new appointment button
  async addNewAppointmentClick() {
    const addAppointmentButton: Locator = this.page.getByRole("button", {
      name: "Add new appointment",
    });
    await addAppointmentButton.waitFor();
    await this.page.waitForTimeout(2000);
    await addAppointmentButton.click();
  }

  // scenario of adding new EyeExam appointment
  async chooseEyeExamAndMr() {
    // click on Eye Exam button
    await this.page.getByRole("button", { name: "Eye Exam 15 min" }).click();

    // click on Customer (Mr) button
    await this.page.click("button[value='male']");
  }

  // click and input the Last name
  async inputLastName(lastname: string) {
    await this.page
      .locator(
        "(//input[contains(@class,'MuiInputBase-input MuiOutlinedInput-input')])[1]"
      )
      .fill(lastname);
  }

  // click and input the First name
  async inputFirstName(firstname: string) {
    await this.page
      .locator(
        "(//input[contains(@class,'MuiInputBase-input MuiOutlinedInput-input')])[2]"
      )
      .fill(firstname);
  }

  // click and input the Phone number
  async inputPhoneNumber(phonenumber: string) {
    await this.page.locator("//input[@type='number']").fill(phonenumber);
  }

  // // // click ShowAll time
  // // async ShowAllTimeClick() {
  // //   await this.page.click(
  // //     "label.MuiFormLabel-root.MuiFormLabel-colorPrimary.css-11dpzdo"
  // //   );
  // }
  // choose time
  async chooseTime() {
    //find the first button that have a ':' in a text
    const button = await this.page.locator('button:has-text(":")').first();
    await button.click();
  }

  // click on add new appointment button
  async appointmentButtonClick() {
    await this.page.click("button[id^=':r']");
  }

  // check the redirection back to the calendar page
  async checkCalendarPage(expectedcalendarURL: string) {
    const currentUrl = this.page.url();
    expect(currentUrl).toBe(expectedcalendarURL);
  }

  // check that the event was created by First and Last names
  async checkTheEventCreated(firstName, lastName) {
    // Create a selector that targets the element containing the event text
    const eventLocator = this.page.locator(`text=${firstName} ${lastName}`);
    // Check that the event is visible on the page
    await expect(eventLocator).toBeVisible();
  }
}
