import { Page, Locator, expect } from "@playwright/test";

export default class AfterAll {
    constructor(public page: Page) {}
    //open the appointment
    async openAppointment(){
        await this.page.locator("text=YuriiQA").click();
    }
    //delete the appointment
    async deleteAppointment(){
        //click on delete button
        await this.page.locator("(//button[contains(@class,'MuiButtonBase-root MuiButton-root')])[3]").click();
        //click on confirm button
        await this.page.locator("(//button[contains(@class,'MuiButtonBase-root MuiButton-root')]/following-sibling::button)[2]").click();
    }
}
