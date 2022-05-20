import * as fs from 'fs';

export class Helper {
  static getNumberOfLinesInFile(path: string): number {
    return fs.readFileSync(path).toString().split('\n').length;
  }

  /**
   * Delay execution for a number of specified milliseconds
   * 
   * @param ms Number of milliseconds to wait for
   */
  static async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
