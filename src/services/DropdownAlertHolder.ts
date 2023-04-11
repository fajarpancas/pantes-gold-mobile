class DropdownAlertHolder {
  instance: any;
  constructor() {
    this.setInstance = this.setInstance.bind(this);
    this.showInfo = this.showInfo.bind(this);
    this.showError = this.showError.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
  }

  setInstance(instance: any) {
    this.instance = instance;
  }

  showInfo(title: string, message: string) {
    this.instance.alertWithType('info', title, message);
  }

  showError(title: string, message: string) {
    this.instance.alertWithType('error', title, message);
  }

  showSuccess(title: string, message: string) {
    this.instance.alertWithType('success', title, message);
  }
}

export default new DropdownAlertHolder();
