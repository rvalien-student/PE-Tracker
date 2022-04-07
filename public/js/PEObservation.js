class PEObservation {
  constructor(userId, studentId) {
    this.userId = userId;
    this.studentId = studentId;
    this.peBehaviors = [];
    this.currentBehavior = null;
    this.startTime = 0;
    this.endTime = 0;
    this.init();
  }

  init() {
    // Get begin / end observation button
    let $button = $('#begin-end-observation-button');

    // Click handler for begin / end observation
    $button.click((e) => {
      // Begin Observation
      if(!this.peBehaviors.length) {
        $('.behavior-button').each((index, e) => {
          this.peBehaviors.push(new PEBehavior(this, String($(e).text()).trim(), e.id));
        });
        // Modify button state begin -> end
        setButtonColors($button, 'rgb(194, 34, 34)', 'red');
        $button.text('End Observation');
      }
      // End Observation
      else {
        setButtonColors($button, 'rgb(194, 34, 34)', 'rgb(194, 34, 34)');
        $button.text('Observation Complete').prop('disabled', true).css('color', 'darkgray');
        this.finish();
      }
    });
  }

  // Behavior selected by user
  selectBehavior(behavior) {
    if(this.currentBehavior !== behavior) {
      if(this.currentBehavior) {
        this.endTime = Date.now();
        this.logTask(this.createDurationString());
        this.currentBehavior.deactivate();
      }
      this.startTime = (behavior)
        ? this.endTime = Date.now()
        : this.startTime = this.endTime = 0;
      this.currentBehavior = behavior;
    }
  }

  // Log behavior time duration to server database
  async logTask(durationStr) {
    const response = await fetch('/log', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        users_id: this.userId,
        students_id: this.studentId,
        tasks_id: this.currentBehavior.id,
        duration: `\'${durationStr}\'`
      })
    });
    const result = await response.json();
  }

  // Observation ended by user, finish up
  finish() {
    this.selectBehavior(null);
    this.peBehaviors.forEach((b, index) => {
      b.disable();
    });
  }

  // Convert time to SQL interval string
  createDurationString() {
    var t = (((this.endTime - this.startTime) + 999) / 1000);
    var secs = (t % 60).toFixed();
    var mins = ((t / 60) % 60).toFixed();
    var hrs = ((t / 3600) % 24).toFixed();
    let durationStr = "+" + hrs + ":" + mins + ":" + secs;
    return durationStr;
  }
}