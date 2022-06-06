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
          { text: 'OK', backgroundColor: '#5cb85c', action: 'closeGame', actionData: {} }
        ]
      },
      bonus_type: {
        headText: '',
        infoText: '',
        title: '',
        data: {},
        buttons: [
          { text: 'OK', backgroundColor: 'linear-gradient(#F57403, #D7340F)', action: 'toggleModal', actionData: { modal: ''} }
        ]
      },
      bonus_win: {
        title: '',
        ammount: 0,
        data: {},
        buttons: [
          { text: 'OK', backgroundColor: 'linear-gradient(#F57403, #D7340F)', action: 'toggleModal', actionData: { modal: ''} }
        ]
      }
    }
  };
}
