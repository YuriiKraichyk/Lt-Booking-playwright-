import { test, expect } from '@playwright/test';
import StartingPage from '../pages/starting.page';
import LoginPage from '../pages/login.page';
import CalendarPage from '../pages/calendar.page';

test.describe('Login Tests', () => {
    let startPage: StartingPage;
    let loginPage: LoginPage;
    let calendarPage: CalendarPage;

    // hook beforeEach 
    test.beforeEach(async ({ page, baseURL }) => {

        //pages initilization 
        startPage = new StartingPage(page);
        loginPage = new LoginPage(page);
        calendarPage = new CalendarPage(page);
   
        await page.goto(`${baseURL}login-continue?client_id=ltb`);
        await startPage.clickWeitermachenButton();
    
        //check if the redirection to the login page have success by use the URL PART 
        const expectedLoginUrlPart = 'https://fielmann-staging.lt-einfachanstellen.de/sso/u/login/';
        await startPage.checkLoginURL(expectedLoginUrlPart);

        //enter the login data and click on Login button
        await loginPage.inputEmail('demo-001_2013@linetweet.com');
        await loginPage.inputPassword('@Demo1234!');
        await loginPage.clickAnmeldenButton();

        

        // check if we are on the booking page
        const expectedcalendarURL = "https://lt-booking-fielmann-staging.lt-einfachanstellen.de/";
        await calendarPage.checkCalendarPage(expectedcalendarURL);
    });

    test("Add Eye Exam appointment", async({page}) => {

        //click on the Add new Appointment button
        await calendarPage.addNewAppointmentClick();

        //choose the Eye Exam and Mr buttons
        await calendarPage.chooseEyeExamAndMr();

        //Last, First name and Phone number input
        await calendarPage.inputLastName("test")
        await calendarPage.inputFirstName("Yurii")
        await calendarPage.inputPhoneNumber("09811111111")

        //click on show all time
        await calendarPage.ShowAllTimeClick();

        //choose the time
        await calendarPage.chooseTime();

        //click on Add new Appointment
        await calendarPage.appointmentButtonClick();

        //URL validation
        const expectedcalendarURL = "https://lt-booking-fielmann-staging.lt-einfachanstellen.de/calendar"
        await calendarPage.checkCalendarPage(expectedcalendarURL)

        //add elements validation
        
    });

});