import { Locator, Page } from '@playwright/test';
import { LibraryType } from '../enums';
import { LibrariesPage } from './libraries.po';

export class LibraryPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    void LibraryPage.waitForPageLoad(page);
  }

  static async waitForPageLoad(page: Page): Promise<void> {
    await page.waitForNavigation();
  }

  private get titleInput(): Locator {
    return this.page.locator('#add_title');
  }

  private get booksRadioButton(): Locator {
    return this.page.locator('[for="library_types_id1"]');
  }

  private get moviesRadioButton(): Locator {
    return this.page.locator('[for="library_types_id2"]');
  }

  private get videoGamesRadioButton(): Locator {
    return this.page.locator('[for="library_types_id3"]');
  }

  private get musicRadioButton(): Locator {
    return this.page.locator('[for="library_types_id4"]');
  }

  private get publishLibraryCheckbox(): Locator {
    return this.page.locator('[for="publish_library"]');
  }

  private get addLibraryButton(): Locator {
    return this.page.locator('#add_library_submit');
  }
  
  async createNewLibrary(libraryType: LibraryType, libraryName: string): Promise<LibrariesPage> {
    await this.titleInput.type(libraryName);

    switch (libraryType) {
      case LibraryType.Books: {
        await this.booksRadioButton.click();
        break;
      }
      case LibraryType.Movies: {
        await this.moviesRadioButton.click();
        break;
      }
      case LibraryType.VideoGames: {
        await this.videoGamesRadioButton.click();
        break;
      }
      case LibraryType.Music: {
        await this.musicRadioButton.click();
        break;
      }
      default: {
        throw new Error(`Invalid library type ${libraryType}`);
      }
    }
    await this.publishLibraryCheckbox.uncheck();
    await this.addLibraryButton.click();
    await LibraryPage.waitForPageLoad(this.page);
    return new LibrariesPage(this.page);
  }
}
