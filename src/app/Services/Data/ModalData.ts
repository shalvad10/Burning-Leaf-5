export class ModalData {
  public data: any = {
    currentModal: '',
    modalParams: {
      avatars: {
        close: false,
        icon: false,
        size: { x: 636, y: 377, fullscreen: true},
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
