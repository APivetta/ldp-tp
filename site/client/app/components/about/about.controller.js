class AboutController {
  constructor() {
    this.title = 'about';
    this.people = [];
    for (let i = 0; i < 15; i++) {
      this.people.push({
        name: "Min Li Chan",
        notes: "A note."
      });
    }
  }
}

export default AboutController;
