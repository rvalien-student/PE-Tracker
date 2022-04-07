const setButtonColors = ($button, inColor, outColor) => {
  $button.css('background-color', outColor);
  $button.hover(
    // mouse in
    () => { $button.css('background-color', inColor); },
    // mouse out
    () => { $button.css('background-color', outColor); }
  );
};