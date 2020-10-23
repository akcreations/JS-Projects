var nodeListForEach = function (list, callback) {
  for (var i = 0; i < list.length; i++) {
    callback(list[i], i);
  }
};

var budgetController = (function () {
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
  };

  var calcTotal = function (type) {
    var sum = 0;
    data.allItems[type].forEach(function (item) {
      sum += item.value;
    });

    data.totals[type] = sum;
  };
  return {
    addItem: function (type, description, value) {
      var newItem, ID;
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      if (type === "exp") {
        newItem = new Expense(ID, description, value);
      } else if (type === "inc") {
        newItem = new Income(ID, description, value);
      }
      data.allItems[type].push(newItem);
      return newItem;
    },

    deleteItem: function (type, id) {
      var ids, index;

      ids = data.allItems[type].map(function (cur) {
        return cur.id;
      });

      index = ids.indexOf(id);
      data.allItems[type].splice(index, 1);
    },

    calculateBudget: function () {
      calcTotal("inc");
      calcTotal("exp");

      data.budget = data.totals.inc - data.totals.exp;
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    calcPercentages: function () {
      data.allItems.exp.forEach(function (expense) {
        expense.calcPercentage(data.totals.inc);
      });
    },

    getBudget: function () {
      return {
        budget: data.budget,
        percentage: data.percentage,
        totalIncome: data.totals.inc,
        totalExpense: data.totals.exp,
      };
    },

    getPercentages: function () {
      var allPercentages = data.allItems.exp.map(function (expense) {
        return expense.getPercentage();
      });

      return allPercentages;
    },

    testItem: function () {
      console.log(data);
    },
  };
})();

var uiController = (function () {
  //code
  var DOMStrings = {
    inputType: ".add__type",
    inputDesc: ".add__description",
    inputValue: ".add__value",
    addButton: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetValue: ".budget__value",
    budgetIncomeValue: ".budget__income--value",
    budgetExpensesValue: ".budget__expenses--value",
    percentage: ".budget__expenses--percentage",
    container: ".container",
    percentageLabel: ".item__percentage",
    dateLabel :".budget__title--month"
  };


  var formatNumber=function(num,type){
    var splitNum,int,dec,sign;
    num = Math.abs(num);
    num = num.toFixed(2);

    splitNum = num.split('.');
    int = splitNum[0];
    dec = splitNum[1];

    if(int.length>3)
    {
      int = int.substring(0,int.length-3)+','+int.substring(int.length-3)
    }
    type ==='inc'? sign= '+': sign = '-'
    console.log( sign,int)
    return  sign + ' ' + int + '.' + dec;

  }
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDesc).value,
        value: parseFloat(document.querySelector(DOMStrings.inputValue).value),
      };
    },
    getDOM: function () {
      return DOMStrings;
    },
    addListItem: function (obj, type) {
      var html, newHtml, element;
      if (type === "inc") {
        element = DOMStrings.incomeContainer;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div>' +
          '<div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete">' +
          ' <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
          "</div></div></div>";
      } else if (type === "exp") {
        element = DOMStrings.expensesContainer;
        html =
          '<div class="item clearfix" id="exp-%id%">' +
          '<div class="item__description">%description%</div>' +
          '<div class="right clearfix"><div class="item__value">%value%</div>' +
          '<div class="item__percentage">21%</div>' +
          '<div class="item__delete">' +
          '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
          "</div></div></div>";
      }
      // placeholder variable are give %id% to quickly detect
      newHtml = html.replace("%id%", obj.id);
      //update newHtml for other variables
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", formatNumber(obj.value,type));
      //insertAdjacentHTML(position,modified html)
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },
    removeListItem: function (id) {
      var el;
      el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },
    getDateInfo : function()
    { var date,year,month;
      date = new Date();
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      year = date.getFullYear();
      month= date.getMonth();
      document.querySelector(DOMStrings.dateLabel).textContent = months[month] + ' ' + year
    },
    updateBudgetInfo: function (obj) {
      var type= obj.budget > 0 ? 'inc': 'exp'
      document.querySelector(DOMStrings.budgetValue).textContent = formatNumber(obj.budget,type);
      document.querySelector(DOMStrings.budgetIncomeValue).textContent = formatNumber(obj.totalIncome,'inc');
      document.querySelector(DOMStrings.budgetExpensesValue).textContent = formatNumber(obj.totalExpense,'exp');

      if (obj.percentage > -1)
        document.querySelector(DOMStrings.percentage).textContent =
          obj.percentage + "%";
      else document.querySelector(DOMStrings.percentage).textContent = "---";
    },

    displayPercentages: function (percentages) {
      var fields = document.querySelectorAll(DOMStrings.percentageLabel);

      nodeListForEach(fields, function (current, index) {
        if (percentages[index] > -1)
          current.textContent = percentages[index] + "%";
        else current.textContent = "---";
      });
    },

    clearFields: function () {
      var fieldsList, fieldsArr;

      fieldsList = document.querySelectorAll(
        DOMStrings.inputDesc + ", " + DOMStrings.inputValue
      );

      fieldsArr = Array.prototype.slice.call(fieldsList);

      fieldsArr.forEach(function (field) {
        field.value = "";
      });

      fieldsArr[0].focus();
    },
  };
})();

var controller = (function (budgetCtrl, uiCtrl) {
  var setupEventListeners = function () {
    var DOM = uiController.getDOM();
    //
    document
      .querySelector(DOM.addButton)
      .addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function (event) {
      if (event.key === "Enter" || event.code === "Enter") {
        ctrlAddItem();
      }
    });

    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlDelItem);

      document.querySelector(DOM.inputType).addEventListener('change',function(){
        var fields = document.querySelectorAll(DOM.inputType +','+ DOM.inputDesc+','+DOM.inputValue)
        nodeListForEach(fields,function(cur,index){
            cur.classList.toggle('red-focus')
        }) 
        document.querySelector(DOM.addButton).classList.toggle('red')
      })
       
   
  };

  var updatePercentage = function () {
    budgetCtrl.calcPercentages();
    var updatedPercentages = budgetCtrl.getPercentages();
    uiCtrl.displayPercentages(updatedPercentages);
  };

  var updateBudget = function () {
    //1. calculate budget
    budgetCtrl.calculateBudget();
    //2. return budget
    var budget = budgetCtrl.getBudget();
    //3. update to ui
    uiCtrl.updateBudgetInfo(budget);
  };

  var ctrlAddItem = function () {
    input = uiCtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // 3. Add the item to the UI
      uiCtrl.addListItem(newItem, input.type);

      // 4. Clear the fields
      uiCtrl.clearFields();

      // 5. Calculate and update budget
      updateBudget();

      updatePercentage();
    }
  };

  var ctrlDelItem = function (event) {
    var itemID, type, ID, splitResult;
    //event bubbling
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {
      splitResult = itemID.split("-");
      type = splitResult[0];
      ID = parseInt(splitResult[1]);
      budgetCtrl.deleteItem(type, ID);
      uiCtrl.removeListItem(itemID);

      updateBudget();

      updatePercentage();
    }
  };

  return {
    init: function () {
      console.log("Application has been started....");
      
      setupEventListeners();
      uiCtrl.updateBudgetInfo({
        budget: 0,
        percentage: -1,
        totalIncome: 0,
        totalExpense: 0,
      });

      uiCtrl.getDateInfo();
    },
  };

})(budgetController, uiController);

controller.init();
