export interface BookInformation {
  title: string;
  authors: string[];
  description: string;
  publishedYear: number;
  publishedMonth: number;
  publishedDay: number;
  publisher: string;
  isbn13: number;
  isbn10: number;
  pages: number;
  coverImagePath: string;
}
