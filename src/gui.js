
const inputs = {
  PART_SPEED: document.getElementById('PART_SPEED'), 

  getInputValue : function (key) {
    console.log(this[key].value);
    return this[key].value;
  }
};

// const input_PART_SPEED = document.getElementById('PART_SPEED');








const currentValueElem = document.getElementById('current-value'); // 埋め込む先のspan要素

const setCurrentValue = (val) => {
  currentValueElem.innerText = val;
}



