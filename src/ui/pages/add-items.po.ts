import { Locator, Page } from '@playwright/test';
import { SearchBookType } from '../enums';
import { BookInformation } from '../interfaces/book-info';
import { AddBookByImportChunk } from './add-book-by-import.chunk';
import { AddBookByManualEntryChunk } from './add-book-by-manual-entry.chunk';
import { AddBookBySearchChunk } from './add-book-by-search.chunk';
import { AddBookConfirmPage } from './add-book-confirm.po';
import { AddBookMatchingFieldsPage } from './add-book-matching-fields.po';

export class AddItemsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    void AddItemsPage.waitForPageLoad(page);
  }

  static async waitForPageLoad(page: Page): Promise<void> {
    await page.waitForNavigation();
  }

  private get searchTab(): Locator {
    return this.page.locator('.add_items.tab');
  }

  private get csvImportTab(): Locator {
    return this.page.locator('.csv_wrapper.tab');
  }

  private get manualEntryTab(): Locator {
    return this.page.locator('.manual_entry.tab');
  }

  private get notificationText(): Locator {
    return this.page.locator('#notification-text');
  }
  
  async addBookBySearching(searchType: SearchBookType, searchString: string): Promise<string> {
    const chunk = await this.clickSearchTab();
    await chunk.addBook(searchType, searchString);
    return this.notificationText.textContent();
  }

  async addBookByImport(): Promise<AddBookMatchingFieldsPage> {
    const chunk = await this.clickCsvImportTab();
    await chunk.addBook();
    return new AddBookMatchingFieldsPage(this.page);
  }

  async addBookByManualEntry(bookInfo: BookInformation): Promise<AddBookConfirmPage> {
    const chunk = await this.clickManualEntryTab();
    await chunk.addBook(bookInfo);
    return new AddBookConfirmPage(this.page);
  }

  private async clickSearchTab(): Promise<AddBookBySearchChunk> {
    await this.searchTab.click();
    return new AddBookBySearchChunk(this.page);
  }

  private async clickCsvImportTab(): Promise<AddBookByImportChunk> {
    await this.csvImportTab.click();
    return new AddBookByImportChunk(this.page);
  }

  private async clickManualEntryTab(): Promise<AddBookByManualEntryChunk> {
    await this.manualEntryTab.click();
    return new AddBookByManualEntryChunk(this.page);
  }
}
