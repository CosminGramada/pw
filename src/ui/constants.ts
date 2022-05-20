import { BookInformation } from './interfaces/book-info';
import { UserInformation } from './interfaces/user-info';

export class Constants {
  static readonly ExistingUser: UserInformation = {
    firstName: 'Cosmin',
    lastName: 'Gramada',
    username: 'CosminGramada',
    email: 'cosmin1234@mailinator.com',
    password: 'Test12345!'
  }

  static readonly BookIsbn = '9781937538088';

  static readonly ManualBookEntry: BookInformation = {
    title: 'The Expert Test Manager: Guide to the ISTQB Expert Level Certification',
    authors: [
      'Rex Black',
      'James Rommens'
    ],
    description: 'This book covers the ISTQB Expert Level Test Manager syllabus and is a complete, one-stop preparation guide for the reader who is otherwise qualified (based on experience as a test manager) to take the Expert Level Test Manager exam. Included are extensive hands-on exercises and sample exam questions that comply with ISTQB standards for Expert Level exams.',
    publishedYear: 2017,
    publishedMonth: 10,
    publishedDay: 24,
    publisher: 'Rocky Nook',
    isbn13: 9781933952949,
    isbn10: 1933952946,
    pages: 403,
    coverImagePath: `${process.cwd()}/src/resources/coverImage.jpg`
  }
}
