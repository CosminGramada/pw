import { Locator, Page } from '@playwright/test';
import { AddBookMatchingFieldsPage } from './add-book-matching-fields.po';

export class AddBookByImportChunk {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    void AddBookByImportChunk.waitForChunkLoad(page);
  }

  static async waitForChunkLoad(page: Page): Promise<void> {
    await page.waitForNavigation();
  }

  private get fileUploadInput(): Locator {
    return this.page.locator('#csv_file');
  }

  private get uploadButton(): Locator {
    return this.page.locator('#find_upload');
  }
  
  async addBook(): Promise<AddBookMatchingFieldsPage> {
    await this.fileUploadInput.setInputFiles(`${process.cwd()}/src/resources/books_import.csv`);

    await this.uploadButton.click();
    return new AddBookMatchingFieldsPage(this.page);
  }
}
