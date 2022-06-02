export class ModalData {
  public data: any = {
    currentModal: '',
    modalParams: {
      bonus: {
        close: true,
        data: {}
      },
      info:
      {
        close: false,
        icon: false,
        size  : { x: 400, y: 150, fullscreen: false },
        infoText: 'informationText',
        data: undefined,
        buttons: []
      }
    }
  };
}
