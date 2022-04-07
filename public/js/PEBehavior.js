class PEBehavior {
  constructor(tracker, name, id) {
    this.tracker = tracker;
    this.name = name;
    this.id = id;
    this.$button = null;
    this.init();
  }

  init() {
    this.$button = $(`#${this.id}`);
    this.$button.click((e) => {
      this.activate();
      this.tracker.selectBehavior(this);
    });
    this.deactivate();
  }

  // Control access to the behavior buttons
  activate() {
    setButtonColors(this.$button, 'limegreen', 'limegreen');
    this.$button.css({'font-weight':'bold', 'text-decoration':'underline'});
    this.$button.prop('disabled', true);
  }
  deactivate() {
    setButtonColors(this.$button, 'rgb(216, 105, 65)', 'rgb(255, 127, 80)');
    this.$button.prop('disabled', false);
    this.$button.css({'font-weight':'normal', 'text-decoration':'none'});
  }
  disable() {
    setButtonColors(this.$button, 'rgb(216, 105, 65)', 'rgb(216, 105, 65)');
    this.$button.prop('disabled', true);
  }
}