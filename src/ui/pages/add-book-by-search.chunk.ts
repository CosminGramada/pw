import { Locator, Page } from '@playwright/test';
import { SearchBookType } from '../enums';
import { LibrariesPage } from './libraries.po';

export class AddBookBySearchChunk {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    void AddBookBySearchChunk.waitForChunkLoad(page);
  }

  static async waitForChunkLoad(page: Page): Promise<void> {
    await page.waitForNavigation();
  }

  private get searchByIsbnRadioButton(): Locator {
    return this.page.locator('[for="ean_isbn13"]');
  }

  private get searchByKeywordsRadioButton(): Locator {
    return this.page.locator('[for="keywords"]');
  }

  private get searchInput(): Locator {
    return this.page.locator('#search');
  }

  private get addBookButton(): Locator {
    return this.page.locator('#find');
  }
  
  async addBook(searchType: SearchBookType, searchString: string): Promise<LibrariesPage> {
    switch (searchType) {
      case SearchBookType.Isbn: {
        await this.searchByIsbnRadioButton.click();
        break;
      }
      case SearchBookType.Keyword: {
        await this.searchByKeywordsRadioButton.click();
        break;
      }
      default: {
        throw new Error(`Invalid search type ${searchType}`);
      }
    }
    await this.searchInput.type(searchString);
    await this.addBookButton.click();
    return new LibrariesPage(this.page);
  }
}
