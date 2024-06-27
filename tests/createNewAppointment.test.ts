import { test, expect } from "@playwright/test";
import StartingPage from "../pages/starting.page";
import LoginPage from "../pages/login.page";
import CalendarPage from "../pages/calendar.page";
import EditAppointment from "../pages/editAppointment.page";
import AddSpecific from "../pages/specificEmployee.page";

test.describe.serial("SmokeTest", () => {
  let startPage: StartingPage;
  let loginPage: LoginPage;
  let calendarPage: CalendarPage;
  let editAppoitmentPage: EditAppointment;
  let addSpecificEmployee: AddSpecific;
  let page;

  const lastName = "YuriiQA";
  const firstName = "test";
  const phone = "09811111111";

  const editedLastname = "YuriiQA1";
  const editedFirstname = "Auto";
  const editedPhonenumber = "12345678";
  const editedNotes = "qqq";

  test.beforeAll(async ({ browser, baseURL }) => {
    // Set up a single browser context and page for all tests
    const context = await browser.newContext();
    page = await context.newPage();

    // Initialize page objects
    startPage = new StartingPage(page);
    loginPage = new LoginPage(page);
    calendarPage = new CalendarPage(page);
    editAppoitmentPage = new EditAppointment(page);
    addSpecificEmployee = new AddSpecific(page);

    await page.goto(`${baseURL}login-continue?client_id=ltb`);
    await startPage.clickWeitermachenButton();

    // Check if the redirection to the login page was successful
    const expectedLoginUrlPart =
      "https://fielmann-staging.lt-einfachanstellen.de/sso/u/login/";
    await startPage.checkLoginURL(expectedLoginUrlPart);

    // Enter login data and click on Login button
    await loginPage.inputEmail("demo-001_2013@linetweet.com");
    await loginPage.inputPassword("@Demo1234!");
    await loginPage.clickAnmeldenButton();

    // Check if we are on the booking page
    const expectedCalendarURL =
      "https://lt-booking-fielmann-staging.lt-einfachanstellen.de/";
    await calendarPage.checkCalendarPage(expectedCalendarURL);
    //Go to the next day
    await calendarPage.gotoNextDayClick();
  });

  test("Add Eye Exam appointment", async () => {
    // Click on the Add new Appointment button
    await calendarPage.addNewAppointmentClick();

    // Choose the Eye Exam and Mr buttons
    await calendarPage.chooseEyeExamAndMr();

    // Enter Last, First name and Phone number
    await calendarPage.inputLastName(lastName);
    await calendarPage.inputFirstName(firstName);
    await calendarPage.inputPhoneNumber(phone);

    // //Click on show all time
    // await calendarPage.ShowAllTimeClick();

    // Choose the time
    await calendarPage.chooseTime();

    // Click on Add new Appointment
    await calendarPage.appointmentButtonClick();

    // URL validation
    const expectedCalendarURL =
      "https://lt-booking-fielmann-staging.lt-einfachanstellen.de/calendar";
    await calendarPage.checkCalendarPage(expectedCalendarURL);

    // Validate the newly created event
    await calendarPage.checkTheEventCreated(firstName, lastName);
  });

  test("Edit Event", async () => {
    // Click on the created Appointment
    await editAppoitmentPage.clickOnCreatedEvent();

    // Assert first/last name and phone number
    await editAppoitmentPage.checkEditFields(firstName, lastName, phone);

    // Edit data in the editor window and save the changes
    await editAppoitmentPage.editTheDataAndSave(
      editedFirstname,
      editedLastname,
      editedPhonenumber,
      editedNotes
    );

    // Click on edited event
    await editAppoitmentPage.clickOnCreatedEvent();

    // Check that the field was edited and save it
    await editAppoitmentPage.checkEditedFieldsAndCancel(
      editedFirstname,
      editedLastname,
      editedPhonenumber,
      editedNotes
    );
  });

  test("Specific Employee add", async () => {
    //open the edit form
    await addSpecificEmployee.openEditForm();
    //open the employee list
    await addSpecificEmployee.clickSpecificEmployeeList();
    //select specific employee
    await addSpecificEmployee.chooseScpecificEmployee();
    //select time slot and click on save button
    await addSpecificEmployee.chooseTimeSlot();
  });

  test.afterAll(async () => {
    // Close the browser context after all tests
    await page.context().close();
  });
});
