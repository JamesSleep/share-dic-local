export const filtering = (array = [], options) => {
  let newArray = array;
  const { system, order, deposit, monthly, count, option } = options;
  
  if (system !== "") {
    newArray = array.filter(office => office.of_system === system);
  }

  newArray = orderByOption(newArray, order);

  newArray = sliderFilter(newArray, {
    property: "deposit",
    value: deposit
  });

  newArray = sliderFilter(newArray, {
    property: "monthly",
    value: monthly
  });

  newArray = sliderFilter(newArray, {
    property: "count",
    value: count
  });

  newArray = serviceFilter(newArray, option);

  return newArray;
}

const switchOption = (option) => {
  let order, where;
  switch (option) {
    case "높은 가격순": {
      order = "Desc";
      where = "of_deposit";
      return {
        order, where
      }
    }
    case "낮은 가격순": {
      order = "Asc";
      where = "of_deposit";
      return {
        order, where
      }
    }
    default: return { order, where };
  }
}

const orderByOption = (array = [], option) => {
  let i, j;
  let { order, where } = switchOption(option);
  if (!order || !where) return array;
  for (i=0; i < array.length - 1; i++) {
    let temp = i;
    for (j=i; j < array.length; j++) {
      // > : 오름차순, < : 내림차순
      if (order === "Asc") {
        if (Number(array[temp][where]) > Number(array[j][where])) temp = j;
      } else {
        if (Number(array[temp][where]) < Number(array[j][where])) temp = j;
      }
    }
    let swapValue = array[i];
    array[i] = array[temp];
    array[temp] = swapValue;
  }

  return array;
}

const sliderFilter = (array = [], option) => {
  let min, max, newArray, where;
  switch (option.property) {
    case "deposit": {
      where = "of_deposit";
      min = option.value[0] * 500;
      max = option.value[1] * 500;
      break;
    }
    case "monthly": {
      where = "of_monthly";
      min = option.value[0] * 50;
      max = option.value[1] * 50;
      break;
    }
    case "count": {
      where = "of_member_want";
      min = option.value[0];
      max = option.value[1];
      break;
    }
    default: return array;
  }

  if (option.value[1] === 100) {
    newArray = array.filter(office => 
      Number(office[where]) >= min 
    );
  } else {
    newArray = array.filter(office => 
      Number(office[where]) >= min && 
      Number(office[where]) <= max
    );
  }
  
  return newArray;
}

const serviceFilter = (array = [], serviceArray = []) => {
  let newArray = [];
  let optionArray;
  let success = new Array(serviceArray.length);

  if (serviceArray.length < 1) return array;

  for (let i=0; i< array.length; i++) {
    for (let count = 0; count < success.length; count++) {
      success[count] = false;
    }
    optionArray = array[i].of_option.split("#");
    for (let j=0; j < serviceArray.length; j++) {
      for (let k=0; k < optionArray.length; k++) {
        if (serviceArray[j] === optionArray[k]) {
          success[j] = 1;
        } 
      }
    }
    let check = true;
    for (let s=0; s < success.length; s++) {
      check *= success[s];
    }
    if (check) {
      newArray.push(array[i]);
    }
  }
  
  return newArray;
}