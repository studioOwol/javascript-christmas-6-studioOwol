import EventController from './controller/EventController.js';

class App {
  #eventController = new EventController();
  async run() {
    await this.#eventController.init();
  }
}

export default App;
