class PhysicalKeyboard {
  constructor(simpleKeyboardInstance){
    this.simpleKeyboardInstance = simpleKeyboardInstance;

    if(!window['SimpleKeyboardPhysicalKeyboardInit'])
      window['SimpleKeyboardPhysicalKeyboardInit'] = true;
    else
      return false;

    this.initKeyboardListener();
  }

  initKeyboardListener = () => {
    // Normal Keyboard
    document.addEventListener("keydown", (event) => {
      if(this.simpleKeyboardInstance.options.physicalKeyboardHighlight){
        let buttonPressed = this.getSimpleKeyboardLayoutKey(event);

        this.simpleKeyboardInstance.dispatch(instance => {
          let buttonDOM = instance.getButtonElement(buttonPressed) || instance.getButtonElement(`{${buttonPressed}}`);

          if(buttonDOM){
            buttonDOM.style.backgroundColor = this.simpleKeyboardInstance.options.physicalKeyboardHighlightBgColor || "#9ab4d0";
            buttonDOM.style.color = this.simpleKeyboardInstance.options.physicalKeyboardHighlightTextColor || "white";
          }
        });
      }
    });

    // Removing button style on keyup
    document.addEventListener("keyup", (event) => {
      if(this.simpleKeyboardInstance.options.physicalKeyboardHighlight){
        let buttonPressed = this.getSimpleKeyboardLayoutKey(event);

        this.simpleKeyboardInstance.dispatch(instance => {
          let buttonDOM = instance.getButtonElement(buttonPressed) || instance.getButtonElement(`{${buttonPressed}}`);

          if(buttonDOM){
            buttonDOM.removeAttribute("style");
          }
        });
      }
    });
  }

  getSimpleKeyboardLayoutKey = (event) => {
    if(this.simpleKeyboardInstance.options.debug){
      console.log(event);
    }
    
    let output;

    if(
      event.code.includes("Numpad") ||
      event.code.includes("Shift") ||
      event.code.includes("Space") ||
      event.code.includes("Backspace") ||
      event.code.includes("Control") ||
      event.code.includes("Alt") ||
      event.code.includes("Meta")
    ){
      output = event.code;
    } else {
      output = event.key;
    }

    /**
     * If button is not uppercase, casting to lowercase
     */
    if (
      output !== output.toUpperCase() ||
      (event.code[0] === "F" && Number.isInteger(Number(event.code[1])) && event.code.length <= 3)
    ) {
      output = output.toLowerCase();
    }

    return output;
  }
}

export default PhysicalKeyboard;