import { Locator, Page } from '@playwright/test';
import { BookInformation } from '../interfaces/book-info';
import { AddBookMatchingFieldsPage } from './add-book-matching-fields.po';

export class AddBookByManualEntryChunk {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    void AddBookByManualEntryChunk.waitForChunkLoad(page);
  }

  static async waitForChunkLoad(page: Page): Promise<void> {
    await page.waitForNavigation();
  }

  private get titleInput(): Locator {
    return this.page.locator('#title');
  }

  private get authorsInput(): Locator {
    return this.page.locator('#creators');
  }

  private get descriptionInput(): Locator {
    return this.page.locator('#description');
  }

  private get publishYearInput(): Locator {
    return this.page.locator('#publish_year');
  }

  private get publishMonthInput(): Locator {
    return this.page.locator('#publish_month');
  }

  private get publishDayInput(): Locator {
    return this.page.locator('#publish_day');
  }

  private get publisherInput(): Locator {
    return this.page.locator('#publisher');
  }

  private get isbn13Input(): Locator {
    return this.page.locator('#ean_isbn13');
  }

  private get isbn10Input(): Locator {
    return this.page.locator('#upc_isbn10');
  }

  private get pagesInput(): Locator {
    return this.page.locator('#length_of');
  }

  private get coverImageInput(): Locator {
    return this.page.locator('#image');
  }

  private get submitButton(): Locator {
    return this.page.locator('#submit_manual');
  }
  
  async addBook(bookInfo: BookInformation): Promise<AddBookMatchingFieldsPage> {
    await this.titleInput.type(bookInfo.title);
    await this.authorsInput.type(bookInfo.authors.join(','));
    await this.descriptionInput.type(bookInfo.description);
    await this.publishYearInput.type(bookInfo.publishedYear.toString());
    await this.publishMonthInput.type(bookInfo.publishedMonth.toString());
    await this.publishDayInput.type(bookInfo.publishedDay.toString());
    await this.publisherInput.type(bookInfo.publisher);
    await this.isbn13Input.type(bookInfo.isbn13.toString());
    await this.isbn10Input.type(bookInfo.isbn10.toString());
    await this.pagesInput.type(bookInfo.pages.toString());
    await this.coverImageInput.setInputFiles(bookInfo.coverImagePath);

    await this.submitButton.click();
    return new AddBookMatchingFieldsPage(this.page);
  }
}
