export class ModalData {
  public data: any = {
    currentModal: '',
    modalParams: {
      bonus: {
        close: true,
        title: 'BUY WILD BONUS',
        data: {}
      },
      info: {
        infoText: '',
        title: '',
        data: {},
        buttons: [
          { text: 'OK', backgroundColor: '#5cb85c', action: 'closeGame' }
        ]
      }
    }
  };
}
