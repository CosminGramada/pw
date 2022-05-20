import { expect, test } from '@playwright/test';
import { Constants } from '../constants';
import { LibraryType, SearchBookType } from '../enums';
import { Helper } from '../helper';
import { AddItemsPage } from '../pages/add-items.po';
import { HomePage } from '../pages/home-page.po';
import { LibrariesPage } from '../pages/libraries.po';

test.describe('User', () => {
  let librariesPage: LibrariesPage;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    const homepage = new HomePage(page);
    await homepage.openTestApplication();
    const loginPage = await homepage.clickLogin();
    librariesPage = await loginPage.signIn(Constants.ExistingUser);
  });

  for (const libraryType of Object.keys(LibraryType).filter(key => isNaN(Number(key)))) {
    test(`should be able to create a new ${libraryType} library`, async () => {
      const libraryName = `${libraryType}-${Date.now()}`;
      const libraryPage = await librariesPage.leftMenu.addNewLibrary();
      librariesPage = await libraryPage.createNewLibrary(LibraryType[libraryType] as LibraryType, libraryName);

      const currentSelectedLibraryName = await librariesPage.getCurrentSelectedLibrary();
      expect(currentSelectedLibraryName).toBe(libraryName);
    });
  }

  test.describe(undefined, () => {
    let addNewItemsPage: AddItemsPage;

    test.beforeEach(async () => {
      const libraryName = `Books-${Date.now()}`;
      const libraryPage = await librariesPage.leftMenu.addNewLibrary();
      librariesPage = await libraryPage.createNewLibrary(LibraryType.Books, libraryName);
      addNewItemsPage = await librariesPage.leftMenu.openAddNewItem();
    });

    test('should be able to add item to a book library by search', async () => {
      const addBookMessage = await addNewItemsPage.addBookBySearching(SearchBookType.Isbn, Constants.BookIsbn);
      expect(addBookMessage).toBe('Item was successfully added to your library!');
    });
  
    test('should be able to add items to a book library by import', async () => {
      const addBookMatchingFieldsPage = await addNewItemsPage.addBookByImport();
      const addBookImportConfirmPage = await addBookMatchingFieldsPage.submitUploadedCsv();
      const confirmationText = await addBookImportConfirmPage.getConfirmationText();

      expect(confirmationText).toBe('Your list is being processed!');
      
      /**
       * Get the number of book entries from the CSV file
       * Number of rows in the file minus the header columns
       */
      const numberOfItemsInCsv = Helper.getNumberOfLinesInFile(`${process.cwd()}/src/resources/books_import.csv`) - 1;
      
      librariesPage = await librariesPage.leftMenu.openLibraries();
      let numberOfBooksInLibrary = await librariesPage.getNumberOfBooksInLibrary();

      /**
       * Wait a maximum amount of 10 seconds for the items in the CSV to be imported
       */
      const timeout = Date.now() + 10 * 1000;

      while (numberOfBooksInLibrary < numberOfItemsInCsv && Date.now() < timeout) {
        await Helper.delay(1000);
        librariesPage = await librariesPage.leftMenu.openLibraries();
        numberOfBooksInLibrary = await librariesPage.getNumberOfBooksInLibrary();
      }
      expect(numberOfBooksInLibrary).toBe(numberOfItemsInCsv);
    });

    test('should be able to manual add item to a book library', async () => {
      const confirmPage = await addNewItemsPage.addBookByManualEntry(Constants.ManualBookEntry);
      const confirmationText = await confirmPage.getConfirmationText();

      expect(confirmationText).toBe('Your item was successfully created.');

      librariesPage = await librariesPage.leftMenu.openLibraries();
      const numberOfBooksInLibrary = await librariesPage.getNumberOfBooksInLibrary();
      expect(numberOfBooksInLibrary).toBe(1);

      const bookName = (await librariesPage.getAllBookNames())[0];
      expect(bookName).toBe(Constants.ManualBookEntry.title);
    });
  });
});

