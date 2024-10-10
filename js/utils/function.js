const MAX_POSSIBLE_DAY_TIME = 24 * 60; //Hours in a day
const HOUR_IN_MINUTES = 60;

const isMeetingPossible = (start, end, meeting, duration) => {

  [start, end, meeting] = [start, end, meeting].map((item) => {
    const [hours, minutes] = item.split(':').map(Number);
    return hours * HOUR_IN_MINUTES + minutes;
  });


  return ((start <= meeting) && ((meeting + parseInt(duration, 10)) <= end));
};

// eslint-disable-next-line
console.log(
  isMeetingPossible('08:00', '17:30', '14:00', 90), //true
  isMeetingPossible('8:0', '10:0', '8sd:0', 120), //false
  // isMeetingPossible('08:00', '14:30', {}, 90), //Error
  // isMeetingPossible('14:00', '17:30', [], 90), //Error
  isMeetingPossible('8:00', '17:30', '08:00', 900), //false
  // isMeetingPossible('8:00', '17:30', undefined, 900) // Error
);
//=======================================

const isMeetingPossible1 = (start, end, meeting, duration) => {
  [start, end, meeting] = `${start},${end},${meeting}`
    .match(/\d{1,2}:\d{1,2}/g)
    .map((item) => {
      const [hours, minutes] = item.split(':').map(Number);
      return hours * HOUR_IN_MINUTES + minutes;
    });

  duration = parseInt(duration, 10);
  const times = [start, end, meeting, duration];

  if (times.some(isNaN) || times.some((item) => item > MAX_POSSIBLE_DAY_TIME)) {
    throw new Error(`Function ${isMeetingPossible1.name}: incorrect arguments`);
  }

  return ((start <= meeting) && ((meeting + duration) <= end));
};

// eslint-disable-next-line
console.log(
  isMeetingPossible1('08:00', '17:30', '14:00', 90), //true
  isMeetingPossible1('8:0', '10:0', '8:0', 120), //true
  isMeetingPossible1('08:00', '14:30', '14:00', 90), //false
  isMeetingPossible1('14:00', '17:30', '08:0', 90), //false
  isMeetingPossible1('8:00', '17:30', '08:00', 900), //false
);

try {
  // eslint-disable-next-line
  console.log(
    isMeetingPossible1('8:00', '17:30', undefined, 900) // Error
  );
} catch (error) {
  // eslint-disable-next-line
  console.log(error);
}
//=======================================


function isMeetingPossible2(start, end, meeting, duration) {
  const reg = new RegExp(/\d{1,2}:\d{1,2}/);

  for (const [key, value] of Object.entries(arguments)) {
    if (reg.test(value)) {
      const [hours, minutes] = value.split(':').map(Number);
      arguments[key] = hours * HOUR_IN_MINUTES + minutes;
    }
  }

  duration = parseInt(duration, 10);

  for (const item of arguments) {
    if (isNaN(item) || (item > MAX_POSSIBLE_DAY_TIME)) {
      throw new Error(`Function ${isMeetingPossible2.name}: incorrect arguments`);
    }
  }

  return ((start <= meeting) && ((meeting + duration) <= end));
}

// eslint-disable-next-line
console.log(
  isMeetingPossible2('08:00', '17:30', '14:00', -90), //true
  isMeetingPossible2('8:0', '10:0', '8:0', 120), //true
  isMeetingPossible2('08:00', '14:30', '14:00', 90), //false
  isMeetingPossible2('14:00', '17:30', '08:0', 90), //false
  isMeetingPossible2('8:00', '17:30', '08:00', 900), //false
);

try {
  // eslint-disable-next-line
  console.log(
    isMeetingPossible1('8:00', '17:30', undefined, 900) // Error
  );
} catch (error) {
  // eslint-disable-next-line
  console.log(error);
}
