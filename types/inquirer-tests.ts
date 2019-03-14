import inquirer = require("inquirer");

inquirer.prompt(
  [
    /* Pass your questions in here */
  ],
  function (answers: inquirer.Answers) {
    // Use user feedback for... whatever!!
  }
);

//
// examples/bottom-bar.js
//

//var BottomBar = require("../lib/ui/bottom-bar");
var BottomBar = inquirer.ui.BottomBar;
declare var cmdify: any;

var loader = ["/ Installing", "| Installing", "\\ Installing", "- Installing"];
var i = 4;
var ui = new BottomBar({ bottomBar: loader[i % 4] });

setInterval(function () {
  ui.updateBottomBar(loader[i++ % 4]);
}, 300);

var spawn = require("child_process").spawn;

var cmd = spawn(cmdify("npm"), ["-g", "install", "inquirer"], {
  stdio: "pipe"
});
cmd.stdout.pipe(ui.log);
cmd.on("close", function () {
  ui.updateBottomBar("Installation done!\n");
  process.exit();
});

//
// examples/checkbox.js
//

/**
 * Checkbox list examples
 */

"use strict";
//var inquirer = require("../lib/inquirer");

inquirer.prompt<{ toppings: string }>(
  [
    {
      type: InquirerQuestionType.checkbox,
      message: "Select toppings",
      name: "toppings",
      choices: [
        new inquirer.Separator("The usual:"),
        {
          name: "Pepperoni"
        },
        {
          name: "Cheese",
          checked: true
        },
        {
          name: "Mushroom"
        },
        new inquirer.Separator("The extras:"),
        {
          name: "Pineapple"
        },
        {
          name: "Bacon"
        },
        {
          name: "Olives",
          disabled: "out of stock"
        },
        {
          name: "Extra cheese"
        }
      ],
      validate: function (answer) {
        if (answer.length < 1) {
          return "You must choose at least one topping.";
        }
        return true;
      }
    }
  ],
  function (answers) {
    console.log(JSON.stringify(answers, null, "  "));
  }
);

//
// examples/expand.js
//

/**
 * Expand list examples
 */

"use strict";
//var inquirer = require("../lib/inquirer");

inquirer.prompt(
  [
    {
      type: InquirerQuestionType.expand,
      message: "Conflict on `file.js`: ",
      name: "overwrite",
      choices: [
        {
          key: "y",
          name: "Overwrite",
          value: "overwrite"
        },
        {
          key: "a",
          name: "Overwrite this one and all next",
          value: "overwrite_all"
        },
        {
          key: "d",
          name: "Show diff",
          value: "diff"
        },
        new inquirer.Separator(),
        {
          key: "x",
          name: "Abort",
          value: "abort"
        }
      ]
    }
  ],
  function (answers: inquirer.Answers) {
    console.log(JSON.stringify(answers, null, "  "));
  }
);

//
// examples/input.js
//

/**
 * Input prompt example
 */

"use strict";
//var inquirer = require("../lib/inquirer");

var questions = [
  {
    InquirerQuestionType.input,
    name: "first_name",
    message: "What's your first name",
    prefix: "1 - "
  },
  {
    InquirerQuestionType.input,
    name: "last_name",
    message: "What's your last name",
    default: function () {
      return "Doe";
    },
    suffix: "!!"
  },
  {
    InquirerQuestionType.input,
    name: "phone",
    message: "What's your phone number",
    validate: function (value: string): string | boolean {
      var pass = value.match(
        /^([01]{1})?[\-\.\s]?\(?(\d{3})\)?[\-\.\s]?(\d{3})[\-\.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
      );
      if (pass) {
        return true;
      } else {
        return "Please enter a valid phone number";
      }
    }
  }
];

inquirer.prompt(questions, function (answers) {
  console.log(JSON.stringify(answers, null, "  "));
});

//
// examples/list.js
//

/**
 * List prompt example
 */

"use strict";
//var inquirer = require("../lib/inquirer");

inquirer.prompt(
  [
    {
      InquirerQuestionType.list,
      name: "theme",
      message: "What do you want to do?",
      choices: [
        "Order a pizza",
        "Make a reservation",
        new inquirer.Separator(),
        "Ask opening hours",
        "Talk to the receptionist"
      ]
    },
    {
      InquirerQuestionType.list,
      name: "size",
      message: "What size do you need",
      choices: ["Jumbo", "Large", "Standard", "Medium", "Small", "Micro"],
      filter: function (val: string) {
        return val.toLowerCase();
      }
    }
  ],
  function (answers: inquirer.Answers) {
    console.log(JSON.stringify(answers, null, "  "));
  }
);

//
// examples/long-list.js
//

/**
 * Paginated list
 */

"use strict";
//var inquirer = require("../lib/inquirer");

var choices = Array.apply(0, new Array(26)).map(function (x: number, y: number) {
  return String.fromCharCode(y + 65);
});
choices.push("Multiline option \n  super cool feature");
choices.push(
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium."
);

inquirer.prompt(
  [
    {
      InquirerQuestionType.list,
      name: "letter",
      message: "What's your favorite letter?",
      paginated: true,
      choices: choices
    },
    {
      type: InquirerQuestionType.checkbox,
      name: "name",
      message: "Select the letter contained in your name:",
      paginated: true,
      choices: choices
    }
  ],
  function (answers: inquirer.Answers) {
    console.log(JSON.stringify(answers, null, "  "));
  }
);

//
// examples/nested-call.js
//

/**
 * Nested Inquirer call
 */

"use strict";
//var inquirer = require("../lib/inquirer");

inquirer.prompt(
  {
    InquirerQuestionType.list,
    name: "chocolate",
    message: "What's your favorite chocolate?",
    choices: ["Mars", "Oh Henry", "Hershey"]
  },
  function (answers: inquirer.Answers) {
    inquirer.prompt({
      InquirerQuestionType.list,
      name: "beverage",
      message: "And your favorite beverage?",
      choices: ["Pepsi", "Coke", "7up", "Mountain Dew", "Red Bull"]
    });
  }
);

//
// examples/password.js
//

/**
 * Password prompt example
 */

"use strict";
//var inquirer = require("../lib/inquirer");

inquirer.prompt(
  [
    {
      InquirerQuestionType.password,
      message: "Enter your git password",
      name: "password"
    }
  ],
  function (answers: inquirer.Answers) {
    console.log(JSON.stringify(answers, null, "  "));
  }
);

//
// examples/pizza.js
//

/**
 * Pizza delivery prompt example
 * run example by writing `node pizza.js` in your console
 */

"use strict";
//var inquirer = require("../lib/inquirer");

console.log("Hi, welcome to Node Pizza");

var questions2 = [
  {
    InquirerQuestionType.confirm,
    name: "toBeDelivered",
    message: "Is it for a delivery",
    default: false
  },
  {
    InquirerQuestionType.input,
    name: "phone",
    message: "What's your phone number",
    validate: function (value: string): string | boolean {
      var pass = value.match(
        /^([01]{1})?[\-\.\s]?\(?(\d{3})\)?[\-\.\s]?(\d{3})[\-\.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
      );
      if (pass) {
        return true;
      } else {
        return "Please enter a valid phone number";
      }
    }
  },
  {
    InquirerQuestionType.list,
    name: "size",
    message: "What size do you need",
    choices: ["Large", "Medium", "Small"],
    filter: function (val: string) {
      return val.toLowerCase();
    }
  },
  {
    InquirerQuestionType.input,
    name: "quantity",
    message: "How many do you need",
    validate: function (value: string) {
      var valid = !isNaN(parseFloat(value));
      return valid || "Please enter a number";
    },
    filter: Number
  },
  {
    type: InquirerQuestionType.expand,
    name: "toppings",
    message: "What about the toping",
    choices: [
      {
        key: "p",
        name: "Pepperoni and cheese",
        value: "PepperoniCheese"
      },
      {
        key: "a",
        name: "All dressed",
        value: "alldressed"
      },
      {
        key: "w",
        name: "Hawaïan",
        value: "hawaian"
      }
    ]
  },
  {
    InquirerQuestionType.rawlist,
    name: "beverage",
    message: "You also get a free 2L beverage",
    choices: ["Pepsi", "7up", "Coke"]
  },
  {
    InquirerQuestionType.input,
    name: "comments",
    message: "Any comments on your purchase experience",
    default: "Nope, all good!"
  },
  {
    InquirerQuestionType.list,
    name: "prize",
    message: "For leaving a comments, you get a freebie",
    choices: ["cake", "fries"],
    when: function (answers: inquirer.Answers) {
      return answers["comments"] !== "Nope, all good!";
    }
  }
];

inquirer.prompt(questions, function (answers) {
  console.log("\nOrder receipt:");
  console.log(JSON.stringify(answers, null, "  "));
});

//
// examples/rawlist.js
//

/**
 * Raw List prompt example
 */

"use strict";
//var inquirer = require("../lib/inquirer");

inquirer.prompt(
  [
    {
      InquirerQuestionType.rawlist,
      name: "theme",
      message: "What do you want to do?",
      choices: [
        "Order a pizza",
        "Make a reservation",
        new inquirer.Separator(),
        "Ask opening hours",
        "Talk to the receptionist"
      ]
    },
    {
      InquirerQuestionType.rawlist,
      name: "size",
      message: "What size do you need",
      choices: ["Jumbo", "Large", "Standard", "Medium", "Small", "Micro"],
      filter: function (val: string) {
        return val.toLowerCase();
      }
    }
  ],
  function (answers: inquirer.Answers) {
    console.log(JSON.stringify(answers, null, "  "));
  }
);

//
// examples/recursive.js
//

/**
 * Recursive prompt example
 * Allows user to choose when to exit prompt
 */

"use strict";
//var inquirer = require("../lib/inquirer");
var output2: (string | boolean)[] = [];

var questions3 = [
  {
    InquirerQuestionType.input,
    name: "tvShow",
    message: "What's your favorite TV show?"
  },
  {
    InquirerQuestionType.confirm,
    name: "askAgain",
    message:
      "Want to enter another TV show favorite (just hit enter for YES)?",
    default: true
  }
];

function ask() {
  inquirer.prompt<{ tvShow: string; askAgain: boolean }>(questions3, function (
    answers
  ) {
    output2.push(answers.tvShow);
    if (answers.askAgain) {
      ask();
    } else {
      console.log("Your favorite TV Shows:", output2.join(", "));
    }
  });
}

ask();

//
// examples/when.js
//

/**
 * When example
 */

"use strict";
//var inquirer = require("../lib/inquirer");
interface Answers4 {
  bacon: boolean;
  favorite: string;
  pizza: boolean;
}
var questions4 = [
  {
    InquirerQuestionType.confirm,
    name: "bacon",
    message: "Do you like bacon?"
  },
  {
    InquirerQuestionType.input,
    name: "favorite",
    message: "Bacon lover, what is your favorite type of bacon?",
    when: function (answers: Answers4) {
      return answers.bacon;
    }
  },
  {
    InquirerQuestionType.confirm,
    name: "pizza",
    message: "Ok... Do you like pizza?",
    when: function (answers: Answers4) {
      return !likesFood("bacon")(answers);
    }
  },
  {
    InquirerQuestionType.input,
    name: "favorite",
    message: "Whew! What is your favorite type of pizza?",
    when: likesFood("pizza")
  }
];

function likesFood(aFood: string) {
  return function (answers: inquirer.Answers) {
    return answers[aFood];
  };
}

inquirer.prompt<Answers4>(questions, function (answers) {
  console.log(JSON.stringify(answers, null, "  "));
});

// immutable usage
const immutableChoices: ReadonlyArray<string> = [
  'Order a pizza',
  'Make a reservation',
  'Ask opening hours',
  'Talk to the receptionist'
];
inquirer.prompt(
  [
    {
      type: 'rawlist',
      name: 'theme',
      message: 'What do you want to do?',
      choices: immutableChoices
    }
  ],
  function (answers: inquirer.Answers) {
    console.log(JSON.stringify(answers, null, '  '));
  }
);

//
// Other tests not covered in the examples provided with inquirer
//

// Tests promises from default, choices, validate, filter, and when

interface AsyncAnswers {
  choice: 'ONE' | 'TWO' | 'THREE';
  choseTwo: boolean;
  confirmation: string;
}

async function testAsyncPrompt(): Promise<void> {
  const answers: AsyncAnswers = await inquirer.prompt<AsyncAnswers>([
    {
      type: 'list',
      name: 'choice',
      message: 'How many do you want?',
      default: () => Promise.resolve('two'),
      choices: () => Promise.resolve(['one', 'two', 'three']),
      filter: (input: string) => Promise.resolve(input.toUpperCase()),
    },
    {
      type: 'confirm',
      name: 'choseTwo',
      message: 'Are you sure you want two?',
      when: (choices: AsyncAnswers) => Promise.resolve(choices.choice === 'TWO'),
    },
    {
      type: 'input',
      name: 'confirmation',
      message: 'Type YES if you really, really want it',
      validate: (input: string) => Promise.resolve(input.toUpperCase() === 'YES' ? true : 'Enter YES'),
      transformer: (input: string) => input.toUpperCase(),
    },
  ]);

  console.log(JSON.stringify(answers, null, '  '));
}

testAsyncPrompt();

/**
 * Different prompt output example
 */

"use strict";
//var inquirer = require("../lib/inquirer");

var questions = [
  {
    InquirerQuestionType.input,
    name: "first_name",
    message: "What's your first name",
    prefix: "1 - "
  },
  {
    InquirerQuestionType.input,
    name: "last_name",
    message: "What's your last name",
    default: function () {
      return "Doe";
    },
    suffix: "!!"
  },
  {
    InquirerQuestionType.input,
    name: "phone",
    message: "What's your phone number",
    validate: function (value: string): string | boolean {
      var pass = value.match(
        /^([01]{1})?[\-\.\s]?\(?(\d{3})\)?[\-\.\s]?(\d{3})[\-\.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
      );
      if (pass) {
        return true;
      } else {
        return "Please enter a valid phone number";
      }
    }
  }
];

inquirer.createPromptModule({ output: process.stderr })(questions, function (answers) {
  console.log(JSON.stringify(answers, null, "  "));
});

// Work with JS inquirer but rejected by typing.
inquirer.prompt([
  {
    InquirerQuestionType.input,
    name: "listOfThings",
    filter(value: string): string[] {
      return ["abc", "def"];
    },
    validate(value: string[]): boolean {
      return value.length > 0;
    }
  }
]);