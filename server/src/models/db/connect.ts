import mongoose from 'mongoose';

export class DB {
  constructor() {}

  init(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        this.handling();
      } catch (e) {
        reject({ type: 'database handling', message: e, code: 400 });
      }
      try {
        this.connect();
      } catch (e) {
        reject({ type: 'database connect', message: e, code: 400 });
      }
      resolve({ code: 200 });
    });
  }

  private connectionString(): string {
    const string = process.env.DB_URL || 'mongodb://localhost:27017/cinema';
    return string;
  }

  private async connect(): Promise<void> {
    const string = this.connectionString();
    try {
      await mongoose.connect(string);
    } catch (e) {
      throw e;
    }
  }

  private handling(): void {
    mongoose.connection
      .on('error', console.log)
      .on('disconnected', console.log);
  }
}
