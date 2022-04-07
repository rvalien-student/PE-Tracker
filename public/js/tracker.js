$(function() {
  // Declare id variables
  let userId = -1;
  let studentId = -1;

  // Disable behavior buttons (disable on reload not reliable)
  $('.behavior-button').each((index, e) => {
    $(e).prop('disabled', true);
  });

  // Create PE Observation
  let observation = new PEObservation(userId, studentId);
});