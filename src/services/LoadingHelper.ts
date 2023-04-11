class LoadingHelper {
  instance: any = undefined;

  constructor() {
    this.setInstance = this.setInstance.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  setInstance(instance: any) {
    this.instance = instance;
  }

  show() {
    this.instance?.show();
  }

  hide() {
    this.instance?.hide();
  }
}

export default new LoadingHelper();
