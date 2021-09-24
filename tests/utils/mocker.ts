export class ServiceMocker {
  private service: any;

  constructor(service: any) {
    this.service = service;
  }

  async mockSuccess(method: string, response?: any) {
    jest.spyOn(this.service, method).mockImplementationOnce(
      async () =>
        new Promise((resolve) => {
          resolve(response);
        })
    );
  }

  async mockError(method: string, error: Error) {
    jest.spyOn(this.service, method).mockImplementationOnce(
      async () =>
        new Promise((resolve, reject) => {
          throw error;
        })
    );
  }
}
