import { Page, Locator, expect } from "@playwright/test";

export default class RescheduledDay {
  constructor(public page: Page) {}
    //Go to the next page(day) and check that the appointment was rescheduled
    async goToTheNextDay(){
        //click on the 'go to the next day button'
        await this.page
        .locator(
          "button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.DatePicker_arrowIconButton__beZN9"
        )
        .nth(1)
        .click();
    }
    async clickOnRescheduledAppointment(){
    //check if the edited appointment was rescheduled by finding the name and click on it
        await this.page.locator("text=YuriiQA").click();
    }
    async closeTheEditWindow(){
        await this.page.locator("button.MuiButtonBase-root.MuiButton-root.MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-sizeMedium.MuiButton-outlinedSizeMedium.MuiButton-disableElevation.css-3jm169")
        .nth(1)
        .click()
    }
}