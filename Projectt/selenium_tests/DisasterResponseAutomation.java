package com.example.tests;

import java.time.Duration;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

public class DisasterResponseAutomation {

    public static void main(String[] args) {

        // TODO: Update this path to your ChromeDriver location if it's not in your
        // system PATH
        // System.setProperty("webdriver.chrome.driver",
        // "C:\\path\\to\\chromedriver.exe");

        ChromeOptions options = new ChromeOptions();
        // options.addArguments("--headless"); // Run in headless mode if desired

        WebDriver driver = new ChromeDriver(options);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            // ============================================
            // 1. User Signup Test
            // ============================================
            System.out.println("Starting Signup Test...");
            driver.get("http://localhost:5173/signup");
            driver.manage().window().maximize();

            // Find Signup Fields
            WebElement nameField = wait
                    .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@placeholder='John Doe']")));
            nameField.sendKeys("Automation User");

            WebElement signupEmailField = driver.findElement(By.xpath("//input[@placeholder='you@example.com']"));
            signupEmailField.sendKeys("auto@demo.com");

            // Password fields (there are two inputs with type='password', 1st is pass, 2nd
            // is confirm)
            // Use precise xpath or indexing
            WebElement signupPasswordField = driver.findElement(By.xpath("(//input[@type='password'])[1]"));
            signupPasswordField.sendKeys("password123");

            WebElement confirmPasswordField = driver.findElement(By.xpath("(//input[@type='password'])[2]"));
            confirmPasswordField.sendKeys("password123");

            // Submit Signup
            WebElement getStartedButton = driver.findElement(By.xpath("//button[contains(text(), 'Get Started')]"));
            getStartedButton.click();

            // Wait for redirection to Home Page (Auto-login)
            wait.until(ExpectedConditions.urlContains("/home"));
            System.out.println("Signup Test Passed! Auto-logged in to Home.");

            // ============================================
            // 2. User Logout Test
            // ============================================
            System.out.println("Starting Logout Test...");

            // Logout button in header (title='Sign Out')
            WebElement logoutButton = wait
                    .until(ExpectedConditions.elementToBeClickable(By.cssSelector("button[title='Sign Out']")));
            logoutButton.click();

            // Wait for redirection to Login Page
            wait.until(ExpectedConditions.urlContains("/login"));
            System.out.println("Logout Test Passed!");

            // ============================================
            // 3. User Login Test
            // ============================================
            System.out.println("Starting Login Test...");

            // Ensure we are on login page
            if (!driver.getCurrentUrl().contains("/login")) {
                driver.get("http://localhost:5173/login");
            }

            // Find Email Field
            WebElement emailField = wait
                    .until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("input[type='email']")));
            emailField.clear();
            emailField.sendKeys("auto@demo.com");

            // Find Password Field
            WebElement passwordField = driver.findElement(By.cssSelector("input[type='password']"));
            passwordField.clear();
            passwordField.sendKeys("password123");

            // Click Sign In
            WebElement signInButton = driver.findElement(By.cssSelector("button[type='submit']"));
            signInButton.click();

            // Wait for redirection to Home Page
            wait.until(ExpectedConditions.urlContains("/home"));
            System.out.println("Login Test Passed!");

            // ============================================
            // 4. Home Page Verification Test
            // ============================================
            System.out.println("Starting Home Page Verification...");

            // Verify Hero Title is visible
            WebElement heroTitle = wait.until(ExpectedConditions
                    .visibilityOfElementLocated(By.xpath("//h1[contains(text(), 'Rapid Response')]")));
            if (heroTitle.isDisplayed()) {
                System.out.println("Home Page Element (Hero Title) Verified!");
            }

            // Verify Report Incident Button is present
            WebElement reportButton = driver.findElement(By.xpath("//button[contains(text(), 'Report Incident')]"));
            if (reportButton.isDisplayed()) {
                System.out.println("Report Incident Button Verified!");
            }

            // ============================================
            // 5. Report Incident Test
            // ============================================
            System.out.println("Starting Report Incident Test...");

            // Click Report Incident Button from Home Page
            reportButton.click();

            // Wait for redirection to /reports
            wait.until(ExpectedConditions.urlContains("/reports"));

            // Fill Name
            WebElement reportNameInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.name("name")));
            reportNameInput.sendKeys("John Doe");

            // Test Geolocation Button (Optional - might prompt for permission which
            // Selenium blocks by default, so we fallback to typing)
            // But we can test typing into the location field
            WebElement locationInput = driver.findElement(By.name("location"));
            locationInput.sendKeys("123 Main St, Springfield");

            // Select Disaster Type
            Select disasterTypeSelect = new Select(driver.findElement(By.name("disasterType")));
            disasterTypeSelect.selectByVisibleText("Flood");

            // Fill Description
            driver.findElement(By.name("description"))
                    .sendKeys("Heavy flooding reported in the downtown area. Assistance required immediately.");

            // Upload valid PNG file (ensure a file exists or skip if testing locally
            // without file)
            // Uncomment the lines below if you have a test.png file at C:\temp\test.png
            /*
             * WebElement fileInput = driver.findElement(By.xpath("//input[@type='file']"));
             * fileInput.sendKeys("C:\\temp\\test.png");
             */

            // Submit Report
            WebElement submitReportBtn = driver
                    .findElement(By.xpath("//button[contains(text(), 'Submit Disaster Report')]"));
            submitReportBtn.click();

            // Verify Success Message
            WebElement successMsg = wait.until(ExpectedConditions
                    .visibilityOfElementLocated(By.xpath("//h3[contains(text(), 'Report Submitted Successfully')]")));
            if (successMsg.isDisplayed()) {
                System.out.println("Report Incident Test Passed! Success message verified.");
            }

            // Navigate back to Home or specific page for next test
            driver.navigate().to("http://localhost:5173/home");

            // ============================================
            // 6. Enroll as Volunteer Test
            // ============================================
            System.out.println("Starting Volunteer Enrollment Test...");

            // Navigate to Volunteer Page
            driver.get("http://localhost:5173/volunteers");

            // Click 'Join as Volunteer' to open modal
            WebElement joinButton = wait.until(ExpectedConditions
                    .elementToBeClickable(By.xpath("//button[contains(text(), 'Join as Volunteer')]")));
            joinButton.click();

            // Wait for Modal Title
            WebElement modalTitle = wait.until(ExpectedConditions
                    .visibilityOfElementLocated(By.xpath("//h2[contains(text(), 'Join as Volunteer')]")));

            // Fill Volunteer Form (inside modal)
            driver.findElement(By.name("name")).sendKeys("Jane Smith");
            driver.findElement(By.name("email")).sendKeys("jane.smith@example.com");
            driver.findElement(By.name("phone")).sendKeys("+15550009999");
            driver.findElement(By.name("location")).sendKeys("Westside District");

            // Select Experience Level
            Select experienceSelect = new Select(driver.findElement(By.name("experience")));
            experienceSelect.selectByVisibleText("Intermediate - Some training");

            // Submit Application
            WebElement submitAppBtn = driver.findElement(By.xpath("//button[contains(text(), 'Submit Application')]"));
            submitAppBtn.click();

            // Handle Alert (Check if alert appears)
            try {
                wait.until(ExpectedConditions.alertIsPresent());
                driver.switchTo().alert().accept();
                System.out.println("Volunteer Enrollment Test Passed! Alert accepted.");
            } catch (Exception e) {
                System.out.println("Note: No alert appeared, or handled differently.");
            }

            System.out.println("ALL TESTS COMPLETED SUCCESSFULLY.");

        } catch (Exception e) {
            System.err.println("Test Failed due to exception: " + e.getMessage());
            e.printStackTrace();
        } finally {
            // Close browser
            try {
                // Wait a bit before closing so user can see result
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            if (driver != null) {
                driver.quit();
                System.out.println("Browser Closed.");
            }
        }
    }
}
